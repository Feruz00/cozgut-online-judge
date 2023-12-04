const mongoose = require('mongoose')

const judgeSchema = new mongoose.Schema({
    port: Number,
    host: String,
    running: Boolean,
    queue: [{
        type: mongoose.Types.ObjectId,
        ref: 'Submission'
    }]
})

judgeSchema.index({port: 1, host: 1}, {unique: [true, 'Judge server ulanylan']})
const Judge = mongoose.model('Judge', judgeSchema)

module.exports = Judge