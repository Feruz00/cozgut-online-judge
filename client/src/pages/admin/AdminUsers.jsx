import { Tabs, Typography } from 'antd'
import { useSearchParams } from 'react-router-dom'
import ShowAllUsers from '../../features/users/ShowAllUsers'
import ShowGroupUsers from '../../features/users/ShowGroupUsers'

const AdminUsers = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  return (
    <div className='mt-3 px-10'>
      <div className='flex justify-between items-center w-full'>
        <Typography.Title level={4} > Ulanyjylar bölümi </Typography.Title>
        <Tabs 
          onChange={key=>{
            searchParams.set('type', key)
            setSearchParams(searchParams)
          }}
          defaultActiveKey={searchParams.get('type') ? searchParams.get('type') : 'all'}
          items={[
            {
              key:'all',
              label: 'Ähli ulanyjylar'
            },
            {
              label: 'Topar gatnaşyjylar',
              key: 'group'
            },
            
          ]}
        />
      </div>
      <div>
        {
          searchParams.get('type') === 'group' ? <ShowGroupUsers />
          : <ShowAllUsers />
        }
      </div>
    </div>
  )
}

export default AdminUsers