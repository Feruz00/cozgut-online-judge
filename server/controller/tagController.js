const catchAsync = require('../middleware/errorHandler')
const Tag = require('../models/TagModel')

const getTags = catchAsync( async( req,res,next )=>{
    // console.log(req.query)
    let sort = {}
    sort[req.query.sort] = req.query.direction
    const data = await Tag.find({}).sort(sort)
    // console.log(data)
    res.json(data)
})

const createTag = catchAsync( async( req,res,next )=>{
    const data = await Tag.create(req.body)
    res.json(data)
})

const deleteTag = catchAsync( async( req,res,next )=>{
    const data = await Tag.findByIdAndDelete(req.params.id)
    res.json(data)
})

const updateTag = catchAsync( async( req,res,next )=>{
    const data = await Tag.findByIdAndUpdate(req.params.id, req.body)
    res.json(data)
})

const getTag = catchAsync( async (req,res,next)=>{
    // console.log(req.query)
    const data = await Tag.find({ name: { $regex: req.query.q, $options: 'i'}})
    res.json(data)
} )


module.exports = {getTags, createTag, deleteTag, updateTag, getTag}