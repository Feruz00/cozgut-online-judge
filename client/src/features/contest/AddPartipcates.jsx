import {  Button, Popconfirm, Table } from 'antd'
import React, { useState } from 'react'
import ModalAdding from './ModalAdding'
import { useAddUserToContest, useRemoveUserToContest } from '../../services/useContest'
import {RxTrash} from 'react-icons/rx'

const AddPartipcates = ({contest}) => {
    const [user, setUser] = useState(null)
    const {removeUser} = useRemoveUserToContest()
    const {addUser, isAddindUser} = useAddUserToContest()
    const columns = [
        {
            title: 'Gatnaşyjynyň logini',
            dataIndex: 'username'
        },
        {
            title: 'Doly ady',
            dataIndex: 'fullName'
        },
        {
            title: 'Email adressi',
            dataIndex: 'email'
        }]
    if(!contest.public){
        columns.push({
            title: 'Sazlama',
            dataIndex: '_id',
            render: p=> <div className='flex items-center'>
                <Popconfirm title="Siz hakykatdanam gatnaşyjyny aýyrjakmy?" onConfirm={()=>removeUser({id: contest._id, user:p})}>
                    <RxTrash className="cursor-pointer text-lg" />
                </Popconfirm>
            </div>
        })
    }
    const handleClick = ()=>{
        addUser({id: contest._id, fullName: user}, {
            onSettled: ()=>{
                setUser(null)
            }
        })
    }
    return (
    <div className='flex gap-5 flex-col'>
        {
            !contest.public && !contest.isDisable && <div className='flex justify-start mt-3 gap-4 items-center'>
                <ModalAdding setUser={setUser} />
                <Button onClick={handleClick} disabled={(user=== null? true: false)|| isAddindUser}> 
                    Gatnyşyjy goş
                </Button>
            </div>
        }
        <Table 
            columns={columns}
            bordered
            pagination={false}
            dataSource={contest.users.map(i=>({...i, key:i._id}))}
        />
    </div>
  )
}

export default AddPartipcates