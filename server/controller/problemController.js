const catchAsync = require('../middleware/errorHandler')
const Problem = require('../models/ProblemModel')
const Language = require('../models/LanguagesModel')
const Test = require('../models/TestModel')
const { default: axios } = require('axios')
const { Section, SubSection } = require('../models/SectionModel')
const mongoose = require('mongoose')
const Submission = require('../models/SubmissionModel')

const convertFile = (file) => file.map( i=> i.buffer.toString().split('\r\n') )
        .map( (current) =>{
            let v = [], ans = [];
            current.forEach( i=>{
                if(i === '---'){
                    if( v.length > 0 )
                        ans.push(v.join('\n'))   
                    v = []
                }
                else{
                    v.push(i)
                }
            } )
            return ans
        })

const createProblem =  catchAsync( 
    async (req, res, next)=>{
        const {time, memory, type, config_type, score = "", ...other} = req.body
        const input = convertFile( req.files.input)
        let config;
        let ballar = (score+" ")?.length ? score.split(' ').filter(i=>i.length > 0).map(i=> i*1) :[]
     
        if(config_type === 'true'){
            config = req.files.config[0].buffer.toString().split(' ').filter(i=>i.length>0).map(i=>i==='true')
        }
        else{
            config = req.files.config[0].buffer.toString().split('\r\n').reduce( (current, i) =>{
                if(i!=='---'){
                    current.push(i.split(' ').filter(j=>j.length >0).map( j=> j === 'true'))
                } 
                return current
            } , [])
        }
        const output = req.files.output.map( i=> i.buffer.toString().split('\r\n') )
        .map( (current, index) =>{
            let v = [], ans = [];
            current.forEach( i=>{
                if(i === '---'){
                    if( v.length > 0 ){
                        let q = []
                        for (let z = 0; z < v.length; z++) {
                            const el = v[z];
                            const cl = config_type === 'true' ? config[z] : config[index][z]
                            if( cl ){
                                q.push(el)
                            }
                            else{
                                q.push( el.split(' ').filter(p=>p.length > 0) )
                            }
                        }
                        ans.push(q)   
                    }
                    v = []
                }
                else{
                    v.push(i)
                }
            } )
            return ans
        })
        const inputExample = convertFile( req.files.inputExample )[0]
        const outputExample = convertFile( req.files.outputExample )[0]
        const problem = await Problem.create({
            time, memory, type,  
            inputExample,
            outputExample,
            score: ballar,
            ...other
        })

        let configTests = [];
        for (let i = 0; i < input.length; i++) {
            for( let j=0; j < input[i].length; j++ ){
                configTests.push( { 
                    problem: problem._id,
                    config_type,
                    config: config_type ? config: config[i] ,
                    input: input[i][j],
                    output: output[i][j],
                    subTestNumber: i+1    
                } )
            }
        }
        await Test.create( configTests ) 
        res.json({success: true})
    //     let preTest = [];
    //     for (let i = 0; i < pre_test.length; i++) {
    //         for( let j=0; j < pre_output[i].length; j++ ){
    //             preTest.push( { 
    //                 problem: problem._id,
    //                 input: pre_test[i][j],
    //                 output: pre_output[i][j],
    //                 preTest: true 
    //             } )
    //         }
    //     }

       
    //     // if( preTest.length ) await Test.create( preTest )
    // res.json({
    //     problem,
    //     compiling: result.data,
    //     tests,
    //     preTest
    // })
    
})

