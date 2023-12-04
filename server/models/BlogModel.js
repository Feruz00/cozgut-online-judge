const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Blogyň sözbaşysyny giriziň']
    },
    body: {
        type: String,
        required: [true, 'Blogyň mazmunyny giriziň']
    }
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog