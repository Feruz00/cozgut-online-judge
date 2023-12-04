import React from 'react'
import { useGetProblemById } from '../problems/useProblems'
import Loading from '../../ui/Loading'
import CreateProblem from '../../components/CreateProblem'

const EditSubSectionProblem = () => {
    const {data: problem, isLoading} = useGetProblemById()
    if(isLoading) return <Loading />
  return (
    <div className='mt-3 px-10'>
    <div className='flex flex-row gap-2 rounded shadow items-center px-5 py-1'>
        <p className='text-lg font-medium'>
            Bölümçe: 
        </p>
        <p className='text-lg'> {problem?.subsection?.title} </p>
    </div>
    <CreateProblem editProblem={ { ...problem, subsection: problem?.subsection?._id} } />
</div>
  )
}

export default EditSubSectionProblem