const { createBlog, getBlogs } = require('../controller/blogController')

const router = require('express').Router()

router.post('/', createBlog)

router.get('/', getBlogs)

module.exports = router