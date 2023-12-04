const Queue = require('bull')
const Submission = require('../models/SubmissionModel')
const mongoose = require('mongoose')
const Test = require('../models/TestModel')
const { default: axios } = require('axios')
const Judge = require('../models/JudgeServerModel')

const submitQueue = new Queue('submission-queue', {
    redis: {host: '127.0.0.1', port: 6379}
})

submitQueue.process( async ({data})=>{
    const {submissionId, host, port} = data
    const submission = await Submission.aggregate([
        {
            $match:{
                "_id": new mongoose.Types.ObjectId( submissionId)
            }
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
    ])
    
    await Submission.findByIdAndUpdate(submissionId, {queue: false})
    const add = []
    if(submission[0].preTest) {
        add.push({
            $sort: {
                createdAt: -1,
            }
        })
        add.push({
            $limit: 7
        })
        
    }
    else{
        add.push({
            $sort: {
                createdAt: -1,
            }
        })
        
    }
    // console.log(add)
    const tests = await Test.aggregate([
        {
            $match: {
                problem: submission[0].problem._id
            }
        },

        ...add,
        {
            $group: {
                _id: '$subTestNumber',
                tests: { 
                    $push: { 
                        _id: "$_id",
                        input: '$input', 
                        output: '$output',
                        config_type: '$config_type',
                        config: '$config'
                    }}
            }
        },
        {
            $sort:{
                "_id":1
            }
        }
    ])
    // console.log('STEP----5')
    // console.log(tests, tests.tests, `http://${host}:${port}/judge`)
    try {
        const {data} = await axios.post(`http://${host}:${port}/judge`, {
            task: submission[0].code,
            testId: tests.map(i=>i.tests.map( j=>j._id ).flat(1)), 
            input: tests.map(i=>i.tests.map( j=>j.input ).flat(1)), 
            output: tests.map(i=>i.tests.map( j=>({output: j.output, config: j.config}) ).flat(1)),
            type: submission[0].problem.type,
            compiler: submission[0].lang.compiler, 
            lang: submission[0].lang.extension,
            time: submission[0].problem.time,
            memory: submission[0].problem.memory,
            withTestFile: submission[0].problem?.withTestFile || false,
            testFileInput: submission[0].problem?.testFileInput || '',
            testFileOutput: submission[0].problem?.testFileOutput || ''
        })
        let other ={}
        // console.log("otherden ashakda:")
        // console.log(submission[0].isContest, data.accedted)
        if(submission[0].isContest){
            if(data.accepted){
                let almalyBal = 0;

                submission[0].problem.score.forEach(el => {
                    almalyBal+=el
                });
                // console.log("dogry bolsa ", almalyBal)
                if(submission[0].problem.type ==='custom'){
                    let almalyBal = submission[0].problem.score[0]
                    if(submission[0].problem.decrease){
                        const iberilenWagt = new Date( submission[0].createdAt)
                        const bashlangycBal = new Date( submission[0].contest.start_time )

                        const ayyrmalyBal = 
                        Math.floor((iberilenWagt.getTime() - bashlangycBal.getTime())/(1000*60*submission[0].problem.minut))
                        almalyBal -= ayyrmalyBal*submission[0].problem.descore
                    }
                    other['score'] = almalyBal
                }
                else{
                    other['score'] = almalyBal
                }
                // console.log(other)
            }
            else{
                // console.log("yalnyshyn icinde")
                if(submission[0].problem.type ==='custom'){
                    other['score'] = -50
                }
                else{
                    let almalyBal = 0;
                    for (let i = 0; i < data.wrongTestNumber.subTest-1; i++) {
                        almalyBal+= submission[0].problem.score[i]
                    }
                    other['score'] = almalyBal
                }
                // console.log(other)
            }
        }
        await Submission.findByIdAndUpdate( submissionId, {...data, ...other})
        

    } catch (error) {
        throw new Error(error)
    }

})
submitQueue.on('active', f=>{
    // console.log("active:")
})

submitQueue.on('failed', async err=>{
    console.error("failed:", err.failedReason)
    // const {host, port, submissionId} = res.data
    // await Judge.updateOne({host, port}, {$pull: {queue: submissionId}})
    
    // console.log("error bar", err.data, err.getState)
})

submitQueue.on('completed', async  res=>{
    const {host, port, submissionId} = res.data
    await Judge.updateOne({host, port}, {$pull: {queue: submissionId}})
    // console.log("completed:", res.data)
})

const addSubmission =  (submissionId,  host, port) =>{
    submitQueue.add({
        submissionId,
        host, 
        port
    })
}

module.exports = addSubmission