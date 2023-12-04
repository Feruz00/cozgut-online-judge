import {HiChevronLeft, HiChevronRight} from 'react-icons/hi2'
import { useSearchParams } from "react-router-dom";
const PAGE_SIZE = 15
const StyledPagination = ({children})=>{
    return <div className="w-full flex items-center justify-between mt-5 shadow-md py-2 px-5 mb-5 bg-color-grey-100">
        {children}
    </div>
}


const P = ({children})=>{
    return <p className=" font-medium text-base ml-7">
        {children}
    </p>
} 
const Span = ({children})=>{
    return  <span className="font-semibold">
        {children}
    </span>
}

const Buttons = ({children})=>{
    return <div className="flex gap-3">
        {children}
    </div>
} 

const PaginationButton = ({children, active, onClick, disabled})=>{
    return <button
        className={` ${active ? 'bg-indigo-600 text-indigo-50 ': 'bg-color-grey-50 text-inherit'} 
            border-none rounded-sm font-medium text-base flex items-center justify-center gap-2 px-5 py-1
            transition-all duration-300
            [&:hover:not(:disabled)]:bg-indigo-600 [&:hover:not(:disabled)]:text-indigo-50 
            [&:has(span:last-child)]:pl-2
            [&:has(span:first-child)]:pr-2
            
        `}
        onClick={onClick}
        disabled={disabled}
    >
        {children}
    </button>
}



const Pagination = ({count})=>{
  const [searchParams, setSearchParams] = useSearchParams()
  const currentPage = !searchParams.get('page') ? 1 : Number(searchParams.get('page'))
  const pageCount = Math.ceil(count / PAGE_SIZE)
  // console.log(pageCount, count)
  const nextPage = ()=>{
    const next = currentPage === pageCount ? currentPage :currentPage +1 
    searchParams.set('page', next)
    setSearchParams(searchParams)
    window.scrollTo({top: 0, left: 0, behavior:'smooth'})
  }
  
  const prevPage = ()=>{
    const prev = currentPage === 1 ? 1: currentPage - 1
    searchParams.set('page', prev)
    setSearchParams(searchParams)
    
    window.scrollTo({top: 0, left: 0, behavior:'smooth'})
  }

  if(pageCount <=1 ) return null

  // console.log(currentPage, pageCount)

  return <StyledPagination>
    <P> Jemi <span>{count}</span> sanysyndan <span>{1+PAGE_SIZE*(currentPage-1)}</span>-den <span>
      { currentPage === pageCount ? count : PAGE_SIZE*currentPage}</span> aralykdakylary  görkezilýär.</P>
    <Buttons>
      <PaginationButton onClick={prevPage} disabled={ currentPage === 1 }>
        <HiChevronLeft className="text-lg"/> <Span>Yzdaky</Span>
      </PaginationButton>
      <PaginationButton onClick={nextPage}  disabled={ currentPage === pageCount }>
        <Span>Indiki</Span>
        <HiChevronRight className="text-lg"/> 
      </PaginationButton>
      
    </Buttons>
  </StyledPagination>
}

export default Pagination