const mongoose = require('mongoose')
const countryList = require('../utils/countries')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true,
        minlength: 2,
        lowercase: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        minlength: 2,
        lowercase: true,
        trim: true
    },
    userType: {
        type: String,
        enum: ['student', 'instructor', 'admin'],
        default: 'student'
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    },
    esslyId: String,
}, {
    timestamps: true
})

const userProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    phoneNumber: {
        type: Number,
        required: false,
        min: 5
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: true
    },
    country: {
        type: String,
        enum: countryList,
        required: false
    },
    aboutMe: {
        type: String,
        required: false
    },
    registrationNumber: {
        type: Number,
        required: false
    },
    profilePhoto: String
}, {
    timestamps: true
})

userSchema.methods.generateAuthToken = function() {
    const options = {
        expiresIn: '1d',
        issuer: 'essly-auth'
    }
    const token = jwt.sign({
        _id: this._id,
        userType: this.userType,
    }, process.env.JWT_PRIVATE_KEY, options)

    return token
}

const User = mongoose.model('User', userSchema)
const UserProfile = mongoose.model('UserProfile', userProfileSchema)

module.exports = { User, UserProfile}
