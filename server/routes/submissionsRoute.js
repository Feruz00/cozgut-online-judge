const { submitProblem , getProblemSubmissions,
    getResultSingleSubmissions, getSubmissions, getsectionSubmission, 
    getcontestSubmission, getMyContestSubmissions, getResultsSubmissions, 
    fullScan, giveRatingToUsers, getUserSubmission} = require('../controller/submissionController');
const { access } = require('../middleware/authMiddleware');
const uploadProblems = require('../middleware/insideMulter');

const router = require('express').Router()

// create submission
router.post('/', uploadProblems.submitProblem, submitProblem )

// get all submissions

router.get('/', getSubmissions)

// get all problem submissions
router.get('/problem/:id', getProblemSubmissions)

// get result single submission
router.get('/submission/:id', getResultSingleSubmissions)

// get section submissions
router.get('/section', getsectionSubmission)

router.get('/contest', getcontestSubmission)

// my submission submission 
router.get('/my/:id', access, getMyContestSubmissions)

router.get('/user/:id', getUserSubmission)

// result contest by submission
router.get('/result/:id', getResultsSubmissions)
//
router.put('/fullscan/:id', fullScan)

router.put('/rating/:id', giveRatingToUsers)
module.exports = router