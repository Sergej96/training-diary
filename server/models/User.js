const { Schema, model } = require('mongoose')

const userShema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    roles: [{
        type: String,
        ref: 'Role'
    }],
    firsName: {
        type: String
    },
    lastName: {
        type: String
    },
    weight: {
        type: Number
    }
})

module.exports = model('Users', userShema)