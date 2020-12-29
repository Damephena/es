require('dotenv').config()

const _ = require('lodash')
const customId = require('custom-id')
const bcrypt = require('bcrypt')

const { User, UserProfile } = require('../models/user')

exports.createUser = async (req, res) => {
    let existingUser = await User.findOne({  email: req.body.email })
    if (existingUser) return res.status(400).send({'detail': 'User with email already exists'})

    currentYear = new Date().getFullYear()
    esslyId = 'ESSLY'+ currentYear.toString() + customId({
        email: req.body.email,
        firstName: req.body.firstName
    })

    const user = new User({
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userType: req.body.userType || 'user',
        esslyId: esslyId
    })
    const salt = await bcrypt.genSalt(12)
    user.password = await bcrypt.hash(user.password, salt)

    // create empty user profile
    // const userProfile = new UserProfile({
    //     user: user._id
    // })

    user.save()
    .then(data => {

        data = _.pick(data, [
            '_id',
            'firstName',
            'lastName',
            'email',
            'userType',
            'isVerified',
            'esslyId'
        ])
        // data['profile'] = userProfile
        const token = user.generateAuthToken()
        data['access'] = token
        res.status(201)
        // .header('x-auth-token', token)
        .send(data)
    }).catch(err => {
        res.status(500).send({
            detail: err.message
        })
    })
}

exports.login = async (req, res) => {
    let user = await User.findOne({ email: req.body.email })

    if (!user) return res.status(400).send({
        'detail': 'Invalid email address.'
    })

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(400).send({
        'detail': 'Invalid password'
    })
    // 
    const token = user.generateAuthToken()
    res.send({'access': token})
}

exports.getAllUsers = (req, res) => {
    res.status(200).send('Yay, Admin!')
    // const payload = req.decoded
    // // if (payload && payload.user.isAdmin()){
    // if (payload && payload.isInstructor){
    //     res.status(200).send('Yaaay, Admin!')
    // } else {
    //     res.status(401).send('Not Admin ooo')
    // }
}
