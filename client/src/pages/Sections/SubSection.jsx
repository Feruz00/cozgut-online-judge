import React from 'react'
import { useGetSubSectionsBySection } from '../../features/sections/useSection'
import Loading from '../../ui/Loading'
import { Table } from 'antd'
import { Link } from 'react-router-dom'

const SubSection = () => {
    const {data, isLoading} = useGetSubSectionsBySection()
    if(isLoading) return <Loading />
    return (
      <div className='mt-3 px-14'>
          <Table 
              bordered
              columns={[
                  {
                      title: 'Bölümçäniň ady',
                      dataIndex: 'title',
                      render: (p, _)=> <Link to={_._id} > {p} </Link>
                  }
              ]}
              dataSource={data.map( i=>({...i, key:i._id}) )}
              pagination={{
                  pageSize: 20
              }}
          />
      </div>
    )
}

export default SubSection