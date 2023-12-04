import { Button, Table } from 'antd'
import React from 'react'
import { useGetAdmins } from '../../services/useUsers'
import Loading from '../../ui/Loading'
import Modal from '../../ui/Modal'
import NewAdmin from './NewAdmin'

const Admins = () => {
    const {isLoading, admins} = useGetAdmins()

    if(isLoading) return <Loading />
  return (
    <div className='flex flex-col gap-3'>
        <div>
            <Modal>
                <Modal.Open opens='new-admin'>
                    <Button>Täze admin döret</Button>
                </Modal.Open>  
                <Modal.Window name="new-admin">
                    <NewAdmin />
                </Modal.Window>
            </Modal>
        </div>
        <Table 
            bordered
            pagination={false}
            columns={[{
                title: 'Adminiň logini',
                dataIndex: 'username'
            },{
                title: 'Adminiň emaili',
                dataIndex: 'email'
            },{
                title: 'Adminiň doly ady',
                dataIndex: 'fullName',
                render: p=> p? p: '---------'
            }

        ]}
            dataSource={admins.map(i=>({...i, key: i._id })) }
        />
    </div>
  )
}

export default Admins