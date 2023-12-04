import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import FormRow from '../../ui/FormRow'
import { Button, Input } from 'antd'
import { useCreateTag, useUpdateTag } from './useProblems'

const AddTag = ({onCloseModal, editTag={}}) => {
    const {_id: editId, ...editValues } = editTag
    const isEditSession = Boolean(editId)
  
    const {control, reset, formState, handleSubmit} = useForm({
        defaultValues: isEditSession ? editValues : {}
    })
    const {isCreatingTag, createTag} = useCreateTag()
    const {updateTag, isUpdatingTag} = useUpdateTag()
    const onSubmit = (d)=>{
        if(isEditSession){
            updateTag({id: editId, data:d}, {
                onSuccess: ()=>{
                    reset()
                    onCloseModal?.()
                }
            })
        }
        else{
            createTag(d, {
                onSuccess: ()=>{
                    reset()
                    onCloseModal?.()
                    // toast.success('Täze teg döredildi')
                }
            })
        }
    }
  const {errors} = formState
  return (
    <div className='w-96'>
        <form onSubmit={handleSubmit(onSubmit)}>

            <div
                className='w-full flex flex-col gap-3'
            >
                <div className='flex w-full flex-row gap-2'>
                    <p>Teg:</p>

                    <Controller
                        rules={{ required: 'Tegiň adyny giriziň' }}
                        name="name"
                        control={control}
                        render={({ field }) => <Input 
                            {...field} 
                            maxLength={20} 
                            showCount  
                        />}
                    />
                </div>

                <p className='text-red-600 font-medium text-right text-sm'>{errors?.name?.message}</p>
            </div>
            <FormRow>
                <Button type='primary' htmlType='submit' 
                    disabled={isCreatingTag || isUpdatingTag} 
                    loading={isCreatingTag || isUpdatingTag}>
                    Tassykla
                </Button>
            </FormRow>
        </form>
    </div>
  )
}

export default AddTag