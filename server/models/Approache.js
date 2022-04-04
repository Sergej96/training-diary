const {Schema, model} = require('mongoose')

const approachesShema = new Schema({
    trainingId: {
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
        type: Date,
        default: 60
    },
    repeat: {
        type: Number
    }
})

module.exports = model('Approaches', approachesShema)