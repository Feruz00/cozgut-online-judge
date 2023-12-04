import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProblemsBySection } from '../../api/apiSections'
import Loading from '../../ui/Loading'
import { Table } from 'antd'

const ProblemsBySubsection = () => {
    const {subsection} = useParams()
    const {data, isLoading} = useQuery([subsection], ()=>getProblemsBySection(subsection))
    if(isLoading) return <Loading />
    return (
      <div className='mt-3 px-14'>
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
                    render: (p, _)=> <Link to={`${_._id}`}> 
                        {p}
                    </Link>
                },
                {
                    title: "Netije",
                    dataIndex:"_id",
                    render: (p,_)=> _?.isSend ? _?.isSuccess ? <p className='text-xl text-center text-green-600 font-medium'>+</p>: <p className='text-xl text-center text-red-600 font-medium'>-</p> : '----',
                    width:'2rem'
                },
                {
                    title: 'Test düzgüni',
                    dataIndex: 'withTestFile',
                    render: q=> <p className='text-xs '>{q ? 'Faýl arkaly': 'Standart'}</p>,
                    width: '10rem'
                },
                {
                    title: "Wagt(s)",
                    dataIndex: 'time',
                    width: '5rem'
                },
                {
                    title: "Möçberi(mb)",
                    dataIndex: 'memory',
                    width: "5rem"
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

export default ProblemsBySubsection