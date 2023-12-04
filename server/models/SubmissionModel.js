const mongoose = require('mongoose')


const submissionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref:'User'
    },
    problem: {
        type: mongoose.Types.ObjectId,
        ref: 'Problem'
    },
    accepted: Boolean,
    time: Number,
    memory: Number,
    verdict: String,
    code: String,
    stdout: Array,
    tests: Array,
    
    score: Number,
    preTest: Boolean,
    isContest: Boolean,

    wrongTestNumber: Object,
    wrongTestOutput: String,
    
    queue: Boolean,
    lang:{
        type: mongoose.Types.ObjectId,
        ref: "Language"
    }
}, {
    timestamps: true
})

const Submission = mongoose.model('Submission', submissionSchema)

module.exports = Submission