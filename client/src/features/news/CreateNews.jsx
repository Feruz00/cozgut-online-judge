import { Button, Input } from 'antd'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import FormRow from '../../ui/FormRow'
import Editor from '../../components/SunEditor'
import { useCreateBlog } from '../../services/useBlogs'
import { useNavigate } from 'react-router-dom'

const CreateNews = () => {
    const {createBlog, isLoading} = useCreateBlog()
    const {handleSubmit, reset, formState: {errors}, control} = useForm({
        defaultValues:{
            body: ''
        }
    })

    const navigate = useNavigate()
    const onSubmit = (d)=>{
        createBlog(d, {
            onSuccess: ()=>{
                reset()
                navigate(-1, {replace:true})
            }
        })
    }
    return (
    <div className='mt-3 px-10 flex flex-col gap-4'>
        <div className='w-full flex items-center justify-between px-3 py-2 shadow rounden'>
            <h1 className='text-lg'>Täze bildiriş döret:</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
            <FormRow label="Sözbaşy" error={errors?.title?.message}>
                <Controller 
                    name="title"
                    control={control}
                    rules={{
                        required: 'Bildirişiň sözbaşysyny giriziň'
                    }}
                    render={({field})=><Input {...field} />}
                />
            </FormRow>
            <FormRow label="Beýan" error={errors?.body?.message} isEditor>
                <Controller 
                    name='body'
                    control={control}
                    rules={{
                        required:'Beýany giriziň',
                        validate: val=>{
                            const contentTestContainer = document.createElement('div');
                            contentTestContainer.innerHTML = val;
                            const textContent = contentTestContainer.textContent;
                            
                            return textContent.length > 0 || 'Çykyşyň düzgüni zerur'
                            // console.log(textContent)
                        }
                    }}
                    render={ ({ field: {value, onChange} })=>(
                        <Editor value={value} onChange={onChange} big />
                    ) }
                />
            </FormRow>
            <FormRow >
                <Button htmlType='submit' type='primary' className='mr-[9rem]'
        
                disabled={isLoading}
                loading={isLoading}
                        
                > Ugrat </Button>
            </FormRow>
        </form>
    </div>
  )
}

export default CreateNews