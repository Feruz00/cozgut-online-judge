import { Button, Table } from 'antd'
import React, { useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useGetResults } from '../../services/useSubmissions'
import Loading from '../../ui/Loading'
import { useCurrentUser } from '../../features/auth/useAuth'
import Modal from '../../ui/Modal'
import { RxExclamationTriangle } from 'react-icons/rx'
import moment from 'moment'
import SubmissionBody from '../../components/SubmissionBody'
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
      return <p className='font-light'>
        <RxExclamationTriangle className='text-sm' /> Komplýasiýa ýalňyşlygy</p>
    }
    return <p className='text-sm text-red-500 font-medium flex items-center gap-1'>
      <RxExclamationTriangle className='text-sm' />
      {`${_?.problem?.type === 'custom' ? _?.wrongTestNumber?.testNum: `${_?.wrongTestNumber?.subTest}`} bölek testiň ${_?.wrongTestNumber?.testNum} `} testde 
        {verdict === 'WRONG ANSWER' && ' ýalňyş jogap'}
        {verdict === 'TIME LIMIT' && ' berlen wagtdan geçdi'}
        {verdict === 'MEMORY LIMIT' && ' berlen möçberden geçdi'}
        {verdict === 'RUNTIME ERROR' && ' näsazlyk ýüze çykdy'}
  
    </p>
  }
const Results = () => {
    const {id} = useParams()
    const {submissions, isLoading} = useGetResults()
    const [submits, setSubmits] = useState({})
    const [current, setCurrent] = useState({})
    const {isAuthenticated, isLoading: isUserLoading, user} = useCurrentUser()
    const loading = isLoading || isUserLoading
    const bntRef = useRef()
    // console.log(submits)
    const handlClick = (result, sender)=>{
        if(isAuthenticated && user?._id === sender?._id){

            bntRef && bntRef.current.click()
            setSubmits(result)
        }
    }
    let columns = [{
        title: '№',
        dataIndex: 'index',
        width: '3rem'
    },
    {
        title: 'Gatnaşyjy',
        dataIndex: 'user',
        render: p => isAuthenticated && user._id === p._id ? <Link to='/profile'>{p.username}</Link> 
        : <Link to={`/users/${p._id}`}>{p.username}</Link> 
    },
    {
        title: 'Jemi',
        dataIndex: 'total',
        render: p => <p className='font-medium '>{p}</p>,
        width: '6rem'
    }]

    if(!isLoading){
        const subs = submissions[0]?.result?.map((i, index)=>({
            title: String.fromCharCode(index+65), 
            dataIndex: 'result',
            render: (p, _)=> <p onClick={()=>handlClick(p[index], _.user)} className={` font-bold cursor-pointer ${ p[index].sum > 0 ? ' text-green-500 ': ' text-red-500 ' } `}>
                    {
                        p[index].sum
                    }
                    </p>,
            width: '3rem'

        }))
        if(subs)
            columns.push( ...subs)
        // columns.push(submissions[0]?.result?.map((i, index)=>({
        //     title: String.fromCharCode(index+65), 
        // })))
    }

    if(loading) return <Loading />

    return (
    <div className='mt-3 px-10 flex flex-col gap-5'>
        <div>
            <Link to={`/contests/my/${id}`}>
                <Button>
                    Ugratmalarym
                </Button>
            </Link>
        </div>

        <div >
           
            <Table 
                loading={isLoading}
                bordered
                
                size='small'
                columns={columns}
                dataSource={submissions.map((i, index)=>({...i, key: index, index: index+1}))}
            />
        
        </div>
        <Modal>
          <Modal.Open opens="result">
            <Button type='default' className='hidden' ref={bntRef}  >
              Edit
            </Button>   
          </Modal.Open>  
          <Modal.Window name="result">
            <div className='w-[40rem] flex flex-col text-sm gap-3'>
                {
                    submits?.submissions?.map( i=> <div key={i._id} className="grid grid-cols-3 gap-2">
                        <Modal.Open opens="view" onClick={()=>setCurrent(i)}>
                            <p className='text-indigo-500 font-mediu cursor-pointer'  >{i._id}</p>
                        </Modal.Open>
                        
                        <p> {moment(i.createdAt).format('DD/MM/YYYY hh:mm')} </p>
                        <Verdict verdict={i.verdict} _={i} />
                    </div> )
                }
            </div>
          </Modal.Window>
            <Modal.Window name="view">
                <SubmissionBody submission={current} />
            </Modal.Window>
        </Modal>
       
    </div>
  )
}

export default Results