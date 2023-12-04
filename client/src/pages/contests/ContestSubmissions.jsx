import React from 'react'
import { useContestSubmission } from '../../services/useSubmissions'
import Loading from '../../ui/Loading'
import { Radio, Select, Table } from 'antd'
import { Link, useSearchParams } from 'react-router-dom'
import moment from 'moment'
import { RxExclamationTriangle } from 'react-icons/rx'
import { useCurrentUser } from '../../features/auth/useAuth'
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
const ContestSubmissions = () => {
    const {isLoading, submissions} = useContestSubmission()
    const {isAuthenticated,user, isLoading: isUserLoading} = useCurrentUser()
    const [searchParams, setSearchParams] = useSearchParams()
    const loading = isUserLoading || isLoading
    const NU = p=>{
      if(p<10) return '0'+p;
      return p
    }
    if(loading) return <Loading />
  return (
    <div className='my-3 px-10 grid grid-cols-[1fr_15rem] gap-5'>
        <Table
        bordered
        size='small'
        className='mt-5 ' 
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
            render: (p,_)=> <Link to={`/contests/${_?.contest?._id}/${p?._id}`}> {p?.title} </Link> 
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
        <div className='mt-5 flex flex-col gap-5'>
            <div className='shadow rounded-t px-3 py-1  flex items-center'>
                <p className='font-medium text-xl'> Filter: </p>
            </div>
            {
                isAuthenticated && (
                    <div className='shadow rounded-t px-3 py-2'>
                        <div className='flex flex-col gap-3'>
                            <p className='font-medium text-sm'>Kimleriň ugratmasy:</p>
                            <Radio.Group onChange={e=>{
                                
                                searchParams.set('who', e.target.value)
                                setSearchParams(searchParams)
                            }} defaultValue={searchParams.get('who')|| 'all'}>
                                <Radio.Button value="me">Özüm</Radio.Button>
                                <Radio.Button value="all">Ähli</Radio.Button>
                            </Radio.Group>
                        </div>
                    </div>
                    
                )
            }
            <div className='shadow rounded-t px-3 py-2'>
                <div className=' flex flex-col gap-3'>
                    <p className='font-medium text-sm'>Jogaby saýla:</p>
                    <Select 
                        className='w-full'
                        defaultValue={ searchParams.get('answer') || 'all'}
                        onChange={val=>{
                            searchParams.set('answer', val)
                            setSearchParams(searchParams)
                        }}
                         options={[
                            {
                              value: 'all',
                              label: 'Ählisi',
                            },
                            {
                              value: 'ACCEPTED',
                              label: 'Dogry jogap',
                            },
                            {
                              value: 'WRONG ANSWER',
                              label: 'Ýalňyş jogap',
                            },
                            {
                              value: 'RUNTIME ERROR',
                              label: 'Näsazlygyň ýüze çykmagy'
                            },
                            {
                                value: 'COMPILATION ERROR',
                                label: 'Kompliýasy ýalňyşlygy'
                            },
                            {
                                value: 'TIME LIMIT',
                                label: 'Wagtyň çäkligi'
                            },
                            {
                                value: 'MEMORY LIMIT',
                                label: 'Möçberiň çäkligi'
                            }  
                          ]}
                    />
                </div>
            </div>
        </div>
    </div>
  )
}

export default ContestSubmissions