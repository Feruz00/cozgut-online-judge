const catchAsync = require("../middleware/errorHandler");
const Contest = require("../models/ContestModel");
const Problem = require("../models/ProblemModel");
const Submission = require("../models/SubmissionModel");
const User = require("../models/UserModel");
const queueJudge = require("../service/judgeQueue");
// const addSubmission = require("../service/queue");
// const mongoose = require('mongoose');

const fullScan = catchAsync(
    async (req, res, next)=>{
        const {id} = req.params; // contest id shu we shu id boyunca hemme barlaglary bashlamaly
        const contest = await Contest.findByIdAndUpdate(id, {fullScan: true})
        const problems = await Problem.find({contest: contest._id})
        let query = {}
        if(problems.length > 0){
            query["$or"] = problems.map( i=>({problem: i._id}) )
        }
        console.log(query)
        await Submission.updateMany(query, {preTest:false, queue: true})
        const submissions = await Submission.find(query)
        // console.log(submissions)
        submissions.forEach(el=>{
            queueJudge(el._id)
        })

        res.json({})
    }
)

const giveRatingToUsers = catchAsync(
    async (req, res, next)=>{
        const {id} = req.params
        const contest = await Contest.findById(id).populate('users')
        const problems = await Problem.find({contest: contest._id})
        let query ={}
        if(problems.length > 0){
            query["$or"] = problems.map( i=>({problem: i._id}) )
        }
        let umumy = 0;
        
        const totalSum = problems.map(i=>{
            let sum = 0;
            let score = i.score
            for(let i=0;i<score.length;i++){
                sum+=score[i]
            }
            umumy+=sum;
            return ({_id: i._id, sum})
        })
        
        const submissions = await Submission.find({
            isContest: true,
            ...query
        }).populate('problem').populate('user')

        const netije = contest.users.map( user=>{
            let total = 0;
            const {ratings} = user._doc
            const rating = ratings[ratings?.length - 1] || 1200

            const result = problems.map( problem=>{
                let count = 0
                let maxScore = 0
                let warn = 0

                submissions.forEach(el=>{
                    
                    if(el.user._id.toString() === user._id.toString() 
                    && el.problem._id.toString() === problem._id.toString()) {
                        
                        if(el.score > 0){
                            if(maxScore < el.score) maxScore = el.score
                        }
                        else{
                            warn+=-el.score;
                        }
                        }
                })
                total = total + maxScore - warn
            })
            const newRating = Math.floor( (total*rating) / umumy  ) + rating
            return ({newRating, user})
        } )
        netije.forEach( async result =>{
            await User.findByIdAndUpdate(result.user._id, 
                {$addToSet: {ratings: ({contest: contest._id, rating: result.newRating})} })
        } )
        await Contest.findByIdAndUpdate(contest._id, {rating_berildimi: true})
        res.json({})
    }
)

const submitProblem = catchAsync( 
    async (req,res, next)=>{

        const {lang, problem} = req.body
        const about = await Problem.findById(problem).populate('contest')
        let add = {}
        // console.log('Step ---- 1')
        if( about.contest ){
            const contestStart = new Date( about.contest.start_time )
            const duration = about.contest.duration

            const contestEnd = new Date(about.contest.start_time)
            contestEnd.setMinutes( contestEnd.getMinutes() + duration.minutes )
            contestEnd.setHours( contestEnd.getHours() + duration.hour  )

            const now = new Date()

            if( now>=contestStart && now<=contestEnd ) {
                add['isContest'] = true;
                if(about.contest.public)  add['preTest'] = true;
            }

        }
        const solution = req.files.solution[0].buffer.toString()
        
        const data = {
            lang,
            problem,
            code: solution,
            queue: true,
            user: req.user._id,
            ...add
        }
        // console.log(data)
        const submission = await Submission.create(data)
        
        queueJudge(submission._id)
        // await submission.save()
        res.json(data)
    }
)

