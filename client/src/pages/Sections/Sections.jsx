import React, { useEffect } from 'react'
import { getSections } from '../../features/sections/useSection'
import { Table } from 'antd'
import Loading from '../../ui/Loading'
import { Link } from 'react-router-dom'

const Sections = () => {
    const {sections, isLoading} = getSections()
    useEffect( ()=>{
        document.title='Arhiw'
    },[] )
    if(isLoading) return <Loading />
  return (
    <div className='mt-3 px-14'>
        <Table 
            bordered
            columns={[
                {
                    title: 'Bölümiň ady',
                    dataIndex: 'title',
                    render: (p, _)=> <Link to={_._id} > {p} </Link>
                }
            ]}
            dataSource={sections.map( i=>({...i, key:i._id}) )}
            pagination={{
                pageSize: 20
            }}
        />
    </div>
  )
}

export default Sections