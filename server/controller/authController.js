const catchAsync = require("../middleware/errorHandler");
const Submission = require("../models/SubmissionModel");
const User = require("../models/UserModel");
const passport = require('passport')

const register = catchAsync(
    async (req, res, next)=>{
        const {password, ...all} = req.body
        const user = await User.register({...all}, password)
        res.json(user)
    }
)

const login = catchAsync(
    async (req, res, next)=>{
        const newUser = new User({
            username: req.body.username,
            password: req.body.password
        })
    
        req.login(newUser, err=>{
            if (err) {
                return res.status(404).json(err)
            } else {
                passport.authenticate("local")(req, res, function(){
                    // console.log(req.user)
                    res.redirect("/api/auth/");
                });
            }        
        })    
    }
)

const getUser = (req,res)=>{
    if(req.isAuthenticated()){
        return res.json(req.user)
    }
    return res.status(403).json({
        message: 'User not logged in'
    })
}

const logout = (req,res)=>{
    console.log("logouta geldim")
    req.logout(function(err) {
        if (err) { 
            console.log(err)
            return res.status(400).json(err) }
        res.json();
    });
}

const profile = catchAsync(
    async (req, res, next)=>{
        const user = await User.findById(req.user._id).populate('ratings.contest')
        const submissions = await Submission.find({user: user._id})
        res.json({...user._doc, submissions})
    }
)

const account = catchAsync(
    async (req, res, next)=>{
        const user = await User.findOne({username: req.params.id}).populate('ratings.contest')
        const submissions = await Submission.find({user: user._id})
        res.json({...user._doc, submissions})
    }
)

const changeInfo = catchAsync(
    async (req,res, next)=>{
        const user = await User.findByIdAndUpdate(req.user._id, req.body, {new: true})
        res.json(user)
    }
)

const changePassword = catchAsync(
    async (req, res, next)=>{
        const {oldPassword, newPassword} = req.body;
        const user = await User.findById(req.user._id)
        await user.changePassword(oldPassword, newPassword, err=>{
            if(err) {
                if(err.name === 'IncorrectPasswordError'){
                    res.status(400).json({ success: false, message: 'Incorrect password' }); // Return error
                }else {
                    res.status(400).json({ success: false, message: 'Something went wrong!! Please try again after sometimes.' });
                }
            }else {
             res.json({ success: true, message: 'Your password has been changed successfully' });
            }
        })
    }
)

const uploadPhoto = catchAsync(
    async (req, res, next)=>{
        const file = req.file.path;
        const user = await User.updateOne({ _id: req.user._id, }, { $set: { avatar: file } }, {new: true})
        return res.json(user)
    }
)

module.exports = { register, login, getUser, logout , profile, account, changeInfo, changePassword, uploadPhoto}