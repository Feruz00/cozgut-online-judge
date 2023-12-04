import React, { useEffect } from 'react'
import { useGetContests, useRegistersUserToContest } from '../../services/useContest'
import Loading from '../../ui/Loading'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { Button, Table, Typography } from 'antd'
import { useCurrentUser } from '../../features/auth/useAuth'
import { useTime } from '../../hooks/useTimer'
import toast from 'react-hot-toast'

const P = ({children})=>{
    return <p className='font-medium text-sx'>{children}</p>
}

const IncreaseTime = ({start, id="", title=""})=>{
    const {time} = useTime()
    const NU = num=>{
        if(num < 10) return `0${num}`
        return num
    }
      
    const startContest = moment(start)
    const now = moment(time)

    const duration = moment.duration(startContest.diff(now))

    if(now === startContest) toast.success(`${title} bäsleşik bäşlady`)

    if(duration.years()>0) return <P> {NU(duration.years())} ýyl galdy </P>
    if(duration.months()>0) return <P> {NU(duration.months())} aý galdy </P>
    if(duration.days()>0) return <P> {NU(duration.days())}  gün galdy </P>
    if(duration.milliseconds()>0) return <P> {NU(duration.hours())}:{NU(duration.minutes())}:{NU(duration.seconds())}</P>
    

    return <Link to={id}>Gir</Link>
}



const ShowContests = () => {
    useEffect( ()=>{
        document.title='Bäsleşikler'
    },[] )
const {time} = useTime()
  const {isContestLoading, contests} = useGetContests()
  const {user, isAuthenticated, isLoading } = useCurrentUser()
  const {isLoading: isAddUserToContest , registerUserContest} = useRegistersUserToContest()
  const handleClick = (id)=>{
    registerUserContest({id})
    }  
  const NU = num=>{
      if(num < 10) return `0${num}`
      return num
    }
  
 
  if(isContestLoading || isLoading || isAddUserToContest) return <Loading />
    
  return (
    <div className='flex flex-col gap-3 px-10 my-5'>
        <div>
            <Typography.Title level={4}> Öňümizdäki bäsleşikler: </Typography.Title>
            <Table 
                bordered
                columns={[
                    {
                        title: 'Bäsleşigiň ady',
                        dataIndex: 'title',
                        render: (p,_)=> <Link to={_._id}> {p} </Link>
                    },
                    // {
                    //     title: 'Awtorlar',
                    //     dataIndex: 'authors',
                    //     render: p=> p.map( q => <Link to={`../users/${q.username}`} > {q.username} </Link> )
                    // },
                    {
                        title: 'Başlamaly wagty',
                        dataIndex: 'start_time',
                        render: p=> `${moment(p).format('D.M.yyyy')}. ${moment(p).format('kk:mm')}`,
                        width: '11rem'
                    },
                    {
                        title: 'Dowamlylygy',
                        dataIndex: 'duration',
                        render: p=> `${NU(p.hour)}:${NU(p.minutes)}`,
                        width: '3rem'
                    },
                    {
                        title: "Başlamagyn galan wagt",
                        dataIndex:'start_time',
                        render: (p, _)=> <IncreaseTime start={p} id={_._id} title={_.title} />,
                        width: '3rem'
                    },
                    {
                      title: 'Registratsiýa',
                      dataIndex: '_id',
                      render: (p,_)=> {
                        if(!isAuthenticated) return '-------';
                        const now = moment(time).subtract(-15, 'minutes')

                        const contestStart = moment(_.start_time)
                        if( contestStart.diff(now) <=0 ) return <p className='text-xs font-bold'>Ýapyldy</p>
                        
                        return  _.users.filter(i=>i ===user._id).length > 0 
                            ? <p className='text-xs font-semibold'>Siz eýýam ýazyldyňyz</p>
                            :<Button onClick={()=>handleClick(p)}> Ýazyl </Button>
                    
                      },
                    //   render: (p, _)=> isAuthenticated ? _.users.filter(i=>i ===user._id).length > 0 ? 
                    //   <p className='text-xs font-semibold '>Siz eýýam ýazyldyňyz</p>
                    //   :<Button onClick={()=>handleClick(p)}> Ýazyl </Button>
                      
                    //   : '----' ,
                      width: '6rem'
                    }
                  
                ]}
                dataSource={contests.before.map( i=> ({...i, key: i._id}))}
                pagination={false}
            />
        </div>
        <div>
            <Typography.Title level={4}> Bolan bäsleşikler: </Typography.Title>
            <Table 
                bordered
                columns={[
                    {
                        title: 'Bäsleşigiň ady',
                        dataIndex: 'title',
                        render: (p,_)=> <Link to={_._id}> {p} </Link>
                    },
                    // {
                    //     title: 'Awtorlar',
                    //     dataIndex: 'authors',
                    //     render: p=> p.map( q => <Link to={`../users/${q.username}`} > {q.username} </Link> )
                    // },
                    {
                        title: 'Başlamaly wagty',
                        dataIndex: 'start_time',
                        render: p=> `${moment(p).format('D.M.yyyy')}. ${moment(p).format('kk:mm')}`
                    },
                    {
                        title: 'Dowamlylygy',
                        dataIndex: 'duration',
                        render: p=> `${NU(p.hour)}:${NU(p.minutes)}`
                    },
                ]}
                dataSource={contests.after.map( i=> ({...i, key: i._id}))}
            />
        </div>
    </div>
)
}

export default ShowContests