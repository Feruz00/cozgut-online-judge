import { Tabs, Typography } from 'antd'
import React from 'react'
import Loading from '../../ui/Loading'
import { useGetContest } from '../../services/useContest'
import { useSearchParams } from 'react-router-dom'
import AddPartipcates from './AddPartipcates'
import AddProblem from './AddProblem'
import moment from 'moment'
import { useTime } from '../../hooks/useTimer'
import Rezultatlar from './Rezultatlar'

const Details = () => {
  
  const [searchParams, setSearchParams] = useSearchParams()

  const {contest, isContestLoading} = useGetContest()
  
  const {time} = useTime()
  let items = [{
      key:'problem',
      label: 'Ähli meseleler'
    },{
      label: 'Bäsleşige gatnaşyjylar',
      key: 'users'
    }]
  if(!isContestLoading){

    const now = moment(time)
    const contestEnd = moment(contest.start_time)
                    .add(contest.duration.hour , 'hours')
                    .add(contest.duration.minutes, 'minutes')
   
      if( now.diff(contestEnd) > 0 ){
        items.push({
          label: 'Netijeler',
          key: 'results'
        })
      }
  }
  if( isContestLoading ) return <Loading />
  return (
    <div className='mt-3 px-10'>
      <div className='flex justify-between items-center w-full shadow rounded px-6'>
        <Typography.Title level={4} > {contest?.title || 'adasda'} </Typography.Title>
        <Tabs 
          onChange={key=>{
            searchParams.set('add', key)
            setSearchParams(searchParams)
          }}
          defaultActiveKey={searchParams.get('add') ? searchParams.get('add') : 'problem'}
          items={items}
        />
      </div>
      <div>
        {
          searchParams.get('add') === 'users' 
          ? <AddPartipcates contest={contest} />
          : searchParams.get('add') === 'results' ? <Rezultatlar />
          : <AddProblem contest={contest} />
        }
      </div>
    </div>
  )
}

export default Details