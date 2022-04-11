const { Schema } = require('mongoose')

const approachesShema = new Schema({
    weight: {
        type: Number
    },
    breakBeforeInSec: {
        type: Date,
        default: 60
    },
    repeat: {
        type: Number
    }
})

module.exports = approachesShema
