const ExerciseInfo = require("../models/ExerciseInfo")
const errorHandler = require("../utils/errorHandler")

module.exports.getAll = async (req, res) => {
    try {
        const exercises = await ExerciseInfo.find()
        return res.status(200).json(exercises)
    }
    catch (e) {
        errorHandler(res, e)
    }

}

module.exports.getById = async (req, res) => {
    try {
        const exercise = await ExerciseInfo.findById(req.params.id)
        return res.status(200).json(exercise)
    }
    catch (e) {
        errorHandler(res, e)
    }
}

module.exports.getByMuscle = async (req, res) => {
    try {
        const exercises = await ExerciseInfo.find({muscles: req.params.id})
        return res.status(200).json(exercises)
    }
    catch (e) {
        errorHandler(res, e)
    }
}

module.exports.create = async (req, res) => {
    try { 
        const exercise = new ExerciseInfo(req.body)
        await exercise.save()
        return res.status(201).json(exercise)
    }
    catch (e) {
        errorHandler(res, e)
    }
}

module.exports.update = async (req, res) => {
    try { 
        const exercise = await ExerciseInfo.findOneAndUpdate(
            {_id: req.params.id},
            {$set: req.body},
            {new: true}
        )
        return res.status(200).json(exercise)
    }
    catch (e) {
        errorHandler(res, e)
    }
}

module.exports.remove = async (req, res) => {
    try { 
        await ExerciseInfo.remove({_id: req.params.id})
        return res.status(200).json({message:'Упражнение удалено'})
    }
    catch (e) {
        errorHandler(res, e)
    }
}