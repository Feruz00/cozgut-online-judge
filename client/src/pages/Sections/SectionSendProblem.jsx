import React from 'react'
import { RxExclamationTriangle, RxInfoCircled } from 'react-icons/rx'
// import {Pie, PieChart, ResponsiveContainer} from 'recharts'
import { useForm, Controller } from 'react-hook-form'
import { Button, Select, Tag, Typography } from 'antd'
import FileUploader from '../../ui/FileUploader'
import { useNavigate } from 'react-router-dom'
import { useGetLanguages } from '../../features/settings/useLanguages'
import { useSubmitProblem } from '../../services/useSubmissions'
import { useCurrentUser } from '../../features/auth/useAuth'
import moment from 'moment'
import ShowSubmission from '../../components/ShowSubmission'
const Verdict = ({verdict, _={}})=>{
    
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
            Dogry çözüw
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
            ?  _.wrongTestNumber.testNum + ( _.preTest ? ' pretestlerde ' : ' testlerde ')
            :  _.wrongTestNumber.subTest + '  bölek testiň '+  _.wrongTestNumber.testNum
      } 
        {verdict === 'WRONG ANSWER' && ' ýalňyş jogap'}
        {verdict === 'TIME LIMIT' && ' berlen wagtdan geçdi'}
        {verdict === 'MEMORY LIMIT' && ' berlen möçberden geçdi'}
        {verdict === 'RUNTIME ERROR' && ' näsazlyk ýüze çykdy'}
  
    </p>
  }
const SectioSendProblem = ({problem, tags=[], level, subsection={}, submissions=[]}) => {
    const {languages, isLoadingLanguages} = useGetLanguages()
    const navigate = useNavigate()
    const {watch, formState: {errors}, control, handleSubmit, register} = useForm()
    const {submit, isLoading: isSubmitProblem} = useSubmitProblem()
    const {isLoading, isAuthenticated} = useCurrentUser()
    const onSubmit = (d)=>{
        const formData = new FormData()
        formData.append('lang', d.lang)
        formData.append('solution', d.solution.item(0))
        formData.append('problem', problem)
        submit(formData, {
            onSuccess: (data)=>{
                console.log(data)
                navigate('/sections/submissions')
            }
        })
    }

    return (
        <div className='my-3'>
        <div className=' py-3 px-4 rounded shadow'>
            <Typography.Title level={5}>
                {subsection?.title}
            </Typography.Title> 
        </div>
        
    <div className='flex flex-col gap-4 shadow px-2 mr-1 mt-4 py-3'>
        
        <div className='bg-white rounded px-2 py-1'>
            <p className='flex justify-center items-center gap-1'>
                <RxInfoCircled />
                 Maglumat: </p>
        </div>
        <div className='flex flex-wrap justify-start items-center gap-2 '>
            <Typography.Title level={5}>Tegler:</Typography.Title>
            {/* <div className='flex flex-row gap-2 w-full flex-wrap'> */}
                {level && <Tag color="processing"> {level} </Tag>}
                { tags?.map(i=> <Tag  color="success" key={i._id}>{i.name}</Tag>) }
            {/* </div> */}

        </div>
       
    </div>
    {
            !isLoading &&  isAuthenticated && (
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
        isAuthenticated && (
            <div className='flex flex-col gap-3 bg-white rounded px-2 py-4 shadow mt-6'>
                <h3 className='text-sm font-medium'>Synanyşyklarym:</h3>
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

export default SectioSendProblem