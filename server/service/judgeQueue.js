const Queue = require('bull')
const Judge = require('../models/JudgeServerModel')
const addSubmission = require('./queue')

const addJudge = new Queue('judge-queue', {
    redis: {host: '127.0.0.1', port: 6379}
})

addJudge.process( async ({data})=>{
    try {
        const result = await Judge.aggregate([
            {
                $match: {
                    running: true
                }
            },
            {
                $project:{
                    count: {
                        $size: '$queue'
                    },
                    document: "$$ROOT"
                }
            },
            {
                $sort: {
                    count: 1
                }
            },
            {
                $limit: 1
            }
        ])
        await Judge.findByIdAndUpdate(result[0]._id, {$push: { queue: data.submissionId }})
        // console.log(data)
        addSubmission(data.submissionId, result[0].document.host, result[0].document.port  )
    } catch (error) {
        throw new Error(error)   
    }
} )

addJudge.on('failed', err=>{
    console.log(err)
})

addJudge.on('completed', res=>{
    console.log("completed", res.data)
})

const queueJudge = (submissionId, preTest=false)=>{
    addJudge.add({
        submissionId, preTest
    })
}

module.exports = queueJudge