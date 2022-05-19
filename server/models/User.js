const { Schema, model } = require('mongoose')
const validator = require('../utils/validators')

const userShema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: 'is not valid'
        }
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: validator.isPassword,
            message: '{VALUE} is not valid'
        }
    },
    trainings: [{
        type: String
    }],
    role: {
        type: String,
        ref: 'Role'
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    birthdate: {
        type: Date
    },
    weight: {
        type: Number
    }
})

module.exports = model('Users', userShema)