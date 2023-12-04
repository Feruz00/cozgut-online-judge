import { Button, Table } from 'antd'
import React, {  useRef, useState } from 'react'
import { useFullScan, useGetResults, useGiveRating } from '../../services/useSubmissions'
import Loading from '../../ui/Loading'
import Modal from '../../ui/Modal'
import moment from 'moment'
import Verdict from '../../components/Verdict'
import SubmissionBody from '../../components/SubmissionBody'
import { useGetContest } from '../../services/useContest'

const Rezultatlar = () => {

    const {submissions, isLoading} = useGetResults()
    const {isLoading: isFullScanLoading, fullScan} = useFullScan()
    const {contest, isContestLoading} = useGetContest()
    const [submits, setSubmits] = useState({})
    const [current, setCurrent] = useState({})
    const bntRef = useRef()
    const {isLoading: isGiveRatingLoading , giveRating} =  useGiveRating()
    const loading = isContestLoading || isLoading

    const handleStart = ()=>{
        fullScan()
    }
    const giveRatingStart = ()=>{
        giveRating()
    }
    const handlClick = (result)=>{
        bntRef && bntRef.current.click()
        setSubmits(result)
    
    }
    let columns = [{
        title: '№',
        dataIndex: 'index',
        width: '3rem'
    },
    {
        title: 'Gatnaşyjynyň logini',
        dataIndex: 'user',
        render: p => p.username
    },
    {
        title: 'Gatnaşyjynyň doly ady',
        dataIndex: 'user',
        render: p => p.fullName
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
            render: (p, _)=> <p onClick={()=>handlClick(p[index])} 
                className={` font-bold cursor-pointer ${ p[index].sum > 0 ? ' text-green-500 ': ' text-red-500 ' } `}>
                    {
                        p[index].sum
                    }
                    </p>,
            width: '3rem'

        }))
        if(subs)
            columns.push( ...subs)
        
    }
    if(loading) return <Loading />
  return (
    <div className='flex flex-col gap-5 mt-2 shadow py-3'>
        <div className='flex justify-end item-center gap-4 px-2'>
            <Button disabled={contest.fullScan || isFullScanLoading} 
            loading={isFullScanLoading}
            onClick={handleStart}
            >Doly barlagy başla</Button>
            <Button 
                disabled={!contest.fullScan || isGiveRatingLoading || (contest.fullScan && contest.rating_berildimi)} 
                onClick={giveRatingStart}
                loading={isGiveRatingLoading}
            >Gatnaşyjylara reýting ber</Button>
        </div>
        <div >
           
           <Table 
               loading={isLoading}
               bordered
               pagination={{
                pageSize: 100
               }}
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

export default Rezultatlar