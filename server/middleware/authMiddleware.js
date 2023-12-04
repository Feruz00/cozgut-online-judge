const User = require("../models/UserModel");
const catchAsync = require("./errorHandler");

const statusMiddleware = catchAsync(
    async (req,res, next)=>{
        const user = await User.findOne({
            $or: [ {username: req.body.username} , {email: req.body.username} ]
        })
        // console.log(user)
        if(!user._doc.status)
            return res.status(403).json({message: 'Siz hasabyňyz doňdyryldy'})
        next()
    }
)

const access  = catchAsync(
    async (req,res, next)=>{
        if(req.isAuthenticated()){
           return  next()
        }
        return res.status(403).json({message: 'Bu sahypa girip bilmeýärsiňiz'})
       
    }
)



module.exports = {statusMiddleware, access}