const editProblem = catchAsync(
    async (req,res,next)=>{
        const editId = req.params.id
        const {time, memory, type, config_type, score = "", contest={}, subsection={}, ...other} = req.body
        // console.log(other)
        // console.log(req.files)
        // console.log("geldim")
        const input = convertFile( req.files.input)
        // console.log(input)
        let config;
        let ballar = (score+" ")?.length ? score.split(' ').filter(i=>i.length > 0).map(i=> i*1) :[]
     
        if(config_type === 'true'){
            config = req.files.config[0].buffer.toString().split(' ').filter(i=>i.length>0).map(i=>i==='true')
        }
        else{
            config = req.files.config[0].buffer.toString().split('\r\n').reduce( (current, i) =>{
                if(i!=='---'){
                    current.push(i.split(' ').filter(j=>j.length >0).map( j=> j === 'true'))
                } 
                return current
            } , [])
        }
        const output = req.files.output.map( i=> i.buffer.toString().split('\r\n') )
        .map( (current, index) =>{
            let v = [], ans = [];
            current.forEach( i=>{
                if(i === '---'){
                    if( v.length > 0 ){
                        let q = []
                        for (let z = 0; z < v.length; z++) {
                            const el = v[z];
                            const cl = config_type === 'true' ? config[z] : config[index][z]
                            if( cl ){
                                q.push(el)
                            }
                            else{
                                q.push( el.split(' ').filter(p=>p.length > 0) )
                            }
                        }
                        ans.push(q)   
                    }
                    v = []
                }
                else{
                    v.push(i)
                }
            } )
            return ans
        })
        // console.log(other)
        const inputExample = convertFile( req.files.inputExample )[0]
        const outputExample = convertFile( req.files.outputExample )[0]
        let ops = {}
        if(contest){
            ops['contest'] = contest._id
        }
        if(subsection){
            ops['subsection'] = subsection._id
        }
        const problem = await Problem.findByIdAndUpdate(editId, {
            time, memory, type,  
            inputExample,
            outputExample,
            score: ballar,
            ...ops,
            ...other
        }, {
            new: true
        })

        let configTests = [];
        for (let i = 0; i < input.length; i++) {
            for( let j=0; j < input[i].length; j++ ){
                configTests.push( { 
                    problem: problem._id,
                    config_type,
                    config: config_type ? config: config[i] ,
                    input: input[i][j],
                    output: output[i][j],
                    subTestNumber: i+1    
                } )
            }
        }
        // console.log(configTests)
        await Test.deleteMany({problem: editId})
        await Test.create( configTests ) 
        res.json({success: true})
    }
)

const getAllProblems = catchAsync(
    async (req,res,next)=>{
        const {page=1, sort, direction, title} = req.query
        // console.log(sort, direction, title)
        let query = {}
        const sortOption = {}
        sortOption[sort]=direction*1

        const role = {}

        if(!req.isAuthenticated() || req?.user?.role === 'admin') role['$or'] = [{'contest.public': true}, {section: {$ne: null}}  ] 

        if(title){
            query["$or"] = title.split(',').map( i=>({subsection:new mongoose.Types.ObjectId(i)}) )
            // query['$or'].push(({}))
        }

        // const data = await Problem.find({}).populate('subsection').populate('subsection.section')
        const [{ data: paginatedResult, count: totalCount }] = await Problem.aggregate([{

            $facet:{
                data:[
                    {$match: query},
                    {$sort: sortOption},
                    {$skip: (page-1)*50},
                    {$limit: 50},
                    {$lookup:{
                        from: 'subsections',
                        localField: 'subsection',
                        foreignField: '_id',
                        as: 'subsection'
                    }},
                    {
                        $addFields:{
                            
                            "subsection": {
                                "$arrayElemAt": ["$subsection",0],
                            }
                        }
                    },
                    {$lookup:{
                        from: 'contests',
                        localField: 'contest',
                        foreignField: '_id',
                        as: 'contest'
                    }},
                    {
                        $addFields:{
                            
                            "contest": {
                                "$arrayElemAt": ["$contest",0],
                            }
                        }
                    },
                    {
                        $addFields:{
                            
                            "section": "$subsection.section"
                        }
                    },
                    {$lookup:{
                        from: 'sections',
                        localField: 'section',
                        foreignField: '_id',
                        as: 'section'
                    }},
                    {$lookup:{
                        from: 'tags',
                        localField: 'tags',
                        foreignField: '_id',
                        as: 'tags'
                    }},
                    
                    {
                        $addFields:{
                            
                            "section": {
                                "$arrayElemAt": ["$section",0],
                            }
                        }
                    },
                    {$match: role},
                ],
                count: [
                    {$count: 'count'}
                ]
            }
            
        }])
        const parent = await Section.find({})
        const children = await SubSection.find({})
    
    // res.json({parent, children})
        res.json({data: paginatedResult, count: totalCount[0].count, parent, children })
    }
)

const getSingleProblem = catchAsync(
   async (req,res, next)=>{
    let data = await Problem.findById(req.params.id).populate('subsection').populate('tags').populate('contest')
    if(req.isAuthenticated()){
        const submit = await Submission.find({user: req.user._id, problem: data._id }).populate('user').populate('problem').populate('lang').sort('-createdAt')

        data = ({...data._doc, submissions: submit})
            
    }
    res.json(data)
   }
)
const deleteProblem = catchAsync( 
    async (req, res, next)=>{
        const data = await Problem.findByIdAndDelete(req.params.id)
        await Test.deleteMany( {problem: req.params.id} )
        res.status(204).json({})
    } 
)


module.exports = {
    getAllProblems,
    deleteProblem,
    createProblem,
    getSingleProblem,
    editProblem
}
