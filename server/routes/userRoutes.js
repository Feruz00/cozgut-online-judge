const { createUser, getUsers, updateUser, deleteUser, editUser, getAdmins, createAdmin } = require('../controller/userController')
const { access } = require('../middleware/authMiddleware')

const router = require('express').Router()

// create user
router.post('/', createUser)


router.post('/admin',access, createAdmin)

// get all users
router.get('/', getUsers)

// toggle status
router.patch('/:id', updateUser)

// delete user
router.delete('/:id', deleteUser)

//edit user

router.put('/:id', editUser)

router.get('/admins', access, getAdmins)

module.exports = router