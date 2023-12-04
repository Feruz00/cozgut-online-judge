require('dotenv').config();
const mongoose = require('mongoose');
const server = require('./app');
const chechkJudgeServers = require('./service/checkJudgeServers');

const PORT = process.env.PORT || 3005
const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/cozgut-backend"

mongoose.set('strictQuery', false);
mongoose.connect(
    MONGO_URL ,{
        useNewUrlParser: true,
        useUnifiedTopology: true
      }    
    ).then( ()=>{
    console.log('connected database')
    chechkJudgeServers()
    server.listen(PORT, ()=>{
        console.log(`Server listened on port ${PORT}`)
    })
} );


