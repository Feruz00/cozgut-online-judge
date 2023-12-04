import React from 'react'
import Loading from '../../ui/Loading'
import { useDeleteContest, useGetContests } from '../../services/useContest'
import { Popconfirm,  Table, Typography } from 'antd'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { RxFilePlus, RxPencil2, RxTrash} from 'react-icons/rx'

const ShowContests = () => {
    const {isContestLoading, contests} = useGetContests()
    const {deleteContest} = useDeleteContest()
    const NU = num=>{
        if(num < 10) return `0${num}`
        return num
      }
    if(isContestLoading) return <Loading />
    return (
        <div className='flex flex-col gap-3'>
            <div>
                <Typography.Title level={4}> Öňümizdäki bäsleşikler: </Typography.Title>
                <Table 
                    bordered
                    columns={[
                        {
                            title: 'Bäsleşigiň ady',
                            dataIndex: 'title',
                            render: (p,_)=> <Link to={_._id}> {p} </Link>
                        },
                        // {
                        //     title: 'Awtorlar',
                        //     dataIndex: 'authors',
                        //     render: p=> p.map( q => <Link to={`../users/${q.username}`} > {q.username} </Link> )
                        // },
                        {
                            title: 'Başlamaly wagty',
                            dataIndex: 'start_time',
                            render: p=> `${moment(p).format('D.M.yyyy')}. ${moment(p).format('kk:mm')}`
                        },
                        {
                            title: 'Dowamlylygy',
                            dataIndex: 'duration',
                            render: p=> `${NU(p.hour)}:${NU(p.minutes)}`
                        },
                        {
                            title: 'Bäsleşigiň görnüşi',
                            dataIndex: 'public',
                            render: p => p ? 'Hemme üçin':'Topar üçin'
                        },
                        {
                            title: 'Sazlamalar',
                            dataIndex: '_id',
                            render: (p, _)=> <div className='flex flex-row justify-evenly gap-2'>
                                <Link to={`edit/${p}`} className='text-gray-800'>
                                    <RxPencil2 className='text-base' />
                                </Link>
                                <Popconfirm title="Siz pozmakcymy?" onConfirm={()=>deleteContest(p)}>
                                    <RxTrash className="cursor-pointer text-lg" />
                                </Popconfirm>
                                <Link to={`${p}`} className='text-gray-800'>
                                    <RxFilePlus  className='text-base'  />
                                </Link>
                              
                            </div>
                        }
                    ]}
                    dataSource={contests.before.map( i=> ({...i, key: i._id}))}
                    pagination={false}
                />
            </div>
            <div>
                <Typography.Title level={4}> Bolan bäsleşikler: </Typography.Title>
                <Table 
                    bordered
                    columns={[
                        {
                            title: 'Bäsleşigiň ady',
                            dataIndex: 'title',
                            render: (p,_)=> <Link to={_._id}> {p} </Link>
                        },
                        // {
                        //     title: 'Awtorlar',
                        //     dataIndex: 'authors',
                        //     render: p=> p.map( q => <Link to={`../users/${q.username}`} > {q.username} </Link> )
                        // },
                        {
                            title: 'Başlamaly wagty',
                            dataIndex: 'start_time',
                            render: p=> `${moment(p).format('D.M.yyyy')}. ${moment(p).format('kk:mm')}`
                        },
                        {
                            title: 'Dowamlylygy',
                            dataIndex: 'duration',
                            render: p=> `${NU(p.hour)}:${NU(p.minutes)}`
                        },
                        {
                            title: 'Bäsleşigiň görnüşi',
                            dataIndex: 'public',
                            render: p => p ? 'Hemme üçin':'Topar üçin'
                        }
                    ]}
                    dataSource={contests.after.map( i=> ({...i, key: i._id}))}
                />
            </div>
        </div>
  )
}

export default ShowContests