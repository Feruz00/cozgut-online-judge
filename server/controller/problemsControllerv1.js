
const axios = require('axios')
// create problem
const createProblem = async (req, res)=>{
    const { input, output, task} = req.files
    if(!input || !output || !task) return res.status(400).json({message: "Käbir maglumatlar iberilmändir!"})
    const inputTests = input[0].buffer.toString().split('\r\n').filter(i=>i!= '---')
    const outputTests = output[0].buffer.toString().split('\r\n').filter(i=>i!= '---')
    
    const {time, lang, memory, compiler} = req.body
    // const formData = new FormData()
    // formData.append('input', inputTests)
    // formData.append('output', outputTests)
    // formData.append('task', req.files.task[0].buffer.toString())
    // formData.append('time', time)
    // formData.append('memory', memory)
    // formData.append('lang', lang)
    // formData.append('compiler', compiler)
    
    
    try {
        const {data} = await axios({
            method: 'POST',
            url: `http://127.0.0.1:3009/judge`,
            data: {
                input: inputTests, output: outputTests, lang, compiler, memory, time, task: req.files.task[0].buffer.toString()
            },
            // headers: { "Content-Type": "multipart/form-data" },
            // withCredentials: true
        })
        console.log(data)
        res.json({})
    } catch (error) {
        console.log(error)
        res.status(400).json({message: "err"})
    }
}

module.exports = {
    createProblem
}