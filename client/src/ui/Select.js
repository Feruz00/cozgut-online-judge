
const StyledSelect = ({children, value,  disabled, register, validation, name, ...props})=>{
    return <select
        disabled={disabled}
        
        {...props}
        {...register(name, validation)}
        className={` text-base px-5 py-1
            bg-color-grey-0 font-medium shadow
            truncate
            w-full
            text-gray-700
            border-indigo-400
            outline-none
            border rounded
            focus:outline-2 focus:outline-indigo-600
            focus:outline-offset-[-1px]
            disabled:cursor-not-allowed disabled:bg-gray-200
            `}
    >
        {children}
    </select>
}

const Select = ({options,  register, disabled, validation={}, name, ...props})=>{
  return (
    <StyledSelect {...props} register={register} name={name} validation={validation} disabled={disabled} >
      {options.map(option=><option value={option.value} className="w-full truncate"  
      key={option.value}>{option.label}</option>)}
    </StyledSelect>
  )
}
export default Select