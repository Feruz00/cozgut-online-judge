import React from 'react'
import dayjs from 'dayjs';
import { Controller, useForm } from 'react-hook-form'
import FormRow from '../../ui/FormRow'
import { Button, DatePicker, Input, TimePicker, Typography , Radio} from 'antd'
import { useCreateContest, useUpdateContest } from '../../services/useContest';
import { useNavigate } from 'react-router-dom';

const CreateContest = ({editContest={}}) => {

    const {_id: contestID, ...editValue} = editContest
    const isEdit = Boolean(contestID)
    const {control, formState: {errors}, handleSubmit, getValues, reset} = useForm({
        defaultValues: {
            public: isEdit ? editValue.public : true,
            title:  isEdit ? editValue.title :'',
            duration: isEdit? dayjs(`${editValue.duration.hour}:${editValue.duration.minutes}`, "HH:mm") : dayjs('05:00', "HH:mm"),
            start_time: isEdit &&  dayjs(editValue.start_time)
        }
    })
    const {createContest, isCreateContest} = useCreateContest()
    const {updateContest, isUpdateContest} = useUpdateContest()
    const navigate = useNavigate()
    const onSubmit = (d)=>{
        if(isEdit){
            updateContest({
                public: d.public,
                title: d.title,
                duration: {
                    hour: dayjs(d.duration, "HH:mm").hour(),
                    minutes: dayjs(d.duration, "HH:mm").minute()
                },
                start_time: dayjs(d.start_time).toISOString(),
            }, {
                onSettled: ()=>{
                    reset()
                    navigate(-1, {replace: true})
                }
            })
        }
        else{
            createContest({
                public: d.public,
                title: d.title,
                duration: {
                    hour: dayjs(d.duration, "HH:mm").hour(),
                    minutes: dayjs(d.duration, "HH:mm").minute()
                },
                start_time: dayjs(d.start_time).toISOString(),
            },{
                onSettled: ()=>{
                    reset()
                    navigate(-1, {replace: true})
                }
            })
        }
        
    }
    const disabledDate = (current) => {
        var start = new Date();
        // start.setUTCHours(0,0,0,0);
        // return current && new Date( dayjs(current).toISOString() ) < new Date()
        return current && current < dayjs(start).startOf();
      };
    return (
        <div className='w-full flex flex-col mt-2'>
            <div className='shadow flex flex-col px-5 py-2 rounded bg-color-grey-0 gap-2'>
            <Typography.Text className='text-gray-800 font-medium text-base'> Bäsleşik döretmek üçin aşakdaky maglumatlary dolduryň! </Typography.Text>
        </div>
        
            <form onSubmit={handleSubmit(onSubmit)} className='mt-3 px-5 m-6'>
                <FormRow label="Bäsleşigiň ady" error={errors?.title?.message}>
                    <Controller 
                        name="title"
                        control={control}
                        rules={{
                            required: 'Bäsleşigiň adyny giriziň'
                        }}
                        render={({field})=> <Input {...field} maxLength={50} showCount />}
                    />
                </FormRow>
                <FormRow label="Başlamaly wagty" error={errors?.title?.message}>
                    <Controller 
                        name="start_time"
                        control={control}
                        rules={{
                            required: 'Bäsleşigiň başlamaly wagtyny giriziň'
                        }}
                        render={({field})=> <DatePicker 
                                                {...field} 
                                                showHour 
                                                showTime 
                                                disabledDate={disabledDate}
                                                format="YYYY-MM-DD HH:mm"
                                                showNow={false}
                                                placeholder='Başlamaly wagty saýlaň'
                                            />}
                    />
                </FormRow>
                <FormRow label="Dowamlylygy" error={errors?.duration?.message}>
                    <Controller 
                        name="duration"
                        control={control}
                        rules={{
                            required: 'Bäsleşigiň adyny giriziň'
                        }}
                        render={({field})=> <TimePicker {...field} format="HH:mm" placeholder='Wagty saýlaň' />}
                    />
                </FormRow>
                <FormRow label="Kimler gatnaşyp bilýär" error={errors?.public?.message} isEditor>
                    
                    <Controller
                        name="public"
                        control={control}
                        render={ ({field})=>(<Radio.Group 
                                buttonStyle="solid"
                                {...field} 
                                defaultValue={getValues().public}
                            >
                                <Radio.Button value={true}>Ähli</Radio.Button>
                                <Radio.Button value={false}>
                                    Diňe gatnaşyjylar
                                </Radio.Button>
                            </Radio.Group>
                        ) }
                    />
                    
                </FormRow>
                
                <FormRow>
                    <Button htmlType='submit' type='primary' className='px-10 my-2 mr-[9rem]' 
                        disabled={isCreateContest || isUpdateContest} 
                        loading={isCreateContest || isUpdateContest}    
                        >
                            Ugrat
                        </Button>
                </FormRow>
                
            </form>
        </div>
  )
}

export default CreateContest