const express = require('express')
const jwt = require('jsonwebtoken')
const authMiddleware = require('./middlewares/authMiddlware')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const mockUser = {
    id: 1,
    email: 'a@a.com',
    password: 'password',
}

const dummySecretKeyReplaceLater = '12345'

app.post('/login', (req, res) => {
    // 1. TODO validate login body

    // After sucessful login
    const token = jwt.sign(mockUser, dummySecretKeyReplaceLater)

    res.send(token)
})

app.get('/me', authMiddleware ,(req, res) => {
    res.send(req.auth)
})

app.listen('5002', () => console.log('Listening on port: 5002'))