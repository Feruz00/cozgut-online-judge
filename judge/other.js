const shelljs = require('shelljs')
const path = require('path')
const fs = require('fs')

const start = async ()=>{

    // await shelljs.exec( `docker run -d -e PORT=4001 -p 4001:4001 -v ${path.join(__dirname,'judge.sh')}:/app/judge.sh  -v ${path.join(__dirname,'judge.js')}:/app/judge.js -v ${path.join(__dirname,'output.txt')}:/app/output.txt -v ${path.join(__dirname,'error.txt')}:/app/error.txt -v ${path.join(__dirname,'test.txt')}:/app/test.txt -v ${path.join(__dirname,'app.js')}:/app/app.js -v ${path.join(__dirname,'package.json')}:/app/package.json   judge-test:1.0.1` )
    // await shelljs.exec( `docker run -d -e PORT=4002 -p 4002:4002 -v ${path.join(__dirname,'judge.sh')}:/app/judge.sh  -v ${path.join(__dirname,'judge.js')}:/app/judge.js -v ${path.join(__dirname,'output.txt')}:/app/output.txt -v ${path.join(__dirname,'error.txt')}:/app/error.txt -v ${path.join(__dirname,'test.txt')}:/app/test.txt -v ${path.join(__dirname,'app.js')}:/app/app.js -v ${path.join(__dirname,'package.json')}:/app/package.json   judge-test:1.0.1` )
    await shelljs.exec( `docker run  -e PORT=3009 -p 3009:3009 -v ${path.join(__dirname,'judge.sh')}:/app/judge.sh  -v ${path.join(__dirname,'judge.js')}:/app/judge.js -v ${path.join(__dirname,'output.txt')}:/app/output.txt -v ${path.join(__dirname,'error.txt')}:/app/error.txt -v ${path.join(__dirname,'test.txt')}:/app/test.txt -v ${path.join(__dirname,'app.js')}:/app/app.js -v ${path.join(__dirname,'package.json')}:/app/package.json   judge-test:1.0.1` )

    // await shelljs.exec( `docker run -e PORT=3009 -p 3009:3009 -v ${path.join(__dirname,'judge.sh')}:/app/judge.sh  -v ${path.join(__dirname,'judge.js')}:/app/judge.js -v ${path.join(__dirname,'output.txt')}:/app/output.txt -v ${path.join(__dirname,'error.txt')}:/app/error.txt -v ${path.join(__dirname,'test.txt')}:/app/test.txt -v ${path.join(__dirname,'app.js')}:/app/app.js -v ${path.join(__dirname,'package.json')}:/app/package.json   judge-test:1.0.1` )

}

start()