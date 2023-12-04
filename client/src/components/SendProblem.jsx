import React from 'react'
import { RxInfoCircled } from 'react-icons/rx'
import {Pie, PieChart, ResponsiveContainer} from 'recharts'
import { useForm, Controller } from 'react-hook-form'
import { Button, Select } from 'antd'
import { useGetLanguages } from '../features/settings/useLanguages'
import FileUploader from '../ui/FileUploader'
import { useCurrentUser } from '../features/auth/useAuth'
import { useSubmitProblem } from '../services/useSubmissions'
import { useNavigate } from 'react-router-dom'
const SendProblem = ({problem}) => {
    const {languages, isLoadingLanguages} = useGetLanguages()
    const data = []
    const navigate = useNavigate()
    const {watch, formState: {errors}, control, handleSubmit, register} = useForm()
    const {submit, isLoading: isSubmitProblem} = useSubmitProblem()
    const {isLoading, isAuthenticated} = useCurrentUser()
    const onSubmit = (d)=>{
        const formData = new FormData()
        formData.append('lang', d.lang)
        formData.append('solution', d.solution.item(0))
        formData.append('problem', problem)
        submit(formData, {
            onSuccess: (data)=>{
                console.log(data)
                navigate('/submissions')
            }
        })
    }

    return (
    <div className='flex flex-col gap-4 shadow px-2 mr-1 mt-4 py-1'>
        <div className='bg-white rounded px-2 py-1'>
            <p className='flex justify-center items-center gap-1'>
                <RxInfoCircled />
                 Maglumat: </p>
            <ResponsiveContainer width="100%" height="10rem">
                <PieChart>
                    <Pie data={data}>

                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>
        {
            !isLoading &&  isAuthenticated && (
                 <div className='bg-white rounded px-2 py-1'>
            <p className='text-align text-base font-medium'>Mysaly ugrat</p>
            <form onSubmit={handleSubmit(onSubmit)} className='mt-2 flex gap-1 flex-col'>
                <p className='text-sm'> Programmirleme dili saýlaň: </p>
                <Controller 
                    name="lang"
                    control={control}
                    rules={{
                        required: 'Barlag dili saýlaň'
                    }}
                    render={ ({field})=> (
                        <Select 
                            className='w-full'
                            {...field}
                            options={languages?.map( i=>({label: i.title, value: i._id}) )}
                        />
                    ) }
                />
                {errors?.lang?.message && <p className='text-xs font-medium text-red-700'>  {errors?.lang?.message} </p>}
                <p className='text-sm mt-1'> Faýly saýlaň: </p>
                
                <FileUploader
                    name="solution"
                    register={register}
                    validation={{
                        validate: (val)=>
                            val?.length > 0 || 'Çözüw faýly gerek!'
                    }}
                    accepted={ `.${languages?.filter( i=> i._id === watch("lang") )[0]?.extension}` }
                    id="solution"
                    disabled={isLoadingLanguages}
                    watch={watch}
                />
                {errors?.solution?.message && <p className='text-xs font-medium text-red-700'>  {errors?.solution?.message} </p>}
                
                <Button type='primary' className='mt-3' htmlType='submit' disabled={isSubmitProblem} loading={isSubmitProblem} >Ugrat</Button>
            </form>
            
        </div>
            )
        }
       
    </div>
  )
}

export default SendProblem