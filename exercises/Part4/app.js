const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

mongoose.connect(config.MONGODB_URL)
    .then(()=>{
        console.log('Connected to: ', config.MONGODB_URL)
    })
    .catch(err =>{
        console.log('Error happened', err)
    })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

app.use('/api/blogs', blogsRouter)

module.exports  = app;