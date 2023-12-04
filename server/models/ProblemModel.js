const mongoose = require('mongoose')

const problemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Meselän adyny giriziň']
    },
    display: {
        type: String,
        unique: [true, 'Goşmaça id giriziň']
    },
    description: {
        type: String,
        required: [true, 'Meseläniň şertini giriziň']
    },
    input_config: {
        type: String,
        required: [true, 'Meseläniň şertini giriziň']
    },
    output_config: {
        type: String,
        required: [true, 'Meseläniň şertini giriziň']
    },
    extraDescription: String,
    level: {
        type: Number,
        required: [true, 'Meseläniň kynlyk derejesi san hökmünde görkezmeli']
    },
    tags: [{
        type: mongoose.Types.ObjectId,
        ref: 'Tag'
    }],
    time: {
        type: Number,
        required: [true, 'Wagt hökman gerek']
    },
    memory: {
        type: Number,
        required: [true, 'Möçberi hökman gerek mbda']
    },
    contest: {
        type: mongoose.Types.ObjectId,
        ref: 'Contest'
    },
    subsection: {
        type: mongoose.Types.ObjectId,
        ref: 'SubSection'
    },
    type: {
        type: String,
        enum: {
            values: ['custom', 'subtest'],
            message: 'Testleriň diňe iki görnüşini ulanmaly'
        },
        default: 'custom'
    },
    inputExample: {
        type: [String],
        required: [true, 'Meselem hökmüne giriş testler giriziň!']
    },
    outputExample: {
        type: [String],
        validate: {
            validator: function(v){
                return this.inputExample.length === v.length
            },
            message: 'Giriş we çykyş testleriň sany deň bolmaly'
        }
    },
    withTestFile: {
        type: Boolean,
        default: false
    },
    testFileInput: {
        type: String,
        validate: {
            validator: v=>{
                return ( this.withTestFile && v.length >0 )       
            },
            message: "Giriş faýlynyň adyny giriz"
        }
    },
    testFileOutput: {
        type: String,
        validate: {
            validator: v=>{
                return ( this.withTestFile && v.length >0 )       
            },
            message: "Çykyş faýlynyň adyny giriz"
        }
    },
    score: Array,
    decrease: {
        type: Boolean,
    },
    minut:{
        type: Number,
    },
    descore:{
        type: Number,
    }
    

})

const Problem = mongoose.model("Problem", problemSchema)

module.exports = Problem