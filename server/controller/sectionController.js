const catchAsync = require('../middleware/errorHandler')
const Problem = require('../models/ProblemModel')
// const Problem = require('../models/ProblemModel')
const {Section, SubSection} = require('../models/SectionModel')
const mongoose = require('mongoose')
const Submission = require('../models/SubmissionModel')
// doretmek

const createSection = catchAsync( async (req, res, next)=>{
    // console.log(req.body)
    const data = await Section.create(req.body)
    res.json(data)
})

const createSubSection = catchAsync(  async (req, res, next)=>{

    const data = await SubSection.create(req.body)
    res.json(data)
})

// almak
const getAllSections = catchAsync( async (req, res, next)=>{
    const data = await Section.find({})
    res.json(data)
})

const getSubSections = catchAsync( async (req, res, next)=>{
    // console.log(req.params.id)
    const data = await SubSection.find({section: req.params.id}).populate('section')
    // console.log(data)
    res.json(data)
})

const deleteSection = catchAsync( async (req, res, next)=>{
    await Section.findByIdAndDelete(req.params.id) 
    const data = await SubSection.deleteMany( { section: req.params.id } )
    // console.log(data)
    res.json(data)
} )

const updateSection = catchAsync( async (req, res, next)=>{
    const data = await Section.findByIdAndUpdate( req.params.id, req.body )
    res.json()
} )

const updateSubSection = catchAsync( async (req, res, next)=>{
    // console.log(req.body)
    const data = await SubSection.findByIdAndUpdate( req.params.id, req.body )
    res.json(data)
} )

const getData = catchAsync( async (req,res,next)=>{
    const {tab = "main", page=1, sort, direction, section} = req.query
    let Model = Section
    if(tab === 'sub') Model = SubSection
    
    let query = {}
    const sortOption = {}
    sortOption[sort]=direction*1

    if(section){
        query["$or"] = section.split(',').map( i=>({section:new mongoose.Types.ObjectId(i)}) )
    }
    // console.log(query)
    const [{ data: paginatedResult, count: totalCount }] = await Model.aggregate([
        {
            $facet: {
                data:[
                    {$match: query},
                    {$sort: sortOption},
                    {$skip: (page - 1)*15},
                    {$limit: Number(15)},
                            
                    {$lookup:{
                        from: 'sections',
                        localField: 'section',
                        foreignField: '_id',
                        as: 'section'
                    }},
                    {
                        $addFields:{
                            "section": {
                                "$arrayElemAt": ["$section",0],
                            }
                        }
                    },
                ],
                count: [
                    {$match: query},
                    {$count: 'count'}
                ]
            }
        }
        
    ])
    const parent = await Section.find({})
        
    res.json({data: paginatedResult, count: totalCount[0].count, parent })
} )

const deleteSubSection = catchAsync( async (req, res, next)=>{
    const data = await SubSection.findByIdAndDelete(  req.params.id )
    res.json(data)
} )

const getTree = catchAsync ( async (req,res,next)=>{
    const parent = await Section.find({})
    const children = await SubSection.find({})
    
    res.json({parent, children})
})

const getSubSection = catchAsync ( async (req,res,next)=>{
    // console.log(req.params.id)
    const data = await SubSection.findById(req.params.id)
    
    res.json(data)
})

const getProblemsBySubsection = catchAsync(
    async (req, res, next)=>{
        const subsection = await SubSection.findById(req.params.id)
        let problems = await Problem.find({subsection: req.params.id}).populate('subsection')

        if( req.isAuthenticated() ){
            const qu = {}
            const orr = problems.map(i=>({ problem: i._id }))
            if( orr.length > 0 ) qu["$or"] = orr
            const submissions = await Submission.find({user: req.user._id, ...qu  })
            
            // console.log(submissions)
            const dd = problems.map( i=> {
                const submit = submissions.filter(j=> j.problem.toString() === i._id.toString()) 
                const success = submit.filter(j=> j.accepted)
                
                let ans = {}

                if(submit.length > 0){
                    ans['isSend'] = true
                    ans['isSuccess'] = success.length > 0
                }
                else{
                    ans['isSend'] = false;
                }

                // return Object.assign(i, ans) 
                return ({...i._doc, ...ans})
            })
            
            problems = dd;
        }

        res.json({problems, subsection})
    }
)

module.exports = {createSection, createSubSection, getAllSections, getSubSections, deleteSection, 
    updateSection,
    getData,
    updateSubSection,
    deleteSubSection,
    getTree,
    getProblemsBySubsection,
    getSubSection
}