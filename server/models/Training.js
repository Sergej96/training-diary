const { Schema, model } = require('mongoose')
const Exercise = require('./Exercise')

const trainingSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    exercises: [{
        type: Object,
        ref: 'Exercise'
    }],
    userId: {
        type: String,
        ref: 'User'
    }
})

module.exports = model('Trainings', trainingSchema)