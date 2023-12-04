import React, { useEffect } from 'react'
import FormRow from '../ui/FormRow'
import { Button, Input } from 'antd'
import { AiOutlineKey, AiOutlineMail } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'
import { useRegister } from '../features/auth/useAuth'

const Register = () => {
    const {control, formState: {errors}, reset, handleSubmit, getValues} = useForm()
    const {register, isRegister} = useRegister()
    useEffect( ()=>{
        document.title='Hasaba dur'
    },[] )
    const onSubmit = ({password, username, email})=>{
        // console.log(d)
        register({password, username, email}, {
            onSettled: ()=>{
                reset()
            }
        })   
    }
  return (
    <div className='w-full flex h-full items-center justify-center flex-col gap-8'>
        <h1 className='text-xl font-normal text-center'>Çözgüt - onlaýn bäsleşik platformasyna <br/> hoş geldiňiz!</h1>
        <form className='w-7/12' onSubmit={handleSubmit(onSubmit)} >
            <FormRow label="Login" small error={errors?.username?.message} >
                <Controller 
                    name='username'
                    control={control}
                    rules={{
                        required: 'Loginiňizi giriziň',
                        minLength: {
                            message: '6 harpdan kop bolmaly',
                            value: 6
                        },
                        maxLength: {
                            message: '30 harpdan az bolmaly',
                            value: 30
                        }
                    }}
                    disabled={isRegister}
                    render={({ field }) => <Input {...field} showCount maxLength={30} />}
                />
                
            </FormRow>
            <FormRow label="Email adress" small error={errors?.email?.message}>
                <Controller 
                    disabled={isRegister}
                    name='email'
                    control={control}
                    rules={{
                        required: 'Email giriziň',
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: 'Dogry email addres giriziň'
                          }
                    }}
                    render={({ field }) => <Input {...field}  prefix={<AiOutlineMail />}  />}
                />
            </FormRow>
            
            <FormRow label="Açar sözi" small error={errors?.password?.message}>
                <Controller 
                    name='password'
                    disabled={isRegister}
                    control={control}
                    rules={{
                        required: 'Açar sözüni giriziň',
                    }}
                    render={({ field }) => <Input.Password {...field}  prefix={<AiOutlineKey />} />}
                />
                
            </FormRow>

            <FormRow label="Açar sözi tassykla" small error={errors?.con_password?.message}>
                <Controller 
                    name='con_password'
                    disabled={isRegister}
                    control={control}
                    rules={{
                        required: 'Tassyklavjy açar sözüni giriziň',
                        validate: val=> val === getValues().password || 'Açar sözler gabat gelmeli'
                    }}
                    render={({ field }) => <Input.Password {...field}  prefix={<AiOutlineKey />} />}
                />
            </FormRow>
            

            <FormRow>
                <Button loading={isRegister} disabled={isRegister} htmlType='submit' type='primary' className='px-10 mr-28 my-2'>
                    Hasaba dur
                </Button>
            </FormRow>
        </form>
        <div className='w-7/12 flex justify-between px-28 '>
            <Link to="../reset" className='no-underline text-indigo-600 hover:text-indigo-500 transition-all duration-300'> Açar sözi ýatdan çykdymy? </Link>
            <Link to="../login" className='no-underline text-indigo-600 hover:text-indigo-500 transition-all duration-300'> Ulgama gir </Link>
            
        </div>
    
    </div>
  )
}

export default Register