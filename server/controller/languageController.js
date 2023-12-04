const catchAsync = require("../middleware/errorHandler")
const Language = require("../models/LanguagesModel")

const createLang = catchAsync( async (req, res, next)=>{
    // console.log(req.body)
    const data = await Language.create(req.body)
    res.status(200).json(data)
})

const editLang = catchAsync( async (req, res, next)=>{
    const data = await Language.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.json(data)
})

const deleteLang = catchAsync( async (req, res, next)=>{
    const data = await Language.findByIdAndDelete(req.body._id)
    res.json(data)
})

const getLangs = catchAsync( async (req, res, next)=>{
    let query = {}
    if(req.isAuthenticated()){
        if(req.user?.role !== 'admin') query = {status: true} 
    }
    const data = await Language.find(query)
    res.json(data)
})

module.exports = {
    createLang,
    editLang,
    deleteLang,
    getLangs
}