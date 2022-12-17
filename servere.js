const dotenv = require ('dotenv').config()
const express = require('express')
const app = express()
const connectDB = require('./config/dbConn')
const mongoose = require('mongoose')
const { logger, logEvents } = require('./middleware/logger')
const PORT = process.env.PORT || 3500
const path = require ('path')
// const { logger } = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const cors = require ('cors')
const corsOptions = require ('./config/corsOptions')

//middleware
app.use(logger)
app.use(cors(corsOptions))
app.use (express.json())
app.use(cookieParser)

app.use(express.static('public'))
app.use('/',require( './routes/Root'))
app.all('*',(req, res)=>{
    res.status(400)
    if (req.accepts('html')){
        res.sendFile(path.join(__dirname,'Views','404.html'))
        
    } else if (req.accepts('json')){
        res.send({message:" 404 Not found"})
        
    } else {
        res.type('text').send('404 not Found')
    }
})

app.use(errorHandler)

//listenning
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})

mongoose.connection.on('error', err => {
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})