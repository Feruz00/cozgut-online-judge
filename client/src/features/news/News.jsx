import { Button } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { useGetBlogs } from '../../services/useBlogs'

const News = () => {
    const {blogs, isLoading} = useGetBlogs()
  return (
    <div className='mt-3 px-10'>
        <div className='w-full flex items-center justify-between px-3 py-2 shadow rounden'>
            <p className='text-lg font-medium'> Bildirişler </p>
            <Link to="new">
                <Button type='primary'> + Täze bildiriş döret </Button>
            </Link>
        </div>
        News
    </div>
  )
}

export default News