const catchAsync = require("../middleware/errorHandler")
const User = require("../models/UserModel")

const createUser = catchAsync(
    async (req, res, next)=>{
        const {password, ...all} = req.body
        const user = await User.register({...all, role: 'member'}, password)
        // , {
        //     runValidators: false
        // })
        res.json(user)
    }
)

const getUsers = catchAsync(
    async (req, res, next)=>{
        const {type, text} = req.query
        
        let query = {}
        if(type==='all') query['role'] = 'user'
        else query['role'] = 'member'
        if(text?.length) query['fullName'] = { $regex: text, $options: 'i'}
        const users = await User.find(query)
        res.json(users)
    }
)

const updateUser = catchAsync(
    async (req, res, next)=>{
        const user = await User.findByIdAndUpdate(req.params.id)
        user.status = !user.status
        await user.save()
        res.json()
    }
)

const deleteUser = catchAsync(
    async (req, res, next)=>{
        const user = await User.findByIdAndDelete(req.params.id)
        res.json()
    }
)

const editUser = catchAsync(
    async (req,res, next)=>{
        const user = await User.findById(req.params.id)
        user.fullName = req.body.fullName
        user.username = req.body.username
        user.email = req.body.email
        if(req.body.password) await user.setPassword(req.body.password)
        await user.save()
        res.json()
    }
)

const getAdmins = catchAsync(
    async (req, res, next)=>{
        if(req.user.role === 'admin'){

            const users = await User.find({role: 'admin'}).sort('-createdAt')
            res.json(users)
        }
        else{
            res.status(403).json({message: 'Bu sahypa admin üçin'})
        }
        
    }
)


const createAdmin = catchAsync(
    async (req, res, next)=>{
        if(req.user.role === 'admin'){
            const {password, ...all} = req.body
            const user = await User.register({...all, role: 'admin'}, password)
            res.json(user)
        }
        else{
            res.status(403).json({message: 'Bu sahypa admin üçin'})
        }
        
    }
)

module.exports = {createUser, getUsers, updateUser, deleteUser, editUser, getAdmins, createAdmin}