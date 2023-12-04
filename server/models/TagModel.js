const mongoose = require('mongoose')

const tagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Tegiň ady zerur'],
        unique: [true, 'Bu teg öň ulanylan']
    }
},{
    timestamps: true
})

const Tag = mongoose.model('Tag', tagSchema)

module.exports = Tag