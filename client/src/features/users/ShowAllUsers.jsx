import React from 'react'
import { useGetUsers, useUpdateUser } from '../../services/useUsers'
import Loading from '../../ui/Loading'
import { Button, Table } from 'antd'

const ShowAllUsers = () => {
    const {users, isLoading} = useGetUsers()
    const {updateUser} = useUpdateUser()
    const handleClick = (p)=>{
        updateUser(p)
    }
    if(isLoading) return <Loading />
    return <Table 
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
                title: 'Sazlamalar',
                dataIndex:'_id' ,
                render: (p, _)=> _.status ? <Button onClick={()=>handleClick(p)}>Işjeňlikden aýyr</Button>
                                          : <Button onClick={()=>handleClick(p)} type='primary'>Işjeň et</Button> 

            }
            
        ]}
        dataSource={users.map( i=>({...i, key:i._id}) )}
    />
}

export default ShowAllUsers