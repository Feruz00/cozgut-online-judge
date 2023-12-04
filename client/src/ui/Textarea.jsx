import React from 'react'

const Textarea = ({ register, name, validation={}, ...rest}) => {
  return (
    <textarea 
        {...rest}
        {
          ...register(name, validation)
      }
        className='px-[0.8rem] py-[1.2rem]
            border border-color-grey-300
            rounded-[5px]
            bg-color-grey-0
            dark:bg-transparent
        
            shadow-sm
            w-full
            h-32

            outline-offset-[-1px]
            outline-2
            outline-indigo-600
            dark:outline-1 dark:outline-white dark:outline-offset-[-0.1px]
            dark:text-white
        '
    />
  )
}

export default Textarea