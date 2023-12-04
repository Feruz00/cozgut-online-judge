import React, { useEffect } from 'react'
import FormRow from '../ui/FormRow'
import { Button, Input } from 'antd'
import { AiOutlineKey, AiOutlineUser } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'
import { useLogin } from '../features/auth/useAuth'

const Login = () => {
    const {control, handleSubmit, reset, formState: {errors}} = useForm()

    const {login, isLogining} = useLogin()

    useEffect( ()=>{
        document.title='Ulgama gir'
    },[] )

    const onSubmit = d=>{
        login(d, {
            onSettled: ()=>{
                reset()
                
            }
        })    
    }

  return (
    <div className='w-full flex h-full items-center justify-center flex-col gap-8'>
        <h1 className='text-xl font-normal text-center'>Çözgüt - onlaýn bäsleşik platformasyna <br/> hoş geldiňiz!</h1>
        <form className='w-7/12' onSubmit={handleSubmit(onSubmit)} >
            <FormRow label="Login ýa-da email adress" small error={errors?.username?.message} >
                <Controller 
                    name='username'
                    rules={{
                        required: 'Gözkezilen meýdany dolduryň'
                    }}
                    control={control}
                    render={ ({field})=> <Input prefix={<AiOutlineUser />} {...field} disabled={isLogining} /> }
                />
            </FormRow>
            <FormRow label="Açar sözi" small  error={errors?.password?.message}>
                <Controller 
                    name="password"
                    rules={{
                        required: 'Gözkezilen meýdany dolduryň'
                    }}
                    control={control}
                    render={ ({field})=> <Input.Password prefix={<AiOutlineKey />} {...field}   disabled={isLogining} /> }
                    
                />
            </FormRow>
            <FormRow>
                <Button htmlType='submit' type='primary' className='px-10 mr-28 my-2'  disabled={isLogining} loading={isLogining}>
                    Içeri gir
                </Button>
            </FormRow>
        </form>
        <div className='w-7/12 flex justify-between px-28 '>
            <Link to="../reset" className='no-underline text-indigo-600 hover:text-indigo-500 transition-all duration-300'> Açar sözi ýatdan çykdymy? </Link>
            <Link to="../register" className='no-underline text-indigo-600 hover:text-indigo-500 transition-all duration-300'> Ulgama hasaba dur </Link>
            
        </div>
    
    </div>
  )
}

export default Login