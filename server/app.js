const express = require('express')
const cors = require('cors')
const passport = require('passport')
const path = require('path')
const session = require('express-session')
const User = require("./models/UserModel");

const app = express();
// ,{
//     cors: {
//       origin: ['http://localhost:3009', 'http://localhost:3000']
//     }
// }
app.use(cors({
    origin:['http://localhost:3000'],
    credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use(session({
    secret:'my-secret',
    saveUninitialized: false,
    resave: true,
    rolling: true,

    // saveUninitialized:false,
    // resave: false
}));

app.use(passport.initialize());
app.use(passport.session());


passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    return done(null, user);
});

app.use('/uploads', express.static(path.join(__dirname,'uploads')))
app.use('/api/auth', require('./routes/authRoutes'))
app.use('/api/problem', require('./routes/problemRoutes'))
app.use('/api/section', require('./routes/sectionRoutes'))
app.use('/api/language', require('./routes/languagesRoutes'))
app.use('/api/submissions', require('./routes/submissionsRoute'))
app.use('/api/tags', require('./routes/tagRoutes'))
app.use('/api/judge', require('./routes/judgeRoutes'))
app.use('/api/contests', require('./routes/contestRouter'))
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/blogs', require('./routes/blogRoutes'))
app.use('/api/upload', require('./routes/uploadPhoto'))


app.use(require('./controller/errorHandler'))

app.all("*", (req, res)=>{
    res.status(404).json({
        message: 'Bu sahypa kesgitlenmedik'
    })
})


const httpServer = require("http").createServer(app);

const io = require("socket.io")(httpServer, {
    cors: {
        origin:['http://127.0.0.1:3009']
    }
});

io.on('connection', async (socket)=>{
    console.log("connected")
    socket.on('disconnect', async ()=>{
        
        console.log('cykdym')
    })
})


module.exports = httpServer