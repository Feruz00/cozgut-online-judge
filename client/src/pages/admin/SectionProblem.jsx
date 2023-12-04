import React from 'react'
import CreateProblem from '../../components/CreateProblem'
import { useGetSubsection } from '../../features/sections/useSection'
import Loading from '../../ui/Loading'
import { Typography } from 'antd'
const SectionProblem = () => {
  const {data, isLoading} = useGetSubsection()
  
  if(isLoading) return <Loading />

  return (
    <div className='mt-3'>
      <div className='flex justify-between items-center w-full shadow rounded px-6'>
        <Typography.Title level={4} > {data?.title || 'adasda'} bölümçesi </Typography.Title>
      </div>
      <CreateProblem subsection={data} createSubsection={true} />
    </div>
  )
}

export default SectionProblem