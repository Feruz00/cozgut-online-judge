

const Input = ({ register, name, validation={}, ...rest})=>{
    return <input {...rest} className="border border-gray-300 rounded-sm bg-color-grey-0 px-3 py-1 shadow-sm
        outline-indigo-600 outline-offset-1 text-gray-700 text-md
        disabled:cursor-not-allowed disabled:bg-gray-200
        focus:outline-2 focus:outline-indigo-600
        focus:outline-offset-[-1px]
    " {
        ...register(name, validation)
    }
    />
}

export default Input