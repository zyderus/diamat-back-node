// import express from 'express'
const bcrypt = require('bcrypt')
const cors = require('cors')
const express = require('express')
const app = express()
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
// app.use(express.static(__dirname + '/public'))
const knex = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'kupola77',
    database : 'smartbrain'
  }
});
const PORT = process.env.PORT || 3000

const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')
// knex.select().from('users').then(data => console.log(data))

app.get('/test', (req, res) => { res.json(req.body) })
app.get('/', (req, res) => { res.json('HOMEPAGE') })
app.post('/signin', (req, res) => { signin.handleSignin(req, res, knex, bcrypt) })
app.post('/register', (req, res) => { register.handleRegister(req, res, knex, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, knex) })
app.put('/image', (req, res) => { image.handleImage(req, res, knex) })
app.listen(PORT, () => console.log(`Server is on port ${PORT}`))

// const mongoose = require('mongoose');
// const MONGODB_URL = 'Your MongoDB URL';

// mongoose.connect(MONGODB_URL, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true
// });