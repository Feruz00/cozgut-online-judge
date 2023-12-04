import React, { useMemo } from 'react'
import { RxExclamationTriangle, RxInfoCircled } from 'react-icons/rx'
// import {Pie, PieChart, ResponsiveContainer} from 'recharts'
import { useForm, Controller } from 'react-hook-form'
import { Button, Select, Tag, Typography } from 'antd'
import FileUploader from '../../ui/FileUploader'
import { Link, useNavigate } from 'react-router-dom'
import { useGetLanguages } from '../../features/settings/useLanguages'
import { useSubmitProblem } from '../../services/useSubmissions'
import { useCurrentUser } from '../../features/auth/useAuth'
import moment from 'moment'
import ShowSubmission from '../../components/ShowSubmission'
import { useTime } from '../../hooks/useTimer'
import Loading from '../../ui/Loading'
const Verdict = ({verdict, _={}})=>{
    console.log(_)
    if(_.queue){
      return <p>
        Nobata goýuldy
      </p>
    }
    if(!_.queue && !_.verdict ){
      return <p>
        Barlanýar
      </p>
    }
    if(_.accepted){
      return <p className='font-medium text-green-600 '>
        {
            _.preTest ? 'Pretestde dogry jogap'
            : 'Dogry çözüw'
        } 
      </p>
    }
    if(verdict === 'COMPILATION ERROR'){
      return <p className='font-light '>
        <RxExclamationTriangle className='text-sm' /> Komplýasiýa ýalňyşlygy</p>
    }
    return <p className='text-sm text-red-500 font-medium flex items-center gap-1'>
      <RxExclamationTriangle className='text-sm' />
      {
        _.problem.type === 'custom' 
            ?  _.wrongTestNumber.testNum + ( _.preTest ? ' pretestde ' : ' testde ')
            :  _.wrongTestNumber.subTest + '  bölek testiň '+  _.wrongTestNumber.testNum
      }
       
        {verdict === 'WRONG ANSWER' && ' ýalňyş jogap'}
        {verdict === 'TIME LIMIT' && ' berlen wagtdan geçdi'}
        {verdict === 'MEMORY LIMIT' && ' berlen möçberden geçdi'}
        {verdict === 'RUNTIME ERROR' && ' näsazlyk ýüze çykdy'}
  
    </p>
}

