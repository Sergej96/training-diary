const { Schema, model } = require('mongoose')

const schemaRole = new Schema({
    value: {
        type: String,
        unique: true,
        default: 'USER'
    }
})

module.exports = model('Role', schemaRole)