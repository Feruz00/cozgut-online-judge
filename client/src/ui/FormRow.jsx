import { Typography } from 'antd'
import React from 'react'

const FormRow = ({label, error, children, isEditor=false, small=false}) => {
  return (
    <div className={`grid items-center
        grid-cols-[9rem_2.1fr_0.4fr] gap-4 py-3 px-0 
        first:pt-0 
        last:pb-0 
        [&:not(:last-child)]:border-b
        [&:not(:last-child)]:mb-1
        

        [&:not(:last-child)]:border-gray-100 
        ${ !isEditor ? 
          '[&:has(button)]:flex [&:has(button)]:justify-end [&:has(button)]:gap-5':
          ' '
        }
        
        `}>
        {label && <label htmlFor={children?.props?.id} 
          className={`font-bolder flex justify-end text-right ${small && 'text-sm'} font-poppins`}>
            
            {label}:
            </label>}
        
        {/* <Typography.Text> */}
           {children}
        {/* </Typography.Text>         */}
        {error && <div className='flex flex-row gap-1 text-red-700 font-medium'>
          <Typography.Text>
            <span className='text-sm text-justify font-bolder text-red-700'>{error}</span> 
          </Typography.Text>
        </div>
      }
      </div>  
  )
}

export default FormRow