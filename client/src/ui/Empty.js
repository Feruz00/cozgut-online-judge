import React from 'react'
import {  RxMagnifyingGlass } from 'react-icons/rx'

const Empty = () => {
  return (
    <div className='w-full pt-6 flex flex-col items-center justify-center border-t'>
        <RxMagnifyingGlass className='text-4xl text-gray-600' />
        <p className=' font-semibold text-lg'>Maglumat tapylmady</p>
    </div>
  )
}

export default Empty