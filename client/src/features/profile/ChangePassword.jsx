import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import FormRow from '../../ui/FormRow'
import { Button, Input } from 'antd'
import {useChangePassword} from '../auth/useAuth'

const ChangePassword = () => {
    const {control, reset, formState: {errors}, handleSubmit} = useForm()
    
    const {changePassword, isLoading} = useChangePassword()

    const onSubmit = (d)=>{
        changePassword(d, {
            onSuccess: ()=>{
                reset()
            }
        })
    }
  return (
    <div className=' shadow px-5 py-3 flex flex-col gap-6 '>
            <h3 className='font-medium'> Maglumatlary üýtget: </h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormRow label="Öňki açar sözi" error={errors?.password?.message}>
                    <Controller 
                        name='oldPassword'
                        control={control}
                        rules={{
                            required: 'Açar sözüni giriziň'
                        }}
                        render={({field})=> <Input.Password {...field} maxLength={30} showCount />}
                    />
                </FormRow>
               
                <FormRow label="Täze açar sözi" error={errors?.fullName?.message}>
                    <Controller 
                        name='newPassword'
                        control={control}
                        rules={{
                            required: 'Açar sözüni giriziň'
                        }}
                        render={({field})=> <Input.Password {...field} maxLength={30} showCount />}
                    />
                </FormRow>

                <FormRow >
                    <Button type='primary' className='px-7 mr-[12rem]' 
                        htmlType='submit'
                        disabled={isLoading} 
                        loading={isLoading}
                    >Ugrat</Button>
                </FormRow>
                
            </form>
        </div>
  )
}

export default ChangePassword