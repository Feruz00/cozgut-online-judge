const { createProblem, getAllProblems, getSingleProblem, deleteProblem, editProblem } = require('../controller/problemController')
const uploadProblems = require('../middleware/insideMulter')

const router = require('express').Router()

// create problem
router.post('/', uploadProblems.createProblem , createProblem)

// get all problem
router.get('/', getAllProblems)

// getsingle problem
router.get('/:id', getSingleProblem)


// update Problem
router.put('/:id', uploadProblems.createProblem, editProblem)

//delete problem
router.delete('/:id', deleteProblem )
module.exports = router