import React from 'react'
import { useDeleteTag, useGetTags } from './useProblems';
import { useSearchParams } from 'react-router-dom';
import { Table } from 'antd';
import Loading from '../../ui/Loading';
import { TagColumn } from './TagColumn';

const TagPage = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    
    const {deleteTag} = useDeleteTag()
    const {isTagsLoading, tags} = useGetTags()
    // console.log(isTagsLoading)
    const onChange = (pagination, filters, sorter, extra) => {
        // if(filters){
        //     if(filters.title){
        //         searchParams.set(`title`,filters.title.join(','))
        //     }
        //     else{
        //         searchParams.delete('title')
        //     }
        //     setSearchParams(searchParams)
        // }
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
    isTagsLoading ? <Loading />:
    <Table 
        bordered
        loading={(isTagsLoading)}
        size='medium'

        onChange={onChange}
        columns={TagColumn(deleteTag)}
        dataSource={tags.map( i=>({...i, key:i._id}))}
        // pagination={{
        //     pageSize: 50,
        //     total:problems.count
        // }}
    />
  )
}

export default TagPage