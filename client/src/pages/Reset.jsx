import React, { useEffect } from 'react'
import FormRow from '../ui/FormRow'
import { Button, Input } from 'antd'
import { AiOutlineKey, AiOutlineUser } from 'react-icons/ai'
import { Link } from 'react-router-dom'

const Reset = () => {
    useEffect( ()=>{
        document.title='Dikelt parolyny'
    },[] )
  return (
    <div className='w-full flex h-full items-center justify-center flex-col gap-8'>
        <h1 className='text-xl font-normal text-center'>Çözgüt - onlaýn bäsleşik platformasyna <br/> hoş geldiňiz!</h1>
        <form className='w-7/12'>
            <FormRow label="Email adress" small>
                <Input 
                    prefix={<AiOutlineUser />}
                />
            </FormRow>
            <FormRow>
                <Button htmlType='submit' type='primary' className='px-10 mr-28 my-2'>
                    Tassykla
                </Button>
            </FormRow>
        </form>
        <div className='w-7/12 flex justify-between px-28 '>
            <Link to="../login" className='no-underline text-indigo-600 hover:text-indigo-500 transition-all duration-300'> Ulgama gir </Link>
            <Link to="../register" className='no-underline text-indigo-600 hover:text-indigo-500 transition-all duration-300'> Ulgama hasaba dur </Link>
            
        </div>
    
    </div>
  )
}

export default Reset