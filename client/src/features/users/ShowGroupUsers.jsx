import React from 'react'
import Loading from '../../ui/Loading'
import { useDeleteUser, useGetUsers, useUpdateUser } from '../../services/useUsers'
import { Button, Popconfirm, Table } from 'antd'
import Modal from '../../ui/Modal'
import AddMember from './AddMember'
import { RxPencil2, RxTrash } from 'react-icons/rx'
const ShowGroupUsers = () => {
    const {users, isLoading} = useGetUsers()
    const {updateUser} = useUpdateUser()
    const {deleteUser} = useDeleteUser()
    const handleClick = (p)=>{
        updateUser(p)
    }
    if(isLoading) return <Loading />
    
    return  <div>
        <div className='flex justify-end mb-1'>
            <Modal>
                <Modal.Open opens="group-user">
                    <Button>
                        Täze gatnaşyjy goş
                    </Button>
                </Modal.Open>
                <Modal.Window name="group-user">
                   <AddMember />
                </Modal.Window>
            </Modal>
        </div>
        <Table
        bordered
        columns={[
            {
                title: 'Ulanyjynyň logini',
                dataIndex: 'username'
            },
            {
                title: 'Ulanyjynyň doly ady',
                dataIndex: 'fullName',
                render: p=> p||'----------------'
            },
            {
                title: 'Ulanyjynyň email adresi',
                dataIndex: 'email'
            },
            {
                title: 'Aktiwlik',
                dataIndex:'_id' ,
                render: (p, _)=> _.status ? <Button onClick={()=>handleClick(p)}>Işjeňlikden aýyr</Button>
                                          : <Button onClick={()=>handleClick(p)} type='primary'>Işjeň et</Button> 
            },
            {
                title: 'Sazlama',
                dataIndex:'_id' ,
                render: (p, _)=> <div className='text-xl flex justify-evenly'>
                    <Modal>
                        <Modal.Open opens="group-edit">
                            <RxPencil2 className='cursor-pointer' />
                        </Modal.Open>
                        <Modal.Window name="group-edit">
                            <AddMember edit={_}  />
                        </Modal.Window>
                    </Modal>
                    <Popconfirm title="Siz ulanyjyny pozmakçymy?" onConfirm={()=>deleteUser(p)}>
                        <RxTrash  className='cursor-pointer' />
                    </Popconfirm>
                </div>
            },
            
            
        ]}
        dataSource={users.map( i=>({...i, key:i._id}) )}
    />
    </div> 
}

export default ShowGroupUsers