import React from 'react'
import FormRow from '../../ui/FormRow'
import { useForm , Controller} from 'react-hook-form'
import { getSections, useCreateSection, useCreateSubSection, useEditSection, useEditSubSection } from './useSection'
import Select from '../../ui/Select'
import Loading from '../../ui/Loading'
import { useSearchParams } from 'react-router-dom'
import { Button, Input } from 'antd'

const AddSection = ({sectionToEdit = {}, onCloseModal}) => {

  const {_id: editId, ...editValues } = sectionToEdit
  const isEditSession = Boolean(editId)
  
  const [searchParams] = useSearchParams()
  
  const isSub = searchParams.get('tab') === 'sub'


  const { isLoading, sections } = getSections()

  const {isCreatingSection, createSection} = useCreateSection()
  const {isEditingSection, editSection} = useEditSection()
  const {isCreatingSubSection, createSubSection} = useCreateSubSection()
  const {isSubEditingSection, editSubSection} = useEditSubSection()

  const {register, formState, reset , handleSubmit, control} = useForm({
    defaultValues: isEditSession ? editValues : {}
  })
  const {errors} = formState

  const onSubmit = (d)=>{
    if( isEditSession ){
      if(isSub){
        editSubSection(({id: editId, data: d}), {
          onSuccess: ()=>{
            reset()
            onCloseModal?.()
          }
        })  
      }
      else{

        editSection( ({id: editId, data: d}), {
          onSuccess: ()=>{
            reset()
            onCloseModal?.()
          }
        })
      }
    }
    else {
      if( isSub ){
        createSubSection(d, {
          onSuccess: ()=>{
            reset()
            onCloseModal?.()
          }
        })
      }
      else{
        createSection(d, {
          onSuccess: ()=>{
            reset()
            onCloseModal?.()
          }
        })
      }
      
    }
  }
  // console.log(errors)
  const onError = (err)=>{
    // console.log(err)
  }
  return (
    <div className='w-[50rem]'>
        <form className='w-full' onSubmit={handleSubmit(onSubmit, onError)} >
          {
            isSub && (
              isLoading ? <Loading />
              :
              <FormRow 
                label="Bölümi saýlaň"
              >
                <Select
                  register={register}
                  name="section"
                  validation={{
                    required: 'Esasy bölümçe zerur'
                  }}
                  disabled={isCreatingSubSection}
                  value={sections[0]._id}
                  options={sections.map( i=>({value: i._id, label: i.title}) )}
                />
                
              </FormRow>)
              
          }
          <FormRow 
            label="*Bölümiň ady"
            error={errors?.title?.message}
          >
            <Controller
              rules={{ required: 'Bölümçäniň adyny giriziň' }}
              name="title"
              control={control}
              render={({ field }) => <Input 
                {...field} 
                maxLength={60} 
                showCount 
                
              />}
          />
            
          </FormRow>
          
          <FormRow
            label="Gysgaça beýan"
          >
             <Controller
            name="description"
            control={control}
            render={({ field }) => <Input.TextArea rows={5} {...field} maxLength={500} showCount />}
           
            />
          </FormRow>

          <FormRow >
            <Button className='px-10 py-1' type='primary' htmlType='submit'
              disabled={isCreatingSection || isEditingSection || isCreatingSubSection || isSubEditingSection}
              loading={isCreatingSection || isEditingSection || isCreatingSubSection || isSubEditingSection}
              
              > 
              
              Ugrat
            </Button>
          </FormRow>

        </form>
    </div>
  )
}

export default AddSection