const catchAsync = require("../middleware/errorHandler");
const Judge = require("../models/JudgeServerModel");

const createJudge = catchAsync(
    async (req, res, next)=>{
        const data = await Judge.create(req.body)
        res.json(data)
    }
)

const updateJudge = catchAsync(
    async (req, res, next)=>{
        const data = await Judge.findByIdAndUpdate( req.params.id, req.body, {new: true})
        res.json(data)
    }
)

const getJudge = catchAsync(
    async (req, res, next)=>{
        const data = await Judge.find({})
        res.json(data)
    }
)

module.exports = {createJudge, updateJudge, getJudge}