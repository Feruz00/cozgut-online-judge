import { AutoComplete, Tag } from 'antd'
import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getTag } from '../api/apiTags'

const Tags = ({name, watch, setValue}) => {
    const [q, setQ] = useState('')

    const {data:tags, isLoading: isTagsLoading} = useQuery( [q], ()=>getTag({q}) )    

    const onSelect = (data)=>{
        // console.log(tags.filter( i=> i.name === data ))
        const other = watch(name) || []
        if( other.filter( i=> i.name === data ).length || other.length > 6 ) return
        setValue(name, [...other, tags.filter( i=> i.name === data )[0] ])
    }
    const onSearch = (val)=>{
        setQ(val)
    }

  return (
    <div className='w-full flex flex-row gap-4'>
        <AutoComplete 
            className='w-1/4' 
            onSearch={onSearch}
            onSelect={onSelect}
            options={isTagsLoading ? [] : tags.map( i=>({value: i.name, label: i.name}) )}
        />
        <div className='flex '>
            {
                watch(name).map( i=><Tag key={i._id} className='flex items-center' closable 
                    onClose={()=>setValue(name, watch(name).filter( j=>j._id !== i._id ) )}
                >
                    {i.name}
                </Tag> )
            }
        </div>
    </div>
  )
}

export default Tags