const {Schema, model} = require('mongoose')

const trainingSchema = new Schema({
    userId:{
        type: String,
        ref: 'User'
    },
    date: {
        type: Date,
        required: true
    },
    approaches:[{
        type: String,
        ref: 'Approaches'
    }]
    
})

module.exports = model('Training', trainingSchema)