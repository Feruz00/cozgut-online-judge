
const FormRow = ({label, error, children}) => {
  return (
    <div className='flex flex-col gap-1 px-4
    '>
        {label && <label htmlFor={children.props.id} 
        className='font-meduim dark:text-white text-xl flex justify-start cursor-pointer'>{label}</label> }
        {children}
        {error && <span className='text-red-700 dark:text-red-500 text-normal'>*{error}</span>}
        {/* <Divider/> */}
    </div>
  )
}

export default FormRow