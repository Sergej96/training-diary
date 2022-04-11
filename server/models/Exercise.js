const { Schema, model } = require('mongoose')
const ApproachesShema = require('./Approaches')

const exerciesShema = new Schema({
    exerciseId: {
        type: String,
        required: true
    },
    order: {
        type: Number,
        default: 0
    },
    approaches: [ApproachesShema],

})

module.exports = model('Exercises', exerciesShema)