const Status = ({start_time , duration})=>{
    const {time} = useTime()
    // console.log(start_time)
    const NU = num=>{
        if(num < 10) return `0${num}`
        return num
    }    
    const contestEnd = moment(start_time).add(duration.hour , 'hours').add(duration.minutes, 'minutes')

    const now = moment(time)
    const diff = useMemo(()=>moment.duration(contestEnd.diff(now)), [now, contestEnd]) 
    // console.log(diff)
    return <p className='text-sm'>
        <span className='font-medium'>Status:</span> 
        <span className='font-bold'> {
            contestEnd.diff(now) >=0  ? <span>
                {NU(diff.hours())}:{NU(diff.minutes())}:{NU(diff.seconds())}
            </span> : 'Gutardy'   
        }
        </span>
    </p>
}
const Info = ({start_time, duration, level, tags=[]})=>{
    const {time} = useTime()
    const contestEnd = new Date(start_time)
    contestEnd.setMinutes( contestEnd.getMinutes() + duration.minutes)
    contestEnd.setHours( contestEnd.getHours() + duration.hour )
    if(contestEnd>=time) return null
    else return (
    <div className='flex flex-col gap-4 shadow px-2 mr-1 mt-4 py-3'><div className='bg-white rounded px-2 py-1'>
            <p className='flex justify-center items-center gap-1'>
                <RxInfoCircled />
                Maglumat: </p>
        </div><div className='flex flex-wrap justify-start items-center gap-2 '>
                <Typography.Title level={5}>Tegler:</Typography.Title>
                {/* <div className='flex flex-row gap-2 w-full flex-wrap'> */}
                {level && <Tag color="processing"> {level} </Tag>}
                {tags?.map(i => <Tag color="success" key={i._id}>{i.name}</Tag>)}
                {/* </div> */}

            </div></div>)
}
const SendContestProblem = ({problem, tags=[], level, contest={}, submissions=[]}) => {
    const {languages, isLoadingLanguages} = useGetLanguages()
    
    const {time} = useTime()
    const navigate = useNavigate()
    const {watch, formState: {errors}, control, handleSubmit, register} = useForm()
    const {submit, isLoading: isSubmitProblem} = useSubmitProblem()
    const {isLoading, isAuthenticated, user} = useCurrentUser()
    const onSubmit = (d)=>{
        const formData = new FormData()
        formData.append('lang', d.lang)
        formData.append('solution', d.solution.item(0))
        formData.append('problem', problem)

        const now = moment(time)
        const contestStart = moment(contest?.start_time)
        const contestEnd = moment(contest?.start_time)
                        .add(contest.duration.hour , 'hours')
                        .add(contest.duration.minutes, 'minutes')
        
        let gatnashyjy = now.diff(contestStart)>=0 && 0 <= contestEnd.diff(now)


        submit(formData, {
            onSuccess: (data)=>{
                // console.log(data)
                if(gatnashyjy)
                    navigate(`/contests/my/${contest._id}`)
                else
                    navigate('/contests/submissions')
            }
        })
    }
    const OK = ()=>{
        const now = moment(time)
        const contestStart = moment(contest.start_time)
        const contestEnd = moment(contest.start_time)
                        .add(contest.duration.hour , 'hours')
                        .add(contest.duration.minutes, 'minutes')
        
        if(!isAuthenticated) return false
        if(contestEnd.diff(now)<0) return true
        if(now.diff(contestStart)>=0 && 0 <= contestEnd.diff(now)){
            const isCan = contest?.users?.filter(i=>i === user._id).length > 0
            return isCan
        }
        return true
        
    }

    

    if(isLoading || isLoadingLanguages) return <Loading />
    return (
        <div className='my-3'>
        <div className=' py-3 px-4 rounded shadow flex flex-col '>
            <Typography.Title level={5}>
                {contest?.title}
            </Typography.Title> 
            <Status start_time={contest.start_time} duration={contest?.duration} />
        </div>
        
        <Info  start_time={contest.start_time} duration={contest.duration} level={level} tags={tags} />
    
        {
        OK() && (
        <div className='bg-white rounded px-2 py-1 shadow mt-4'>
            <p className='text-align text-base font-medium'>Mysaly ugrat</p>
            <form onSubmit={handleSubmit(onSubmit)} className='mt-2 flex gap-1 flex-col'>
                <p className='text-sm'> Programmirleme dili saýlaň: </p>
                <Controller 
                    name="lang"
                    control={control}
                    rules={{
                        required: 'Barlag dili saýlaň'
                    }}
                    render={ ({field})=> (
                        <Select 
                            className='w-full'
                            {...field}
                            options={languages?.map( i=>({label: i.title, value: i._id}) )}
                        />
                    ) }
                />
                {errors?.lang?.message && <p className='text-xs font-medium text-red-700'>  {errors?.lang?.message} </p>}
                <p className='text-sm mt-1'> Faýly saýlaň: </p>
                
                <FileUploader
                    name="solution"
                    register={register}
                    validation={{
                        validate: (val)=>
                            val?.length > 0 || 'Çözüw faýly gerek!'
                    }}
                    accepted={ `.${languages?.filter( i=> i._id === watch("lang") )[0]?.extension}` }
                    id="solution"
                    disabled={isLoadingLanguages}
                    watch={watch}
                />
                {errors?.solution?.message && <p className='text-xs font-medium text-red-700'>  {errors?.solution?.message} </p>}
                
                <Button type='primary' className='mt-3' htmlType='submit' disabled={isSubmitProblem} loading={isSubmitProblem} >Ugrat</Button>
            </form>
            
        </div>
            )
        }
        {
           OK()  && (
            <div className='flex flex-col gap-3 bg-white rounded px-2 py-4 shadow mt-6'>
            <div className='flex flex-row justify-between items-center'>
                <h3 className='text-sm font-medium'>Synanyşyklarym:</h3>
                <Link to={`/contests/my/${contest._id}`} className='text-xs no-underline text-indigo-400'> ählisi &#8594; </Link>
            </div>

            <div className='flex flex-col gap-2' >
                {
                    submissions.map( i=> <div key={i._id} className='flex flex-row justify-between items-center w-full text-xs gap-3'>
                        <ShowSubmission submission={i} />
                        <Verdict verdict={i?.verdict} _={i} />

                        <p >
                            {`${moment(i.createdAt).format('DD/MM/YYYY')}. ${moment(i.createdAt).format('hh:mm')}`}
                        </p>
                    </div> )
                }
                
            </div>
        </div>
           ) 
        }
        
    
       
    </div>
  )
}

export default SendContestProblem