const express = require('express')
const app = express()
const PORT = process.env.PORT || 3500
const path = require ('path')
 
app.use('/',express.static(path.join(__dirname,'public')))
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

app.listen(PORT,()=>{
    console.log('server is listening on port :'+ PORT)
})

