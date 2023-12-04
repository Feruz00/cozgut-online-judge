import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import FormRow from '../../ui/FormRow'
import { Button, Input } from 'antd'
import { useChangeInfo } from '../auth/useAuth'

const ChangeUsername = ({profile}) => {
    const {control, reset, formState: {errors}, handleSubmit} = useForm({
        defaultValues: {
            username: profile?.username,
            fullName: profile?.fullName || '',
            email: profile?.email
        }
    })
    const {isLoading, changeInfo} = useChangeInfo()
    const onSubmit = (d)=>{
        changeInfo(d, {
            onSuccess:()=>{
                reset()
            }
        })
    }
  return (
    <div className=' shadow px-5 py-3 flex flex-col gap-6 '>
            <h3 className='font-medium'> Maglumatlary üýtget: </h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormRow label="Login" error={errors?.username?.message}>
                    <Controller 
                        name='username'
                        control={control}
                        rules={{
                            required: 'Logini giriziň'
                        }}
                        render={({field})=> <Input {...field} maxLength={30} showCount />}
                    />
                </FormRow>
               
                <FormRow label="Doly ady" error={errors?.fullName?.message}>
                    <Controller 
                        name='fullName'
                        control={control}
                        rules={{
                            required: 'Doly adyny giriziň'
                        }}
                        render={({field})=> <Input {...field} maxLength={60} showCount />}
                    />
                </FormRow>

                <FormRow >
                    <Button disabled={isLoading} 
                        loading={isLoading} type='primary' className='px-7 mr-[12rem]'
                        htmlType='submit'    
                    >Ugrat</Button>
                </FormRow>
                
            </form>
        </div>
  )
}

export default ChangeUsername