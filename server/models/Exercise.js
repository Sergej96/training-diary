const { Schema, model } = require('mongoose')
const ApproacheShema = require('./Approache')

const exerciesShema = new Schema({
    exerciseId: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    approaches: [ApproacheShema],

})

module.exports = model('Exercises', exerciesShema)