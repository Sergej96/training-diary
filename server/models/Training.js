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
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = model('Trainings', trainingSchema)