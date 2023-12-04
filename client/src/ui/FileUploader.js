import { Button } from 'antd'
import React, { useRef } from 'react'
import { useImperativeHandle } from 'react';
import { AiOutlineUpload } from 'react-icons/ai'

const FileUploader = ({ id, accepted, register, validation={}, name , multiple=false, disabled=false, watch}) => {
  const inputRef = useRef(null);
  const {ref, ...rest} = register(name, validation)
  const handleClick = () => {
    if(inputRef.current) inputRef.current.click();
  };
  
  useImperativeHandle( ref , ()=>inputRef.current )
  
  return (
    <div className='flex flex-row gap-3 items-center'>
      <input 
        ref={inputRef}
        className='hidden' 
        type="file" 
        multiple={multiple}
        accept={accepted}
        id={id}
        {...rest}
      />
      <Button icon={<AiOutlineUpload />} onClick={handleClick} disabled={disabled} >Faýly saýla</Button>
      <p className='text-sm text-color-grey-600'> {watch && watch(name) && watch(name)?.length  + " faýl saýlandy "} </p>
    </div>
  )
}

export default FileUploader