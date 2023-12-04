import React from 'react'
import FormRow from '../../ui/FormRow'
import { Controller, useForm } from 'react-hook-form'
import { Button, Input } from 'antd'
import { useCreateUser, useEditUser } from '../../services/useUsers'

const AddMember = ({edit = {}, onCloseModal}) => {
    const {_id: editID, ...editValue} = edit
    const isEdit = Boolean(editID)

    const {handleSubmit, reset, control, formState: {errors}} = useForm({
        defaultValues: isEdit ? {...editValue, password:''}:{}
    })
    const {createUser, isLoading} = useCreateUser()
    const {editUser, isEditing} = useEditUser()

    const rules = {}
    if(!isEdit){
        rules['required'] = "Ulanyjynyň üçin açar sözi gerek"
    }

    const onSubmit = (d)=>{
        if(isEdit){
            editUser({id: editID, d}, {
                onSuccess: ()=>{
                    reset()
                    onCloseModal?.()
                }
            } )
        }
        else{
            createUser(d, {
                onSuccess: ()=>{
                    reset()
                    onCloseModal?.()
                }
            })
        }
    }
    
  return (
    <div className='w-[45rem]'>
    <form onSubmit={handleSubmit(onSubmit)}>
        <FormRow label="Ulanyjy üçin login" error={errors?.username?.message}>
            <Controller 
                control={control}
                name='username'
                rules={{
                    required: 'Ulanyjy üçin login gerek'
                }}
                render={({field})=> <Input {...field} maxLength={30} showCount />}
            />
        </FormRow>
        <FormRow label="Ulanyjynyň doly ady" error={errors?.fullName?.message}>
            <Controller 
                control={control}
                name='fullName'
                rules={{
                    required: 'Ulanyjynyň doly ady gerek'
                }}
                render={({field})=> <Input {...field} maxLength={60} showCount />}
            />
        </FormRow>
        <FormRow label="Ulanyjynyň email adresi" error={errors?.email?.message}>
            <Controller 
                control={control}
                name='email'
                rules={{
                    required: 'Ulanyjynyň email adresi gerek'
                }}
                render={({field})=> <Input {...field} maxLength={60} showCount />}
            />
        </FormRow>
        <FormRow label="Ulanyjy üçin açar sözi" error={errors?.password?.message}>
            <Controller 
                control={control}
                name='password'
                rules={rules}
                render={({field})=> <Input.Password {...field}  />}
            />
        </FormRow>
        
        <FormRow>
            <Button htmlType='submit' type="primary" className='mr-[6.3rem]'
                disabled={isLoading || isEditing}
                loading={isLoading || isEditing}
            > Ugrat </Button>
        </FormRow>
    </form>
</div>
  )
}

export default AddMember