const mongoose = require('mongoose')

const testSchema = new mongoose.Schema({
    problem: {
        type: mongoose.Types.ObjectId,
        ref:'Problem'
    },
    subTestNumber: Number,
    // contestde hack edilende goshulan test
    addTest: {
        type: Boolean,
        default: false
    },
    input: {
        type: String,
        required: [true, 'Giriş testi giriziň']
    },
    output: {
        type: Array,
        required: [true, 'Giriş testi giriziň']
    },
    config_type: Boolean,
    config: Array
})

const Test = mongoose.model('Test', testSchema)

module.exports = Test