import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'

const AdminAppLayout = () => {
    return (
    <div className='grid grid-cols-[17rem_1fr] grid-rows-[auto_1fr] h-screen'>
      <Sidebar />
      <Header />
      <main className='bg-white border-l border-gray-300 overflow-x-auto px-3 relative'>
        <Outlet/>
      </main>
    </div>
  )
}

export default AdminAppLayout