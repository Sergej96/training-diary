const {Schema, model} = require('mongoose')

const approachesShema = new Schema({
    userId: {
        type: String,
        required: true
    },
    exerciesId: {
        type: String,
        required: true
    },
    weight: {
        type: Number
    },
    breakBeforeInSec: {
        type: Date
    },
    repeat: {
        type: Number,
        default: 60
    }
})

module.exports = model('Approaches', approachesShema)