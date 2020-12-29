const express = require('express')
const router = express.Router()

const users = require('../controllers/users.controller')
const admin = require('../middlewares/admin')
const auth = require('../middlewares/auth')
const instructor = require('../middlewares/instructor')

router.post('/register', users.createUser)

router.post('/login', users.login)

router.get('/', [auth, admin,], users.getAllUsers)

router.get('/:id', (req, res) => {
    //
    message = 'You typed: ' + req.params.id
    res.send(message)
})

router.patch('/:id', (req, res) => {
    //
})

router.delete('/:id', (req, res) => {
    //
})

module.exports = router
