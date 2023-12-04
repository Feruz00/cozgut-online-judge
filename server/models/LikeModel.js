const mongoose = require('mongoose')

const likeSchema = new mongoose.Schema({
    user:{
        type: mongoose.Types.ObjectId,
        ref:'User',
        unique: [true, 'Diňe bir gezek like goýup bilýär']
    },
    blog: {
        type: mongoose.Types.ObjectId,
        ref:'Blog',
    }
})

const Like = mongoose.model('Like', likeSchema)

module.exports = Like