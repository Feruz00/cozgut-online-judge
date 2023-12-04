const { login, getUser, logout, register , profile, account, changeInfo, changePassword, uploadPhoto} = require('../controller/authController')
const {statusMiddleware, access} = require('../middleware/authMiddleware')
const upload = require('../middleware/uploadphoto')

const router = require('express').Router()

// get current user

router.get('/', getUser)

// register

router.post('/register', register)

//login
router.post('/login', statusMiddleware, login)

//
router.get('/logout', logout)

//profile
router.get('/profile', access, profile )

// account
router.get('/user/:id', account)

// change username email
router.put('/info', access, changeInfo)

//change password
router.put('/password', access, changePassword)

// uploadphoto
router.put('/upload', access, upload.single('file'), uploadPhoto)
module.exports = router