// get all submissions
const getSubmissions = catchAsync( async (req,res, next)=>{
    const {answer, who} = req.query
    let query = {}
    if(answer !== 'all') query['verdict'] = answer
    if(req.isAuthenticated() && who==='me') query['user'] = req.user._id

    const submissions = await Submission.aggregate([
        {
            $match: query
        },
        {
            $lookup:{
                from: 'problems',
                localField: 'problem',
                foreignField: '_id',
                as: 'problem'
            }
        },
        {
            $addFields:{
                "problem": {
                    "$arrayElemAt": ["$problem",0],
                }
            }
        },
        {
            $lookup:{
                from: 'languages',
                localField: 'lang',
                foreignField: '_id',
                as: 'lang'
            }
        },
        {
            $addFields:{
                "lang": {
                    "$arrayElemAt": ["$lang",0],
                }
            }
        },
        
        {
            $lookup:{
                from: 'users',
                localField: 'user',
                foreignField: '_id',
                as: 'user'
            }
        },
        {
            $addFields:{
                "user": {
                    "$arrayElemAt": ["$user",0],
                }
            }
        },

        {
            $lookup:{
                from: 'subsections',
                localField: 'problem.subsection',
                foreignField: '_id',
                as: 'subsection'
            }
        },
        {
            $addFields:{
                "subsection": {
                    "$arrayElemAt": ["$subsection",0],
                }
            }
        },
        {
            $lookup:{
                from: 'contests',
                localField: 'problem.contest',
                foreignField: '_id',
                as: 'contest'
            }
        },
        {
            $addFields:{
                "contest": {
                    "$arrayElemAt": ["$contest",0],
                }
            }
        },
        {
            $sort:{
                createdAt: -1
            }
        }
        
        
    ])

    // console.log(submissions)
  
    res.json(submissions)
} )

// get all problem submission
const getProblemSubmissions = catchAsync( 
    async (req, res, next)=>{
        const data = await Submission.find({ problem: req.params.id }).populate('problem')
        // .populate('user')
        res.json(data)
    }
)

const getUserSubmission = catchAsync(
    async (req, res, next)=>{
        const user = await User.findOne({username: req.params.id})
        const data = await Submission.find({ user: user._id })
        res.json(data)
    }
)

