const Exercise = require("../models/Exercise")
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
        const exercises = await ExerciseInfo.find({ muscles: req.params.id })
        return res.status(200).json(exercises)
    }
    catch (e) {
        errorHandler(res, e)
    }
}

module.exports.searchExercise = async (req, res) => {
    try {
        if(!req.params.name){
            this.getAll()
        }
        const reg = new RegExp(req.params.name,'i')
        const exercises = await ExerciseInfo.find({ name: reg })
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
            { _id: req.params.id },
            { $set: req.body },
            { new: true }
        )
        return res.status(200).json(exercise)
    }
    catch (e) {
        errorHandler(res, e)
    }
}

module.exports.remove = async (req, res) => {
    try {
        const condadite = await Exercise.find({exerciseId: req.params.id})
        if(condadite.length != 0){
            return res.status(500).json({message: `Упражнение нельзя удалить, так как оно используется`})
        }
        await ExerciseInfo.remove({ _id: req.params.id })
        return res.status(200).json({ message: 'Упражнение удалено' })
    }
    catch (e) {
        errorHandler(res, e)
    }
}

module.exports.getCountExercise = async (req, res) => {
    try {
        const count = await ExerciseInfo.count()
        return res.status(200).json(count)
    }
    catch (e) {
        errorHandler(res, e)
    }
}

