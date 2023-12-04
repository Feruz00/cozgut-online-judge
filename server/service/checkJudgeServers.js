const { default: axios } = require("axios")
const Judge = require("../models/JudgeServerModel")

const chechkJudgeServers = async ()=>{
    const data = await Judge.find({})
    data.forEach( async i=>{
        // console.log(i.port)
        await axios.get(`http://${i.host}${i.port? `:${i.port}`: '' }`)
        .then(async ()=>{
            // console.log(i)
            await Judge.findByIdAndUpdate(i._id, {running: true})
        }).catch(async err=>{
            // console.log("ERR", err.message)
            await Judge.findByIdAndUpdate(i._id, {running: false})
        })
    } ) 
}

module.exports = chechkJudgeServers