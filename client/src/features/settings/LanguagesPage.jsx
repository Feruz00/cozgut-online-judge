import React from 'react'
import { useGetLanguages } from './useLanguages'
import Loading from '../../ui/Loading'
import { Alert, Button, Table } from 'antd'
import { RxPencil2 } from 'react-icons/rx'
import AddLanguage from './AddLanguage'
import Modal from '../../ui/Modal'

const LanguagesPage = () => {
    const {languages, isLoadingLanguages} = useGetLanguages()

    if(isLoadingLanguages) return <Loading />
  return (
    <div className='flex flex-col gap-3'>
        <div className='w-full flex justify-end'>
            <Modal>
                <Modal.Open opens="new">
                    
                    <Button>Täze prog.dili döret</Button>
                </Modal.Open>
                <Modal.Window name="new">
                    <AddLanguage />
                </Modal.Window>
            </Modal>
        </div>
        <Table 
            bordered
            pagination={false}

            columns={[
                {
                    title: 'Komplýatoryň ady',
                    dataIndex:'title'
                },
                {
                    title: 'Komplýatoryň giňeltmese',
                    dataIndex:'extension'
                },
                {
                    title: 'Komplýatoryň barlag komandasy',
                    dataIndex:'compiler'
                },
                {
                    title: 'Işjeňligi',
                    dataIndex: 'status',
                    render: (p,_)=> p ? <Alert type='success' message="Işjeň ýagdaýda">  </Alert>: 
                                        <Alert type='warning' message="Wagtlaýyn doýduryldy">  </Alert>
                },
                {
                    title: 'Sazlamalar',
                    render: (row, record)=> <div className="w-full flex gap-4">
                            <Modal>
                                <Modal.Open opens="edit-tag">
                                    <RxPencil2 className="cursor-pointer text-lg text-nft-dark" />
                                </Modal.Open>
                                <Modal.Window name="edit-tag">
                                    <AddLanguage edit={record} />
                                </Modal.Window>
                            </Modal>
                    </div>
                }
                
            ]}

            dataSource={languages?.map(i=>({...i, key: i._id}))}
        /> 
    </div>
    
  )
}

export default LanguagesPage