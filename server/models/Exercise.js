const { Schema, model } = require('mongoose')
const ApproacheShema = require('./Approache')

const exerciesShema = new Schema({
    exerciseId: {
        type: String,
        required: true
    },
    order: {
        type: Number,
        default: 0
    },
    approaches: [ApproacheShema],

})

module.exports = model('Exercises', exerciesShema)