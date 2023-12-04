import React from 'react'
import Filter from '../../ui/Filter'
import {  useDeleteSection, useDeleteSubSection, useGetData } from '../../features/sections/useSection'
import Loading from '../../ui/Loading'
import Modal from '../../ui/Modal'
import { RxPlus } from 'react-icons/rx'
import AddSection from '../../features/sections/AddSection'
import { Button, Table, Typography } from 'antd'
import { SectionColumn, SubSectionColumn } from '../../features/sections/Columns'
import { useSearchParams } from 'react-router-dom'

const AdminSections = () => {
  const {isLoading, data, error} = useGetData() 
  
  const {deleteSubSection} = useDeleteSubSection()
  
  const {deleteSection} = useDeleteSection()
  // const {sections, isLoading: isSectionLoading} = getSections()
  
  // console.log(data)
  // const sectionColumn = SectionColumn()
  // const subSectionColumn = SubSectionColumn(data.parent ? data.parent :[])
  
  const [searchParams, setSearchParams] = useSearchParams()
  
  const onChange = (pagination, filters, sorter, extra) => {
    if(filters){
      // console.log(filters)
      if(filters.section){
          searchParams.set(`section`,filters.section.join(','))
        }
        else{
            searchParams.delete('section')
        }
        setSearchParams(searchParams)
    }
  
    if(pagination){
      searchParams.set('page', pagination.current)
      setSearchParams(searchParams)
    }
    if(sorter){
      if( sorter.field ){
        searchParams.set('sortField', sorter.field)
        searchParams.set('direction', sorter.order === "ascend" ?'asc': 'desc')
        setSearchParams(searchParams)  
      }
    }
  };
  return (
    <>
      <div className='w-full flex justify-between items-center shadow my-2 px-4'>
        <Typography.Title level={4}> Maglumatlar bölümi </Typography.Title>
        <div className='flex flex-row items-center gap-4 '>
          <Filter
            filterField='tab'
            options={[
              { value: 'main', label: 'Esasy bölümler' },
              { value: 'sub', label: 'Bölümçeler' }
            ]}
          />

          <Modal>
          <Modal.Open opens="section">
            <Button type='default' className='flex items-center gap-1' >
              <RxPlus />
              Täze goş
            </Button>   
          </Modal.Open>  
          <Modal.Window name="section">
            <AddSection />
          </Modal.Window>
        </Modal>
        </div>
        
      </div>
      <div className='w-full flex flex-col justify-center shadow-sm'>
        {
          (isLoading) ? <Loading />:
        
           !error && 
          <Table 
            bordered
            columns={ 
              searchParams.get('tab') === 'sub'? 
              SubSectionColumn(data.parent, deleteSubSection, searchParams.get(`section`) ? searchParams.get(`section`)  :"") : 
              SectionColumn(deleteSection)
              
            } 
            dataSource={data.data.map( i=>({...i, key: i._id}) )} 
            onChange={onChange} 
            loading={isLoading } 
            pagination={{
              pageSize: 15,
              // current: searchParams.get('page') ? searchParams.get('page') : 1,
              total: data.count
            }}
            
          />
          // <SectionBody data={data.data} count = {data.count} />
        }
        
      </div>
      
    </>
  )
}

export default AdminSections