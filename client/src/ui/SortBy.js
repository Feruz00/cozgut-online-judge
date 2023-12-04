import React from 'react'
import { useState } from 'react'
import { RxCaretSort, RxChevronDown, RxChevronUp } from 'react-icons/rx'
import { useSearchParams } from 'react-router-dom'

const Box = ({children, onClick})=>{
    return <div className='border-r gap-2 select-none border-r-color-grey-300 cursor-pointer flex flex-row items-center'
        onClick={onClick}
    >
        {children}
    </div>
}
const SortBy = ({field, children}) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [toggle, setToggle] = useState(false)
    
    const show = searchParams.get('sortField') === field

    const handleClick = ()=>{

        const direction = searchParams.get('direction') === 'asc' ? 'desc': 'asc'

        
        if(searchParams.get('sortField') === field) searchParams.set("direction", direction)
        else searchParams.set('direction','asc');
    
        searchParams.set("sortField", field)
    
        setSearchParams(searchParams)
        setToggle(searchParams.get('direction') === 'asc')
    }
  return (
    <Box onClick={handleClick}>
        {children}
        {
            show ? (
                !toggle 
                ? <RxChevronUp className='text-gray-400 text-lg' /> 
                : <RxChevronDown className='text-gray-400 text-lg' />
            ): <RxCaretSort className='text-gray-400 text-lg'/>
        }
    </Box>
  )
}

export default SortBy