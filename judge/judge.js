const path = require('path');
const fs = require('fs')
const shelljs = require('shelljs');


let second = 'error.txt'
let third = 'output.txt'

const judge = async (first, four, mem, filename, withTestFile, five, testFileOutput)=>{
    
    if( withTestFile ){
        third = testFileOutput
    }
    console.log("outputFile:", third)
    fs.closeSync(fs.openSync(`${__dirname}/${third}`,"w"))
    fs.closeSync(fs.openSync(`${__dirname}/error.txt`,"w"))
    
    console.log(fs.readFileSync(`${__dirname}/${third}`).toString())

    await shelljs.exec(`sh judge.sh ${first} ${second} ${third} ${four} ${five} `)
    
    const errorFile = fs.readFileSync(`${__dirname}/error.txt`, 'utf-8')
    const outputFile = fs.readFileSync(`${__dirname}/${third}`).toString()
    
    console.log("output by file", outputFile, errorFile)

    if(!outputFile.length){

        const errors = errorFile.split('\n')
        
        if(errors.includes('RUNTIME ERROR')){
            const [time, memory] = errors[1].split(' ').map(i=>i*1.00001)
            // const diffM = memory - initMemory[getItem(first)-1]
            if(time-four>=0) return { 
                status: false, 
                message:"TIME LIMIT",
                time, 
                memory,
                stdout: outputFile, 
            }
            // console.log("TIME LIMIT")
            else  if( memory - mem*1024 >=0 ) 
                return {
                    status: false, 
                    message:"MEMORY LIMIT",
                    time, 
                    memory,
                    stdout: outputFile, 
                }
            else 
                return { 
                    status: false, 
                    message:"RUNTIME ERROR",
                    time, 
                    memory,
                    stdout: outputFile, 
                }
        }
        else{
            const err = errors.map(i=>i.split(`${filename}:`))
            let t1=[]
            for(let i=0;i<err.length;i++){
                if(err[i][0]==='COMPILATION ERROR') break;
                if( err[i].length===2 ) t1.push(err[i][1])
                else t1.push(err[i][0])
            } 
            return {
                    status: false, 
                    message: "COMPILATION ERROR", 
                    stdout: t1,
                    time: 0,
                    memory:0
                }

        }
    }
    const errs = errorFile.split('\n')[0].split(' ')
    
    const time = errs[0] * 1.00001;
    const memory = errs[1]*1

    if(time-four>=0) 
        return { 
                status: false, 
                message:"TIME LIMIT", 
                time, 
                memory,
                stdout: outputFile, 
            }
    else  if( memory - mem*1024 >=0 ) 
            return { 
                    status: false, 
                    message:"MEMORY LIMIT", 
                    time, 
                    memory,
                    stdout: outputFile, 
                }

    return {
        status: true, 
        stdout: outputFile, 
        time, 
        memory
    }
}

// judge('cpp', 1, 16, 'solution.cpp')

module.exports = judge