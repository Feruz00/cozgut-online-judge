const mongoose = require('mongoose')

const sectionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Çeşmäniň adyny giriziň!'],
        unique: [true, 'Bu bölüm girizilendir']
    },
    description:String
}, {
    timestamps: true
})

const Section = mongoose.model("Section", sectionSchema)

const subSectionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Bölüm adyny giriziň!'],
    },
    description:String,
    section: {
        type: mongoose.Types.ObjectId,
        ref: 'Section'
    }
},{
    timestamps: true
})

const SubSection = mongoose.model('SubSection', subSectionSchema)

module.exports = {
    Section,
    SubSection
}