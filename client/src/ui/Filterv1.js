import { useSearchParams } from "react-router-dom";

const StyledFilter = ({children})=>{
    return <div className="border border-color-grey-0 bg-color-grey-0 rounded-sm p-2 flex gap-2">
        {children}
    </div>
}

const FilterButton = ({active , children, disabled, onClick})=>{
    
    return <button
    
        className={`bg-color-grey-400 border-none  text-sm py-1 px-2 rounded-sm transition-all duration-300
            hover:bg-indigo-600 text-color-grey-0
            ${active ? 'bg-indigo-600 text-indigo-50':''}
            disabled:bg-indigo-600 disabled:text-white
        `}
        disabled={disabled}
        onClick={onClick}
    >
        {children}
    </button>
}

function Filter({filterField, options}){
  const [searchParams, setSearchParams] = useSearchParams()
  const currentFilter = searchParams.get(filterField) || options.at(0).value


  const handleClick = (url)=>{
    searchParams.set( filterField, url )
    if(searchParams.get('page')) {
      searchParams.set('page',1) 
    }
    if(searchParams.get('sortField')) searchParams.delete('sortField')
    if(searchParams.get('direction'))searchParams.delete('direction')
  
    setSearchParams(searchParams)

  }

  return <StyledFilter>
    {
      options.map( option=> (
      <FilterButton
        key={option.value}
        active={currentFilter === option.value}
        disabled={currentFilter === option.value}
        onClick={()=>handleClick(option.value)}>{option.label}</FilterButton>
      ))
    }
    
  </StyledFilter>
}

export default Filter