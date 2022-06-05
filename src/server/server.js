const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const path = require('path')

const port = 3000

app.use(bodyParser.json());
app.use(cors())

// app.use(express.static('./src/client'))

app.get('/', function(req, res){
    res.sendFile(path.resolve('src/client/views/index.html'))
})

app.listen(port, function(){
    console.log(`Server is listening on port ${port}`)
})