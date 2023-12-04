const { getTags, createTag, deleteTag, updateTag, getTag } = require('../controller/tagController')

const router = require('express').Router()

// get all tag

router.get('/', getTags)

//
router.get('/tag', getTag)
// create tag
router.post('/', createTag)

// delete tag
router.delete('/:id', deleteTag)

// update 
router.patch('/:id', updateTag)
module.exports = router