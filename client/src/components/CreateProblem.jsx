import {  Button, Input, InputNumber, Radio } from 'antd'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import FormRow from '../ui/FormRow'
import FileUploader from '../ui/FileUploader'
import Tags from './Tags'
import Editor from './SunEditor'
import { useCreateProblem, useEditProblem } from '../features/problems/useProblems'
import { useNavigate } from 'react-router-dom'
// import { useGetLanguages } from '../features/settings/useLanguages'


const CreateProblem = ({editProblem = {}, subsection={}, createContest=false, editContest = false, 
    contest={}
}) => {
    const {_id: editId, ...editValues} = editProblem
    
    const isEditProblem = Boolean(editId)
    const isSubSection = Boolean(subsection?._id)
    
    const navigate = useNavigate()
    const {isCreatingProblem, createProblem} = useCreateProblem()
    const {isEditingProblem, editProblem: editProblemFn} = useEditProblem()
    const {control, reset, setValue, watch, register, formState: {errors} , handleSubmit, getValues} = useForm({
        defaultValues: isEditProblem ? editValues: {
            tags: [],
            withTestFile: false,
            config_type: true,
            decrease: false,
            descore: 0,
            minut: 0
        }
    })
    const onSubmit = (d)=>{
        var formData = new FormData();

        const {
            config: { length: configLength}, 
            input: { length: inputLength }, 
            output: { length: outputLength }, 
            inputExample: { length: inputExampleLength }, 
            outputExample: { length: outputExampleLength }, 
            tags,
            ...r} = d

        // console.log(r)
        Object.keys(r).forEach( i=> { if(r[i]) formData.append( i, r[i] )} )
        Array.from({length: configLength} , (_,i)=>i+1)
        .forEach(i=>{formData.append( 'config',d.config.item(i-1) );})
        Array.from({length: inputLength} , (_,i)=>i+1).forEach(i=>{formData.append( 'input',d.input.item(i-1) );})
        Array.from({length: outputLength} , (_,i)=>i+1).forEach(i=>{formData.append( 'output',d.output.item(i-1) );})
        Array.from({length: inputExampleLength} , (_,i)=>i+1).forEach(i=>{formData.append( 'inputExample',d.inputExample.item(i-1) );})
        Array.from({length: outputExampleLength} , (_,i)=>i+1).forEach(i=>{formData.append( 'outputExample',d.outputExample.item(i-1) );})
        
        tags.forEach( tag=> formData.append( 'tags',tag._id ) )
        
        
        if(isSubSection) formData.append('subsection', subsection._id)
        if(!editContest) formData.append('contest', contest._id)
        
        if(isEditProblem){
            console.log(formData.values('contest'))
            editProblemFn({id: editId, d: formData},{
            onSuccess:()=>{
                reset()
                navigate(-1, {replace: true})
            }
           })
        }
        else{
            
            createProblem( formData, {
                onSuccess:()=>{
                    reset()
                    navigate(-1, {replace: true})
                }
            })
        
        }
    }
  return (
    <div className='w-full flex flex-col mt-1'>
        <div className='shadow flex flex-col px-5 py-2 rounded bg-color-grey-0 gap-2'>
            <p className='text-gray-800 font-normal'> Meseläni {isEditProblem ? 'üýtgetmek ': 'döretmek '} üçin aşakdaky maglumatlary dolduryň! </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className='mt-3 px-5 m-6'>
           
            <FormRow label="Meseläniň ady" error={errors?.title?.message}>
                <Controller
                    name="title"
                    rules={{ required: 'Meseläniň adyny giriziň' }}
                    control={control}
                    render={({ field }) => <Input {...field} />}
                />
            </FormRow>
           
            <FormRow label="Wagt(s)" error={errors?.time?.message}>
                <Controller
                    name="time"
                    control={control}
                    rules={{ required: 'Wagty giriziň' }}                    
                    render={({ field }) => <InputNumber {...field} />}
                />
            </FormRow>

            <FormRow label="Möçberi(mb)" error={errors?.memory?.message}> 
                <Controller
                    name="memory"
                    
                    rules={{ required: 'Möçberi giriziň' }}    
                    control={control}
                    render={({ field }) => <InputNumber {...field} />}
                />
            </FormRow>

            <FormRow label="Meseläniň şerti" isEditor={true} error={errors?.desciption?.message}>
                <Controller 
                    name='description'
                    control={control}
                    rules={{
                        required:'Meseläniş şerti zerur',
                        validate: val=>{
                            const contentTestContainer = document.createElement('div');
                            contentTestContainer.innerHTML = val;
                            const textContent = contentTestContainer.textContent;
                            
                            return textContent.length > 0 || 'Meseläniş şerti zerur'
                            // console.log(textContent)
                        }
                    }}
                    render={ ({ field: {value, onChange} })=>(
                        <Editor value={value} onChange={onChange}  />
                    ) }
                />
            </FormRow>
            <FormRow label="Girişiň düzgüni" isEditor={true} error={errors?.desciption?.message}>
                <Controller 
                    name='input_config'
                    control={control}
                    rules={{
                        required:'Girişiň düzgüni zerur',
                        validate: val=>{
                            const contentTestContainer = document.createElement('div');
                            contentTestContainer.innerHTML = val;
                            const textContent = contentTestContainer.textContent;
                            
                            return textContent.length > 0 || 'Girişiň düzgüni zerur'
                            // console.log(textContent)
                        }
                    }}
                    render={ ({ field: {value, onChange} })=>(
                        <Editor value={value} onChange={onChange}  />
                    ) }
                />
            </FormRow>
            <FormRow label="Çykyşyň düzgüni" isEditor={true} error={errors?.desciption?.message}>
                <Controller 
                    name='output_config'
                    control={control}
                    rules={{
                        required:'Çykyşyň düzgüni zerur',
                        validate: val=>{
                            const contentTestContainer = document.createElement('div');
                            contentTestContainer.innerHTML = val;
                            const textContent = contentTestContainer.textContent;
                            
                            return textContent.length > 0 || 'Çykyşyň düzgüni zerur'
                            // console.log(textContent)
                        }
                    }}
                    render={ ({ field: {value, onChange} })=>(
                        <Editor value={value} onChange={onChange}  />
                    ) }
                />
            </FormRow>
            <FormRow label="Nusga giriş testler" isEditor error={errors?.inputExample?.message}> 
                <FileUploader
                    name="inputExample"
                    register={register}
                    validation={{
                        required: 'Nusga giriş testleri gerek'
                    }}
                    accepted='.txt'
                    id="inputExample"
                    watch={watch}
                />
            </FormRow>
            <FormRow label="Nusga çykyş testler" isEditor error={errors?.outputExample?.message}> 
                <FileUploader
                    name="outputExample"
                    register={register}
                    validation={{
                        required: 'Nusga çykyş testleri gerek'
                    }}
                    accepted='.txt'
                    id="outputExample"
                    watch={watch}
                />
            </FormRow>
            <FormRow label="Goşmaça bellik" isEditor={true}>
                <Controller 
                    name='extraDescription'
                    control={control}
                    render={ ({ field: {value, onChange} })=>(
                        <Editor value={value} onChange={onChange}  />
                    ) }
                />
            </FormRow>
            <FormRow label="Giriş düzgüni" isEditor error={errors?.withTestFile?.message}> 
                <Controller 
                    name="withTestFile"
                    control={control}
                    render={ ({field})=>(
                        <Radio.Group 
                        buttonStyle="solid"
                        disabled={isCreatingProblem}
                        defaultValue={watch("withTestFile")}
                        {...field} 
                        >
                            <Radio.Button value={true}>Faýl arkaly</Radio.Button>
                            <Radio.Button value={false}>
                                Standart
                            </Radio.Button>
                        </Radio.Group>
                    ) }
                /> 
            </FormRow>           
            <FormRow label="Giriş faýlynyň ady" error={errors?.testFileInput?.message}>
                <Controller
                    name="testFileInput"
                    control={control}
                    rules={{ 
                        validate: (value)=> !getValues().withTestFile || 
                            (getValues().withTestFile === true  && value?.length > 0 ) || 'Giriş faýlyny giriziň'
                    }}
                    render={({ field }) => <Input {...field} disabled={!watch("withTestFile")} />}
                />
            </FormRow>
            <FormRow label="Çykyş faýlynyň ady" error={errors?.testFileOutput?.message}>
                <Controller
                    name="testFileOutput"
                    rules={{ 
                        validate: (value)=> !getValues().withTestFile || 
                            (getValues().withTestFile === true  && value?.length > 0 ) || 'Çykyş faýlyny giriziň'
                    }}
                    control={control}
                    render={({ field }) => <Input  {...field} disabled={!watch("withTestFile") || isCreatingProblem} />}
                />
            </FormRow>
            
            <FormRow label="Barlag görnüşi" isEditor error={errors?.type?.message}>
                <Controller 
                    name="type"
                    rules={{ required: 'Barlag görnüşini giriziň' }}   
                    control={control}
                    render={ ({field})=>(
                        <Radio.Group {...field} 
                            buttonStyle="solid"
                            defaultValue={watch('type')}
                            disabled={isCreatingProblem}
                        >
                            <Radio.Button value="custom">Standart</Radio.Button>
                            <Radio.Button value="subtest">
                                Bölek teset
                            </Radio.Button>
                        </Radio.Group>
                    ) }
                /> 
            </FormRow>
            {
                (createContest || editContest) && (
                    watch('type') === 'custom' ?
                    <>
                        <FormRow label="Dogry çözüwdäki bal" error={errors?.score?.message}>
                            <Controller 
                                control={control}
                                name="score"
                                rules={{
                                    required: 'Baly giriziň'
                                }}
                                render={ ({field})=> <InputNumber {...field} />}
                            />
                        </FormRow>
                        <FormRow label="Bal azalmalymy" isEditor error={errors?.decrease?.message}>
                            <Controller 
                                name="decrease"
                                control={control}
                                render={ ({field})=>(
                                    <Radio.Group {...field} 
                                        buttonStyle="solid"
                                        defaultValue={watch('decrease') }
                                        disabled={isCreatingProblem}
                                    >
                                        <Radio.Button value={true}>Hawa</Radio.Button>
                                        <Radio.Button value={false}>
                                            Ýok
                                        </Radio.Button>
                                    </Radio.Group>
                                ) }
                            /> 
                        </FormRow>
                        <FormRow label="Her näçe minutda" error={errors?.minut?.message}>
                            <Controller 
                                control={control}
                                name="minut"
                                rules={{
                                    required: !watch('decrease') || 'Minudy giriziň'
                                }}
                                render={ ({field})=> <InputNumber {...field} disabled={!watch('decrease')} />}
                            />
                        </FormRow>
                        <FormRow label="Näçe bal azalmaly" error={errors?.descore?.message}>
                            <Controller 
                                control={control}
                                name="descore"
                                rules={{
                                    required: !watch('decrease') ||  'Baly giriziň'
                                }}
                                render={ ({field})=> <InputNumber {...field} disabled={!watch('decrease')} />}
                            />
                        </FormRow>
                        
                    </>
                    :
                    <>
                        <FormRow label="Bölek testler üçin ballar" error={errors?.score?.message}>
                            <Controller 
                                control={control}
                                name="score"
                                rules={{
                                    required: 'Ballary giriziň'
                                }}
                                render={ ({field})=> <Input {...field} />}
                            />
                        </FormRow>
                        
                    </>
                )
            }
            <FormRow label="Giriş testler" isEditor error={errors?.input?.message}> 
                <FileUploader
                    name="input"
                    register={register}
                    multiple={watch('type') === 'subtest'}
                    validation={{
                        required: 'Giriş testleri gerek'
                    }}
                    accepted='.txt'
                    id="input"
                    disabled={!watch('type')}
                    watch={watch}
                />
            </FormRow>
            <FormRow label="Çykyş testler" isEditor error={errors?.output?.message}> 
                <FileUploader
                    name="output"
                    register={register}
                    multiple={watch('type') === 'subtest'}
                    validation={{
                        required: 'Çykyş testleri gerek',
                        validate: (val)=>
                            (val?.length === getValues()?.input?.length) || 'Faýllaryň sany deň däl!'
                       
                    }}
                    accepted='.txt'
                    id="output"
                    disabled={!watch('type')}
                    watch={watch}
                />
            </FormRow>
            <FormRow label="Ähli testler üçin düzgün meňzeşmi" isEditor >
                <div className='w-40'>
                    <Controller
                        name="config_type"
                        control={control}
                        render={ ({field})=>(
                            <Radio.Group 
                            disabled={isCreatingProblem}
                            buttonStyle="solid"
                            defaultValue={watch("config_type")}
                            {...field} 
                            >
                                <Radio.Button value={true}>Hawa</Radio.Button>
                                <Radio.Button value={false}>
                                    Ýok
                                </Radio.Button>
                            </Radio.Group>
                        ) }
                    />
                </div>
            </FormRow>
            <FormRow label="Jogap düzgüni" isEditor error={errors?.config?.message}> 
                <FileUploader
                    name="config"
                    register={register}
                    multiple={watch('type') === 'subtest' && watch('config_type')}
                    validation={{
                        validate: (val)=> val?.length === getValues()?.input?.length || getValues()?.config_type || 'Faýllaryň sany deň däl!' 
                    }}
                    accepted='.txt'
                    id="config"
                    // disabled={!watch('type')}
                    watch={watch}
                />
            </FormRow>
            <FormRow label="Kynlyk derejesi" error={errors?.memory?.message}> 
                <Controller
                    name="level"
                    
                    rules={{ required: 'Derejesini giriziň' }}    
                    control={control}
                    render={({ field }) => <InputNumber id="level" {...field}  disabled={isCreatingProblem} />}
                />
            </FormRow>
            
            <FormRow label="Tegler" isEditor>
                <Tags 
                    name="tags"
                    watch={watch}
                    setValue={setValue}
                />
            </FormRow>
            {/* {
                !isEditProblem && (
                    <>
                        <FormRow label="Barlag çözüwi saýlaň" error={errors?.lang?.message} >
                            <div className='w-40'>
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
                            </div>
                        </FormRow>
                        <FormRow label="Çözüwi saýlaň" isEditor error={errors?.solution?.message}> 
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
                        </FormRow>
                    </>
                )
            } */}
            <FormRow>
                <Button htmlType='submit' type='primary' className='px-10 my-2' disabled={isCreatingProblem || isEditingProblem} loading={isCreatingProblem || isEditingProblem}>
                    Ugrat
                </Button>
            </FormRow>
        </form>
    </div>
  )
}

export default CreateProblem