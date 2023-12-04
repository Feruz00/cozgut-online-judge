import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import FormRow from '../../ui/FormRow'
import { Button, Input } from 'antd'
import { useCreateAdmin } from '../../services/useUsers'

const NewAdmin = ({onCloseModal}) => {

    const {control, formState: {errors}, reset, handleSubmit} = useForm()

    const {isLoading, createAdmin} = useCreateAdmin()
    const onSubmit = d=>{
        createAdmin(d, {
            onSuccess: ()=>{
                reset()
                onCloseModal?.()
            }
        })
    }
  return (
    <div className='w-[40rem]'>
        
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormRow label="Doly ady" error={errors?.fullName?.message} >
                <Controller 
                    control={control}
                    name='fullName'
                    rules={{
                        required: 'Adyny giriziň'
                    }}
                    render={ ({field}) => <Input {...field} showCount maxLength={50} /> }
                />
            </FormRow>
            <FormRow label="Login" error={errors?.username?.message} >
                <Controller 
                    control={control}
                    name='username'
                    rules={{
                        required: 'Logini giriziň'
                    }}
                    render={ ({field}) => <Input {...field} showCount maxLength={30} /> }
                />
            </FormRow>
            <FormRow label="Email" error={errors?.email?.message} >
                <Controller 
                    control={control}
                    name='email'
                    rules={{
                        required: 'Emaili giriziň'
                    }}
                    render={ ({field}) => <Input {...field} showCount maxLength={50} /> }
                />
            </FormRow>

            <FormRow label="Açar sözi" error={errors?.email?.message} >
                <Controller 
                    control={control}
                    name='password'
                    rules={{
                        required: 'Açar sözüni giriziň'
                    }}
                    render={ ({field}) => <Input.Password {...field}  /> }
                />
            </FormRow>
            
            
            <FormRow>
                <Button  htmlType='submit'
                    disabled={isLoading} loading={isLoading}
                className='px-10' htmlTy pe='submit' type='primary'>
                    Ugrat
                </Button>
            </FormRow>
            
        </form>
    </div>
  )
}

export default NewAdmin