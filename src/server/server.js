const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const dotenv = require('dotenv')

const app = express()
const port = 3000

dotenv.config();
app.use(bodyParser.json());
app.use(bodyParser.text());

app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:8080']
}))

app.use(express.static(path.resolve('dist')))

app.get('/', function(req, res){
    res.sendFile(path.resolve('dist/index.html'))
})

app.get('/MCk', function(req,res){
    res.send(process.env.MC_KEY)
})

app.listen(port, function(){
    console.log(`Server is listening on port ${port}`)
})