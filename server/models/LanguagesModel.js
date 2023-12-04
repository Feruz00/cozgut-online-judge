const mongoose = require('mongoose')

const langSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Programmirleme diliniň adyny giriziň']
    },
    extension: {
        type: String,
        required: [true, 'Programmirleme diliniň giňeltmesini giriziň']
    },
    compiler: {
        type: String,
        required: [true, 'Programmirleme diliniň kompliyatorynyň adyny giriziň']
    },
    status: {
        type: Boolean,
        default: true
    }

})

const Language = mongoose.model('Language', langSchema)

module.exports = Language