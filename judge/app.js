const express = require('express')
const multer = require('multer')
const fs = require('fs')
const judge = require('./judge')
const shelljs = require('shelljs')
const multerStorage = multer.memoryStorage();
const cors = require('cors')
const http = require('http');
const app = express()

const httpServer = require("http").createServer(app);

const io = require("socket.io")(httpServer);

app.set("io", io);

const multerFilter = (req, file, cb) => {
    cb(null, true);
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

app.use(cors())

app.use(express.urlencoded({extended:true}))
app.use(express.json({limit: '100mb'}))


app.post('/judge', upload.single('task') , async (req, res)=>{
    fs.closeSync(fs.openSync(`./solution.${req.body.lang}`,"w"))   
    fs.writeFileSync( `./solution.${req.body.lang}`, req.body.task )
    fs.closeSync(fs.openSync(`${__dirname}/error.txt`,"w"))
    
    const {input, output, testId, time, memory, lang, 
        compiler, type, withTestFile, testFileInput, testFileOutput} = req.body
    if(lang !== 'py') await shelljs.exec(`sh judge.sh ${compiler} error.txt`)
    const errorFile = fs.readFileSync(`${__dirname}/error.txt`, 'utf-8')
    const errors = errorFile.split('\n')
    
    if(errors.includes('COMPILATION ERROR')){
        const err = errors.map(i=>i.split(`solution.${lang}:`))
        let t1=[]
        for(let i=0;i<err.length;i++){
            if(err[i][0]==='COMPILATION ERROR') break;
            if( err[i].length===2 ) t1.push(err[i][1])
            else t1.push(err[i][0])
        } 
        return res.json({
            accepted: false, 
            verdict: "COMPILATION ERROR", 
            stdout: t1
        })
    }
    let arr = [];
    let testInputFile = 'test.txt'

    if(withTestFile){
        testInputFile = testFileInput
        if(!fs.existsSync(testFileInput)) 
            fs.writeFileSync(testFileInput, '')
        if(!fs.existsSync(testFileOutput)) 
            fs.writeFileSync(testFileOutput, '')
                   
    }
    let result;
    for (let i = 0; i < input.length; i++) {
        const tests = input[i];
        const subResult = []
        for( let j = 0; j<tests.length; j++ ){
            const el = tests[j]
            console.log( ` N ${i+1} Subtest compiling ${j+1} test :` )
            fs.writeFileSync(testInputFile, el, 'utf-8')
            result = await judge(compiler, time, memory, `solution.${lang}`, 
            withTestFile, testInputFile, testFileOutput )
            subResult.push({...result, test:testId[i][j]})
            const {config, output:ans } = output[i][j]
            if(!result.status){
                if( type==='subtest') arr.push([ {subTest: i+1, tests: subResult}  ])
                else arr = subResult
                let wrongTest;
                if( type==='subtest') wrongTest = { subTest: arr.length, testNum: subResult?.length }
                else wrongTest = {testNum: arr.length}
                return res.json( {
                    accepted: false,
                    verdict: result.message,
                    wrongTestNumber: wrongTest,
                    wrongTestOutput: result.stdout, 
                    stdout: result.stdout,
                    time: result.time,
                    memory: result.memory,
                    tests: arr,
                    type
                })
            }  
            const answer = result.stdout.split('\n').filter( i=>i.length > 0 )
            if( ans.length !== answer.length ){
                if( type==='subtest') arr.push([ {subTest: i+1, tests: subResult}  ])
                else arr = subResult
                let wrongTest;
                if( type==='subtest') wrongTest = { subTest: arr.length, testNum: subResult?.length }
                else wrongTest = {testNum: arr.length}
                return res.json( {
                    accepted: false,
                    verdict: 'WRONG ANSWER',
                    wrongTestNumber: wrongTest,
                    wrongTestOutput: result.stdout, 
                    time: result.time,
                    memory: result.memory,
                    tests: arr,
                    type
                })
            }
            let ok = true
            answer.forEach((el, index) => {
                if(config[index] && true){
                    ok = el === ans[index]
                }
                else{
                    const q = el.split(' ').filter(p=>p.length > 0)
                    ok = q.length === ans[index].length
                    if(q.length === ans[index].length) 
                        ok = q.filter( (f, pq)=> f===ans[index][pq] ).length === ans[index].length
                }
            });
            
            if(!ok){
                if( type==='subtest') arr.push([ {subTest: i+1, tests: subResult}  ])
                else arr = subResult
                
                let wrongTest;
                
                if( type==='subtest') wrongTest = { 
                    subTest: arr.length, 
                    testNum: subResult?.length
                }
                else wrongTest = {testNum: arr.length}
                
                return res.json( {
                    accepted: false,
                    verdict: 'WRONG ANSWER',
                    type,

                    wrongTestNumber: wrongTest,
                    wrongTestOutput: result.stdout, 
                    
                    time: result.time,
                    memory: result.memory,
                    tests: arr
                })
                
            }

        }

        if( type==='subtest') arr.push([ {subTest: i+1, tests: subResult}  ])
        else arr = subResult
    }
    if(withTestFile){
        if(fs.existsSync(testFileInput)) 
            fs.rmSync(testFileInput)
        if(fs.existsSync(testFileOutput)) 
            fs.rmSync(testFileOutput)
                   
    }
    return res.json({
        accepted: true,
        verdict: 'ACCEPTED',
        time: result.time,
        memory: result.memory,            
        tests: arr,
        type
    })

})

app.all("*", (req,res)=>{
    res.json()
})

io.on('connection', async (socket)=>{
    console.log("connected")
    socket.on('disconnect', async ()=>{
        console.log('cykdym')
    })
})

httpServer.listen(process.env.PORT, ()=>{
    console.log(`Judge server listening ${process.env.PORT} port!`)
})