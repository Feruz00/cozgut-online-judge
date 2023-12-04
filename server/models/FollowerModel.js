const mongoose = require('mongoose')

const followerSchema = new mongoose.Schema({
    user:{
        type: mongoose.Types.ObjectId,
        ref:'User'
    },
    friend:{
        type: mongoose.Types.ObjectId,
        ref:'User'
    }
})

followerSchema.index({user: 1, friend: 1}, {unique: true})

const Follower = mongoose.model('Follower', followerSchema)

module.exports = Follower