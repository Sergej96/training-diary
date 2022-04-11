const { Schema } = require('mongoose')

const approacheShema = new Schema({
    weight: {
        type: Number
    },
    breakBeforeInSec: {
        type: String,
        default: 60
    },
    repeat: {
        type: Number
    }
})

module.exports = approacheShema
