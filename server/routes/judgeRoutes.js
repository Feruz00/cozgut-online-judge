const { createJudge, getJudge, updateJudge } = require('../controller/judgeController')

const router = require('express').Router()

router.post('/', createJudge)

router.get('/', getJudge)

router.put('/', updateJudge)

module.exports = router