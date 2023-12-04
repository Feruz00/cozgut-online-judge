import { Button, Popconfirm, Table } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { useGetProblemsByContest } from '../../services/useContest'
import Loading from '../../ui/Loading'
import { RxPencil2, RxTrash } from 'react-icons/rx'
import { useDeleteProblem } from '../problems/useProblems'

const AddProblem = ({contest}) => {
  const {deleteProblem} = useDeleteProblem()
  const {problems, isProblems} = useGetProblemsByContest()
  const column = [
    {
      title: "№",
      dataIndex: 'num',
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
    }
  ]
  if( !contest.isDisable  ) column.push({
    title: 'Sazlama',
    dataIndex: '_id',
    render: (p, _)=> <div className='flex flex-row justify-evenly gap-2'>
      <Link to={`edit/${p}`} className='text-gray-800'>
          <RxPencil2 className='text-base' />
      </Link>
      <Popconfirm title="Siz pozmakcymy?" onConfirm={()=>deleteProblem(p)}>
          <RxTrash className="cursor-pointer text-lg" />
      </Popconfirm>
    </div>,
    width: '3rem'
  })
  if(isProblems) return <Loading />
  return (
    <div className='flex gap-5 flex-col'>
      {
        !contest.isDisable &&  (
          <div className='flex justify-end mt-3 gap-4 items-center'>
          <Link to="new">
            <Button> 
              + Täze mesele döret
            </Button>
          </Link>
        </div>
        )
      }
     
      <Table 
        columns={column}
        dataSource={problems.map((i, index)=>({...i, key:i._id, num: String.fromCharCode(index+65)}))}
        bordered
        pagination={false}
      />
    </div>
  )
}

export default AddProblem