const getsectionSubmission = catchAsync(
    async (req,res,next)=>{
        
        const {answer, who} = req.query
        let query = {}
        if(answer !== 'all') query['verdict'] = answer
        if(req.isAuthenticated() && who==='me') query['user'] = req.user._id

        const submissions = await Submission.aggregate([
            {
                $match: query
            },
            {
                $lookup:{
                    from: 'problems',
                    localField: 'problem',
                    foreignField: '_id',
                    as: 'problem'
                }
            },
            {
                $addFields:{
                    "problem": {
                        "$arrayElemAt": ["$problem",0],
                    }
                }
            },
            {
                $lookup:{
                    from: 'languages',
                    localField: 'lang',
                    foreignField: '_id',
                    as: 'lang'
                }
            },
            {
                $addFields:{
                    "lang": {
                        "$arrayElemAt": ["$lang",0],
                    }
                }
            },
            {
                $lookup:{
                    from: 'users',
                    localField: 'user',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {
                $addFields:{
                    "user": {
                        "$arrayElemAt": ["$user",0],
                    }
                }
            },

            {
                $lookup:{
                    from: 'subsections',
                    localField: 'problem.subsection',
                    foreignField: '_id',
                    as: 'subsection'
                }
            },
            {
                $addFields:{
                    "subsection": {
                        "$arrayElemAt": ["$subsection",0],
                    }
                }
            },
            {
                $sort:{
                    createdAt: -1
                }
            }
            
            
        ])

        // const submissions = await Submission.find(query).populate('problem').populate('lang')
        // .populate('user').sort('-createdAt').populate('problem.subsection')
        const result = submissions.filter( i=> i.problem.subsection )
        res.json(result)
    }
)

const getcontestSubmission = catchAsync(
    async (req,res,next)=>{
        
        const {answer, who} = req.query
        let query = {}
        if(answer !== 'all') query['verdict'] = answer
        if(req.isAuthenticated() && who==='me') query['user'] = req.user._id

        const submissions = await Submission.aggregate([
            {
                $match: query
            },
            {
                $lookup:{
                    from: 'problems',
                    localField: 'problem',
                    foreignField: '_id',
                    as: 'problem'
                }
            },
            {
                $addFields:{
                    "problem": {
                        "$arrayElemAt": ["$problem",0],
                    }
                }
            },
            {
                $lookup:{
                    from: 'languages',
                    localField: 'lang',
                    foreignField: '_id',
                    as: 'lang'
                }
            },
            {
                $addFields:{
                    "lang": {
                        "$arrayElemAt": ["$lang",0],
                    }
                }
            },
            {
                $lookup:{
                    from: 'users',
                    localField: 'user',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {
                $addFields:{
                    "user": {
                        "$arrayElemAt": ["$user",0],
                    }
                }
            },

            {
                $lookup:{
                    from: 'contests',
                    localField: 'problem.contest',
                    foreignField: '_id',
                    as: 'contest'
                }
            },
            {
                $addFields:{
                    "contest": {
                        "$arrayElemAt": ["$contest",0],
                    }
                }
            },
            {
                $sort:{
                    createdAt: -1
                }
            }
            
            
        ])

        // const submissions = await Submission.find(query).populate('problem').populate('lang')
        // .populate('user').sort('-createdAt').populate('problem.subsection')
        const result = submissions.filter( i=> i.problem.contest )
        res.json(result)
    }
)
// result single submission - for testing
const getResultSingleSubmissions = catchAsync( 
    async (req, res, next)=>{
        const data = await Submission.findById(req.params.id).populate('problem')
        res.json(data)
    }
)

const getMyContestSubmissions = catchAsync(
    async (req, res, next)=>{
       
        const submissions = await Submission.find({ user:req.user._id })
        .populate('problem').populate('user').populate('lang')

        const data = submissions.filter( i=> i.problem?.contest?.toString() === req.params.id )

        res.json(data)
    }
)

const getResultsSubmissions = catchAsync(
    async (req,res,next)=>{
        const {id} = req.params
        const contest = await Contest.findById(id).populate('users')
        const problems = await Problem.find({contest: contest._id}).sort('-createdAt')
        let query = {}
        // console.log("user:", req.user)
        if(problems.length > 0)
            query["$or"] = problems.map( i=>({problem: i._id}) )
        
        if(req.user?.role === 'member'){
            query['user'] = req.user._id
        }

        // console.log(query)
        const submissions = await Submission.find({isContest: true, ...query }).sort('-createdAt')
            .populate('problem').populate('lang').populate('user')
        
        let userlerinJogaby = contest.users.map( user=>{
            let total = 0;
            const result = problems.map( problem=>{
                let count = 0
                let maxScore = 0
                let warn = 0
                let ugratmalar = []
                let solve = false
                submissions.forEach(el=>{
                    
                    if(el.user._id.toString() === user._id.toString() 
                    && el.problem._id.toString() === problem._id.toString()) {
                        
                        if(!solve) ++count;
                        if(el.accepted) solve=true
                        if(el.score > 0){
                            if(maxScore < el.score) maxScore = el.score
                        }
                        else{
                            warn+=-el.score;
                        }
                        ugratmalar.push(el)

                        // console.log( el.score , maxScore, warn )
                    }
                })
                total = total + maxScore - warn
                // console.log('------')
                return ({problem, count, sum: maxScore - warn, submissions: ugratmalar })
            })
            return ({result, total, user})
        } ).sort((a,b)=>{
            return -a.total + b.total
        })

        res.json(userlerinJogaby)

    }
)
module.exports = {
    submitProblem,
    getProblemSubmissions,
    getResultSingleSubmissions,
    getSubmissions,
    getsectionSubmission,
    getcontestSubmission,
    getMyContestSubmissions,
    getResultsSubmissions,
    fullScan,
    giveRatingToUsers,
    getUserSubmission
}