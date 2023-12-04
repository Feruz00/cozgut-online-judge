const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    user:{
        type: mongoose.Types.ObjectId,
        ref:'User'
    },
    blog: {
        type: mongoose.Types.ObjectId,
        ref:'Blog',
    },
    level: {
        type: Number,
        default: 1
    },
    parentComment: {
        type: mongoose.Types.ObjectId,
        ref:'Comment'
    }
})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment