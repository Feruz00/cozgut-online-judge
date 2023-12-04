import React from 'react'
import FormRow from '../../ui/FormRow'
import Input from '../../ui/Input'
import Button from '../../ui/Button'
import Textarea from '../../ui/Textarea'
import { useForm } from 'react-hook-form'
import { getSections, useCreateSection, useCreateSubSection, useEditSection } from './useSection'
import Select from '../../ui/Select'
import Loading from '../../ui/Loading'
import { useSearchParams } from 'react-router-dom'

const AddSection = ({sectionToEdit = {}, tab, onCloseModal}) => {

  const {_id: editId, ...editValues } = sectionToEdit
  const isEditSession = Boolean(editId)
  
  const [searchParams] = useSearchParams()
  
  const isSub = searchParams.get('tab') === 'sub'


  const { isLoading, sections } = getSections()

  const {isCreatingSection, createSection} = useCreateSection()
  const {isEditingSection, editSection} = useEditSection()
  const {isCreatingSubSection, createSubSection} = useCreateSubSection()

  const {register, formState, reset , handleSubmit} = useForm({
    defaultValues: isEditSession ? editValues : {}
  })
  const {errors} = formState
  const onSubmit = (d)=>{
    if( isEditSession ){
      editSection( ({id: editId, data: d}), {
        onSuccess: ()=>{
          reset()
          onCloseModal?.()
        }
      })
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
       
            <Input 
              id="title" placeholder="Bölümçäniň ady" 
              disabled={isCreatingSection || isEditingSection || isCreatingSubSection}
              register={register}
              name="title"
              validation={{
                required: '"Bölümçäniň ady zerur"'
              }}
            />
          </FormRow>
          
          <FormRow
            label="Düşündiriş"
          >
            <Textarea id="description" placeholder="Beýanlary ýazyň"
            disabled={isCreatingSection || isEditingSection || isCreatingSubSection}
            register={register}
            name="description"
            />
          </FormRow>
          <FormRow >
            <Button primary disabled={isCreatingSection || isEditingSection || isCreatingSubSection}
              className="px-10 py-2 rounded-sm "> Ugrat</Button>
          </FormRow>
        </form>
    </div>
  )
}

export default AddSection