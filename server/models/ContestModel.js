const mongoose = require('mongoose')
const contestSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Bäsleşigiň sözbaşyny giriziň']
    },
    start_time:{
        type: Date,
        required: [true, 'Bäsleşigiň başlanjak wagtyny giriziň']
    },
    duration: {
        type: Object,
        required: [true, 'Bäsleşigiň dowamlylylyk wagtyny giriziň']
    },
    public:{
        type: Boolean,
        default: true
    },
    users: [{
        type: mongoose.Types.ObjectId,
        ref:'User'
    }],
    problems:[{
        type: mongoose.Types.ObjectId,
        ref: 'Problem'
    }],
    authors: [{
        type: mongoose.Types.ObjectId,
        ref:'User',
        default: []   
    }],
    
    issues: [{
        error: {
            type: String,
            required: [true, 'Bäsleşikde ýüze çykan ýalňyşlygyň sebäbini giriziň']
        },
        problem:{
            type: mongoose.Types.ObjectId,
            ref: 'Problem'
        },
    }],
    fullScan: {
        type: Boolean,
        default: false
    },
    rating_berildimi: {
        type: Boolean,
        default: false
    }
    
})

const Contest = mongoose.model('Contest', contestSchema)

module.exports = Contest