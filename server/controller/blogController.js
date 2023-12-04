const catchAsync = require("../middleware/errorHandler");
const Blog = require("../models/BlogModel");


const createBlog = catchAsync(
    async (req, res, next)=>{
        const blog = await Blog.create(req.body)
    }
)

const getBlogs = catchAsync(
    async (req, res, next)=>{
        const blogs = await Blog.find({})
    }
)


module.exports = {createBlog, getBlogs}