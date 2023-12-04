import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import FormRow from '../../ui/FormRow'
import { Button, Input, Radio } from 'antd'
import { useCreateLanguage, useEditLanguage } from './useLanguages'

const AddLanguage = ({edit={}, onCloseModal}) => {
    const {_id: editId, ...editValue} = edit
    const isEdit = Boolean(editId)

    const {isLoading: isCreating, createLanguage} = useCreateLanguage()
    const {isLoading: isEditing, editLanguage} = useEditLanguage()

    const loading = isCreating || isEditing ;

    const {control, reset, formState: {errors}, handleSubmit} = useForm({
        defaultValues: isEdit ? editValue : {
            status: true,
            title: '',
            extension: '',
            compiler: ''
        }
    })

    const onSubmit = d =>{
        if(isEdit){
            editLanguage({id: editId, d}, {
                onSuccess: ()=> {
                    reset()
                    onCloseModal?.()
                }
            })
        }
        else{
            createLanguage(d, {
                onSuccess: ()=> {
                    reset()
                    onCloseModal?.()
                }
            })
        }

    }
  return (
    <div className='w-[50rem]'>
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormRow label="Komplýatoryň ady" error={errors?.title?.message}>
                <Controller 
                    name="title"
                    control={control}
                    rules={{
                        required: 'Komplýatoryň adyny adyny giriziň'
                    }}
                    render={({field})=> <Input maxLength={30} showCount {...field} /> }
                />
            </FormRow>
            <FormRow label="Komplaýatoryň giňeltmesi" error={errors?.extension?.message}>
                <Controller 
                    name="extension"
                    control={control}
                    rules={{
                        required: 'Komplaýatoryň giňeltmesi giriziň'
                    }}
                    render={({field})=> <Input maxLength={30} showCount {...field} /> }
                />
            </FormRow>
            <FormRow label="Komplaýatoryň barlag faýly" error={errors?.compiler?.message}>
                <Controller 
                    name="compiler"
                    control={control}
                    rules={{
                        required: 'Komplaýatoryň barlag faýlyny giriziň'
                    }}
                    render={({field})=> <Input maxLength={30} showCount {...field} /> }
                />
            </FormRow>
            <FormRow label="Komplaýatoryň işjeňligi">
                <Controller 
                    name="status"
                    control={control}
                    render={({field})=> <Radio.Group {...field} >
                        <Radio.Button value={true}>Işjeň</Radio.Button>
                        <Radio.Button value={false}>Işjeň däl</Radio.Button>
                        
                    </Radio.Group> }
                />
            </FormRow>
            
            <FormRow>
                <Button htmlType='submit' className='px-10' type='primary' disabled={loading} loading={loading} > Ugrat </Button>
            </FormRow>
            
        </form>
    </div>
  )
}

export default AddLanguage