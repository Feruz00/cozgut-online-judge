import React from 'react'
import FileUploader from '../../ui/FileUploader'
import FormRow from '../../ui/FormRow'
import { useForm } from 'react-hook-form'
import { Button } from 'antd'
import { useUploadPhoto } from '../auth/useAuth'

const UploadAvatar = () => {
    const {register, reset, formState: {errors}, handleSubmit, watch} = useForm()

    const {isLoading, uploadPhoto} = useUploadPhoto()
    const onSubmit = (d)=>{
        const formData = new FormData()

        formData.append('file', d.avatar.item(0))

        uploadPhoto(formData, {
            onSuccess: ()=>{
                reset()
            }
        })

    }
  return (
    <div className=' shadow px-5 py-3 flex flex-col gap-6 '>
            <h3 className='font-medium'> Suratyny çalyş: </h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                
               
                <FormRow label="Suraty ýükle" error={errors?.fullName?.message} isEditor>
                    <FileUploader 
                        name='avatar'
                        watch={watch}
                        register={register}
                        validation={{
                            required: 'Suratyňyzy ýükläň'
                        }}
                    />  
                </FormRow>

                <FormRow >
                    <Button disabled={isLoading} loading={isLoading}  
                        htmlType='submit'
                        type='primary' className='px-7 mr-[12rem]'
                    >Ugrat</Button>
                </FormRow>
                
            </form>
        </div>
  )
}

export default UploadAvatar