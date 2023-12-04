const catchAsync = require("../middleware/errorHandler");
const Contest = require("../models/ContestModel");
const Problem = require("../models/ProblemModel");
const Submission = require("../models/SubmissionModel");
const User = require("../models/UserModel");

const createContest = catchAsync(
    async (req,res, next)=>{
        const contest = await Contest.create(req.body)
        res.json(contest)
    }
)

const getContests = catchAsync(
    async (req,res, next)=>{
        const role = req.isAuthenticated() ? req.user.role : 'user'; // calysh shu sozi users
        let query = {}
        if(role === 'user') query['public'] = true
        if(role === 'member') {
            query['public'] = false
            query['users'] = req.user._id
        }
        const contests = await Contest.find(query).sort('-start_time')
        // console.log(contests)
        const before = contests.filter( contest=> {
            const contestStart = new Date(contest.start_time)
            contestStart.setMinutes( contestStart.getMinutes() + contest.duration.minutes)
            contestStart.setHours( contestStart.getHours() + contest.duration.hour )
            return contestStart >= Date.now()
            // const isDisable = contestStart < Date.now()
        }  )

        const after = contests.filter( contest=> {
            const contestStart = new Date(contest.start_time)
            contestStart.setMinutes( contestStart.getMinutes() + contest.duration.minutes)
            contestStart.setHours( contestStart.getHours() + contest.duration.hour )
            return contestStart < Date.now()
            // const isDisable = contestStart < Date.now()
        }  )
        
        res.json({
            before,
            after
        })
    }
)

const getContest = catchAsync(
    async (req,res, next)=>{
        const role = req.isAuthenticated() ? req.user.role : 'user'; // calysh shu sozi usere
        let query = {}
        // console.log("geldim", req.params.id)
        const {id} = req.params
        if(role === 'user') {
            query['public'] = true
            query['start_time'] = {'$lt': Date.now()}
        }
        if(role === 'member'){
            query['public'] = false
            query['start_time'] = {'$lt': Date.now()}    
        }
        query['_id'] = id

        const contest = await Contest.findOne(query).populate('users').populate('problems').populate('authors')
        // console.log(contest)
        const contestStart = new Date(contest.start_time)
        contestStart.setMinutes( contestStart.getMinutes() + contest.duration.minutes)
        contestStart.setHours( contestStart.getHours() + contest.duration.hour )
        const isDisable = contestStart < Date.now()

        res.json({
            ...contest._doc,
            isDisable
        })
    }
)

const updateContest = catchAsync(
    async (req, res, next)=>{
        // console.log(req.params, req.body)
        const contest = await Contest.findByIdAndUpdate(req.params.id, req.body, {new: true})

        res.json(contest)
    }
)

const deleteContest = catchAsync(
    async (req,res,next)=>{
        const contest = await Contest.findByIdAndDelete(req.params.id)
        res.status(204).json({})
    }
)

const addUserContest = catchAsync(
    async (req,res, next)=>{
        // fullName username email
        const {fullName} = req.body
        const user = await User.findOne({ fullName, role: 'member' })

        const contest = await Contest.findOneAndUpdate({_id: req.params.id}, { $addToSet: {users: user._id} })

        res.json(contest)
    }
)

const removeUserContest = catchAsync(
    async (req,res, next)=>{
        // fullName username email
        const {user} = req.body

        const contest = await Contest.findOneAndUpdate({_id: req.params.id}, { $pull: {users: user} })

        res.json(contest)
    }
)

const problemsByContest = catchAsync(
    async(req,res,next)=>{
        // admin ucin ayratyn goshmaly
        let problems = await Problem.find({contest: req.params.id}).populate('tags').populate('contest')
        
        const contest = await Contest.findById(req.params.id)
        
        const contestStart = new Date(contest.start_time)
        const isDisable = contestStart > new Date()

        if(isDisable){
            if(!req.isAuthenticated() || (req.user?.role !== 'admin')) return res.json({
                isDisable: true,
                contest
            })
        }

        if(req.isAuthenticated() ){
            const OR = problems?.map(i=>({ problem: i._id })) || []
            let qu = {}
            if(OR.length > 0) qu["$or"] = OR
            const submissions = await Submission.find({user: req.user._id, ...qu})
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

        res.json(problems)
    }
)

const problembyContest = catchAsync(
    async (req,res, next)=>{
        let problem = await Problem.findById(req.params.id).populate('tags').populate('contest')
        
        if(req.isAuthenticated()){
            const submit = await Submission.find({user: req.user._id, problem: problem._id }).populate('user').populate('problem').populate('lang').sort('-createdAt')
    
            problem = ({...data._doc, submissions: submit}) 
        }
        res.json(problem)
    }
)

const registerUserToContest = catchAsync(
    async (req, res, next)=>{
        // console.log(req.params.id)
        const contest = await Contest.findByIdAndUpdate(req.params.id, {$addToSet: {users: req.user._id}})
        res.json()
    }
)
module.exports = {
    createContest,
    getContest,
    getContests,
    updateContest,
    deleteContest,
    addUserContest,
    removeUserContest,
    problemsByContest,
    problembyContest,
    registerUserToContest
}