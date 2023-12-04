import React from 'react'
import {  useGetProblemsByContest } from '../../services/useContest'
import Loading from '../../ui/Loading'
import { Table } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { useTime } from '../../hooks/useTimer'
import moment from 'moment'

const P = ({children})=>{
  return <p className='font-bold text-sx'>{children}</p>
}

const IncreaseTime = ({start})=>{
  const {time} = useTime()
  const NU = num=>{
      if(num < 10) return `0${num}`
      return num
  }
  const navigate = useNavigate();

  const startContest = moment(start)
  const now = moment(time)
  const refreshPage = () => {
    navigate(0);
  }
  const duration = moment.duration(startContest.diff(now))


  if(duration.years()>0) return <P> {NU(duration.years())} ýyl galdy </P>
  if(duration.months()>0) return <P> {NU(duration.months())} aý galdy </P>
  if(duration.days()>0) return <P> {NU(duration.days())}  gün galdy </P>
  if(duration.milliseconds()>0) return <P> {NU(duration.hours())}:{NU(duration.minutes())}:{NU(duration.seconds())}</P>
  
  return refreshPage()
}

const ShowContestProblems = () => {
    const {isProblems, problems} = useGetProblemsByContest()

    if(isProblems) return <Loading />
    if(problems?.isDisable) return <div className='flex flex-col items-center h-full w-full justify-center'>
        <p> Bäsleşik hakda maglumat soň yglan ediler </p>
       <IncreaseTime start={problems.contest.start_time} />

    </div>
  return (
    <div className='my-5 px-10'>
        <Table 
            bordered
            pagination={false}
            columns={[
                {
                  title: "№",
                  dataIndex: 'num',
                  width: '1rem'
                },
                {
                  title: 'Meseläniň ady',
                  dataIndex: 'title',
                  render: (p, _)=> <Link to={`${_._id}`}> {p} </Link>
                },
                {
                    title: "Netije",
                    dataIndex:"_id",
                    render: (p,_)=> _?.isSend ? _?.isSuccess ? <p className='text-xl text-center text-green-600 font-medium'>+</p>: <p className='text-xl text-center text-red-600 font-medium'>-</p> : '----',
                    width:'2rem'
                },
                {
                  title: 'Test düzgüni',
                  dataIndex: 'withTestFile',
                  render: q=> <p className='text-xs '>{q ? 'Faýl arkaly': 'Standart'}</p>,
                  width: '4rem'
                },
                {
                  title: "Wagt(s)",
                  dataIndex: 'time',
                  width: '3rem'
                },
                {
                  title: "Möçberi(mb)",
                  dataIndex: 'memory',
                  width: "3rem"
                }
              ]}
            dataSource={problems.map( (i, index)=>({...i, key:i._id, num: String.fromCharCode(index+65)}) )}
        />
    </div>
  )
}

export default ShowContestProblems