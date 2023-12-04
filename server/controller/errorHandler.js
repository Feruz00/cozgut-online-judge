

const globalErrorHandler = async (err, req,  res, next)=>{
    console.log("err boldy:" , err)
    if(err.name === 'ValidationError'){
        const {errors} = err
        const keys = Object.keys(errors)
        const ans = keys.map( i=> ({ field: i, message: errors[i].message }) )
        return res.status(400).json(ans)
    }
    // console.log(err.code)
    if(err.code === 11000){
        // console.log(err.message)
        return res.status(400).json({message: 'Bu at öň ulanylan'})
    }
    // if(err.)
    // if()
    // console.log(err)
    res.status(404).json(err)
}

module.exports=globalErrorHandler