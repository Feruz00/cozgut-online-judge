import React from 'react'
import { useGetContest } from '../../services/useContest'
import CreateContest from './CreateContest'
import Loading from '../../ui/Loading'

const EditContest = () => {
    const {contest, isContestLoading} = useGetContest()
    
    if( isContestLoading ) return <Loading />
    return (
    <CreateContest 
        editContest={contest}
    />
  )
}

export default EditContest