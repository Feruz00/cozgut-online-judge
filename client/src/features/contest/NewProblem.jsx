import React from 'react'
import Loading from '../../ui/Loading'
import { useGetContest } from '../../services/useContest'
import CreateProblem from '../../components/CreateProblem'

const NewProblem = () => {
    const {contest, isContestLoading} = useGetContest()
    
    if( isContestLoading ) return <Loading />
  
    return (
        <div className='mt-3 px-10'>
            <div className='flex flex-row gap-2 rounded shadow items-center px-5 py-1'>
                <p className='text-lg font-medium'>
                    Bäsleşik: 
                </p>
                <p className='text-lg'> {contest.title} </p>
            </div>
            <CreateProblem createContest = {true} contest={contest} />
        </div>
    )
}

export default NewProblem