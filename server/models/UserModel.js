const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, 'Ulanyjynyň ady ulanylan, başga at saýlaň'],
        required: [true, 'Ulanyjynyň adyny giriziň'],
        min: [6, 'Ulynyjyň adynyň uzunlygy 6 harpdan köp bolmaly'],
        max: [20, 'Ulynyjyň adynyň uzunlygy 20 harpdan az bolmaly']
    },
    fullName: String,
    email: {
        type: String,
        required: [true, 'Email addresiňiz gerek!'],
        unique:[true, 'Email öň ulanylypdyr'],
        validate: {
            validator: function(v){
                const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                return emailRegex.test(v)
            },
            message: ['Email addres kada laýyk däl']
        }
    },
    avatar: String,
    last:Date,
    status: {
        type: Boolean,
        default: true
    },
    role: {
        type:String,
        enum: {
            values: ['admin', 'member', 'user', 'coordinator'],
            message: "Ulanyjynyň ýalnyş görnüşini saýladyňyz"
        },
        default: 'user'
    },
    ratings:[{
        contest:{
            type:mongoose.Types.ObjectId,
            ref: 'Contest'
        },
        rating: Number
    }]
},{
    timestamps: true
})


userSchema.plugin(passportLocalMongoose,{  
    usernameQueryFields: ['email', 'username'], 
    lastLoginField: 'last',
    // maxAttempts: 5,
    // unlockInterval: 2*60*60*1000
});
const User = mongoose.model('User', userSchema)

module.exports = User