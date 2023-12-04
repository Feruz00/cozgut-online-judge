import React, { useState } from 'react'
import { AutoComplete } from 'antd'
import { useQuery } from '@tanstack/react-query'
import { getUsersApi } from '../../api/apiUsers'

const ModalAdding = ({setUser}) => {
    const [q, setQ] = useState('')
    
    const {data:users, isLoading} = useQuery( [q], ()=>getUsersApi('group',q) )    
    const onSelect = (data)=>{
        setUser(data)
    }
    const onSearch = (val)=>{
        setQ(val)
    }
  return (
    <div className='flex-1 flex flex-row gap-4'>
       <AutoComplete 
            className='w-full' 
            placeholder="Ulanyjyny gözle"
            onSearch={onSearch}
            onSelect={onSelect}
            options={isLoading ? [] : users.map( i=>({value: i.fullName, label: i.fullName}) )}
        />
    </div>
  )
}

export default ModalAdding