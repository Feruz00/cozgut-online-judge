import React from 'react'
import { useGetProblemsBySubsection } from './useSection'
import Loading from '../../ui/Loading'
import { Button, Popconfirm, Table, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { RxPencil2, RxTrash } from 'react-icons/rx'
import { useDeleteProblem } from '../problems/useProblems'

const ProblemsBySection = () => {
    const {data, isLoading} = useGetProblemsBySubsection()
    
  const {deleteProblem} = useDeleteProblem()
    if(isLoading) return <Loading />
  return (
    <div className='mt-3 px-10 flex flex-col gap-10'>
        <div className='shadow px-5 py-1 flex items-center justify-between'>
            <Typography.Title level={4}> Bölümçe: {data.subsection?.title} </Typography.Title>
            <Link to="problem">
                <Button> Mesele goş </Button>
            </Link>
        </div>
        <Table 
            columns={[
                {
                    title: "№",
                    dataIndex: 'index',
                    width: '1rem'
                },
                {
                    title: 'Meseläniň ady',
                    dataIndex: 'title',
                    render: (p, _)=> <Link to={`view/${_._id}`}> {p} </Link>
                },
                {
                    title: 'Test düzgüni',
                    dataIndex: 'withTestFile',
                    render: q=> <p className='text-xs '>{q ? 'Faýl arkaly': 'Standart'}</p>,
                    width: '4rem'
                },
                {
                    title: "Wagt(s)",
                    dataIndex: 'time',
                    width: '3rem'
                },
                {
                    title: "Möçberi(mb)",
                    dataIndex: 'memory',
                    width: "3rem"
                },
                {
                    title: 'Sazlama',
                    dataIndex: '_id',
                    render: p=> <div className='flex gap-3 text-xl text-gray-600'>
                        <Link to={`edit/${p}`} className="text-gray-600">
                            <RxPencil2 />
                        </Link>

                        <Popconfirm  title="Siz pozmakcymy?" onConfirm={()=>deleteProblem(p)}>
                            <RxTrash className='cursor-pointer'/>
                        </Popconfirm>

                    </div>,
                    width: '2rem'
                }
            ]}
            bordered
            loading={isLoading}
            dataSource={data?.problems?.map( (i, index)=>({...i, key: i._id, index: index+1}) )}
            pagination={false}
    />
    </div>
  )
}

export default ProblemsBySection