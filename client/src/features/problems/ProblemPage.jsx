import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDeleteProblem, useGetProblems } from './useProblems'
import Loading from '../../ui/Loading'
import { Table } from 'antd'
import { ProblemColumn } from './ProblemColumn'
import { useCurrentUser } from '../auth/useAuth'

const ProblemPage = ({size="medium"}) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const {user, isAuthenticated, isLoading:isUserLoading} = useCurrentUser()
    // console.log(role)
    const {isLoading, problems, isFetching} = useGetProblems()
    const {deleteProblem, isDeletingProblem} = useDeleteProblem()
    // console.log(isFetching, isLoading)
    const onChange = (pagination, filters, sorter, extra) => {
        if(filters){
            if(filters.title){
                searchParams.set(`title`,filters.title.join(','))
            }
            else{
                searchParams.delete('title')
            }
            // console.log(filters)
            setSearchParams(searchParams)
        }
        if(sorter){
            if(sorter.order){
                searchParams.set('sortField', sorter.field)
                searchParams.set('direction', sorter.order === 'ascend' ? 'asc': 'desc')
            }
            else{
                searchParams.delete('sortField')
                searchParams.delete('direction')
            }
            setSearchParams(searchParams)
        }
        // console.log(sorter)
    }

  return ( 
    isLoading ? <Loading />:
    <Table 
        bordered
        loading={isFetching || isDeletingProblem}
        size={size}
        className='mt-2'
        onChange={onChange}
        columns={
            ProblemColumn({parent: problems.parent, children: problems.children}, 
                searchParams.get('title') ? searchParams.get('title'): "", deleteProblem, isDeletingProblem, 
                !isUserLoading && isAuthenticated ? user.role : 'user')
            }
        dataSource={problems.data.map( i=>({...i, key: i._id}) )}
        pagination={{
            pageSize: 50,
            total:problems.count
        }}
    />
  )
}

export default ProblemPage