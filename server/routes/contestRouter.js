const { createContest, getContests, getContest, updateContest,
     deleteContest, addUserContest, removeUserContest, problemsByContest, problembyContest, registerUserToContest } = require('../controller/contestController')

const router = require('express').Router()

// create contest
router.post('/', createContest)

// get All contests
router.get('/', getContests)

// get problems by contest
router.get('/problems/:id', problemsByContest)

// get problem
router.get('/problem/:id', problembyContest)
// get Single contest
router.get('/:id', getContest)

// update contest info
router.patch('/:id', updateContest )

//delete contest
router.delete('/:id', deleteContest)

// add Users for secret contest
router.put('/users/:id',addUserContest )

//
router.patch('/register/:id', registerUserToContest)
//remove user from contest

router.put('/remove/:id', removeUserContest)
module.exports = router