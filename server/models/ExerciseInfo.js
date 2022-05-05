 const { Schema, model } = require('mongoose')

const exerciesInfoShema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    technique: {
        tyype: String
    },
    recomend: {
        type: String
    },
    muscles: [{
        type: Number,
        required: true
    }]
})

module.exports = model('ExerciseInfo', exerciesInfoShema)