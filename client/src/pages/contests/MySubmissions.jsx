import React from 'react'
import { useMyContestSubmissions } from '../../services/useSubmissions'
import { useCurrentUser } from '../../features/auth/useAuth'
import Loading from '../../ui/Loading'
import { Link, useParams } from 'react-router-dom'
import { RxExclamationTriangle } from 'react-icons/rx'
import { Button, Table } from 'antd'
import moment from 'moment'
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
       {
              _.preTest ? 'Pretestde dogry jogap'
              : 'Dogry çözüw'
          }
      </p>
    }
    if(verdict === 'COMPILATION ERROR'){
      return <p className='font-light'>
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

const Submissions = ()=>{
    const {isLoading, submissions} =  useMyContestSubmissions()
    // console.log(submissions)
    const {isAuthenticated, isLoading: userLoading, user} = useCurrentUser()
    const loading = userLoading || isLoading
    const NU = p=>{
        if(p<10) return '0'+p;
        return p
    }
    if(loading) return <Loading />
   
    return (
        <Table
        bordered
        size='small'
        className='mt-5' 
        columns={
          [
            {
              dataIndex: '_id',
              title: '',
              render: p=> <p className='font-bold text-indigo-600 cursor-pointer'>#</p>
            },
            {
              dataIndex: 'createdAt',
              title: 'Ugradylan wagty',
              render: p=> `${moment(p).format('DD/MM/YYYY')}. ${NU(new Date(p).getHours())}:${NU(new Date(p).getMinutes())}`
            },
            { 
              dataIndex: 'user',
              title: 'Ugradyjy',
              render: p=> <Link to={ isAuthenticated && user?.username === p.username ? '/profile' : `../users/${p.username}`}> {p.username} </Link> 
            },
          {
            dataIndex: 'problem',
            title: 'Mesele',
            render: (p,_)=>{
              return <Link to={`/contests/${p.contest}/${p._id}`}> {p.title} </Link> 
              }
          },
          {
            title: 'Netije',
            dataIndex:'verdict',
            render: (p, _)=> <Verdict verdict={p} _={_}/>
          },
          {
            dataIndex: 'lang',
            title: 'Prog. dili',
            render: p=>p.title
          },
          
          {
            dataIndex:"time",
            // dataIndex: 'result',
            title: 'Wagty',
            render: p=> p ? p : 0 +'s'
            
            // render: (p, _)=> _.verdict === 'COMPILATION ERROR' || _.queue ? '0 s': p[ _.problem.type === 'custom' ? p?.length-1: p[p.length - 1]]?.time === undefined ? '---' : p[p.length-1].time+' s'
          },
          {
            dataIndex:'memory',
            // dataIndex: 'result',
            title: 'Möçberi',
            render: p=> p ? p : 0 +' KB'
            // render: (p, _)=> _.verdict === 'COMPILATION ERROR'||  _.queue ? '0 KB': `${ p[p?.length-1]?.memory ? p[p.length-1].memory+' KB': '---'  } `
          },
          
        ]}
        dataSource={submissions?.map(i=>({...i, key: i._id}))}
        pagination={{
            pageSize: 100
        }}
      />
    )
}

const MySubmissions = () => {

    const {id} = useParams()

  return (
    <div className='mt-3 px-10 flex flex-col'>
        <div>
            <Link to={`/contests/results/${id}`}>
                <Button>
                    Netijeler
                </Button>
            </Link>
        </div>
        <Submissions   />
    </div>
  )
}

export default MySubmissions