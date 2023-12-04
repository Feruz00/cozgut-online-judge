import { Button, Divider, Typography } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import ShowContests from '../../features/contest/ShowContests'
const AdminContest = () => {
  return (
    <div className='px-5 py-3 '>
      <div className='flex justify-between items-center'>
        <Typography.Title level={3}>Bäsleşikler</Typography.Title>
        <Link to="new">
        <Button type='primary'>
          {/* <Typography.Text> */}
            + Bäsleşik döret 
          {/* </Typography.Text>   */}
        </Button>
        </Link>
      </div>
      <Divider />
      <div className='w-full h-full'>
        <ShowContests />
      </div>
    </div>
  )
}

export default AdminContest