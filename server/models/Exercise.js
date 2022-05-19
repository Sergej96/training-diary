const { Schema, model } = require('mongoose')
const ApproacheShema = require('./Approache')
const ExerciseInfo = require('./ExerciseInfo')

const exerciesShema = new Schema({
    exerciseId: {
        type: String,
        required: true
    },
    info: {
        type: Object,
        ref: ExerciseInfo
    },
    approaches: [ApproacheShema]

})

module.exports = model('Exercises', exerciesShema)