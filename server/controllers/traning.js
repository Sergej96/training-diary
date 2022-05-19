const Training = require('../models/Training')
const Exercise = require('../models/Exercise')
const ExerciseInfo = require('../models/ExerciseInfo')
const errorHandler = require("../utils/errorHandler")


module.exports.getByUserTraining = async (req, res) => {
    try {
        const userId = checkRoleAdmin(req) ? req.params.userId : req.user.id
        const trainings = await Training.find({ userId: userId })

        for (let i = 0; i < trainings.length; i++) {
            for (let j = 0; j < trainings[i].exercises.length; j++) {
                trainings[i].exercises[j] = await Exercise.findOne({_id:trainings[i].exercises[j]})
                trainings[i].exercises[j].info = await ExerciseInfo.findOne({_id:trainings[i].exercises[j].exerciseId})
            }
        }
        return res.status(200).json(trainings) 
    }
    catch (e) {
        errorHandler(res, e)
    }
}

module.exports.save = async (req, res) => {
    try {
        if (checkRoleAdmin(req)) {

            const dataTrainings = req.body.trainings
            const trainingsId = []
            remove(req.body.userId)

            for (let i = 0; i < dataTrainings.length; i++) {
                const exercises = []
                if (dataTrainings[i].exercises.length == 0) continue;

                for (let j = 0; j < dataTrainings[i].exercises.length; j++) {
                    let exercise = await new Exercise(dataTrainings[i].exercises[j]).save()
                    exercises.push(exercise._id)
                }
                let training = await new Training({
                    date: dataTrainings[i].date,
                    userId: req.body.userId,
                    exercises: exercises
                }).save()
                trainingsId.push(training._id)
            }

            return res.status(200).json({ message: 'Изменения внеснены' })
        }
        return res.status(403).json({ message: 'У вас нет прав для создания тренировки' })
    }
    catch (e) {
        errorHandler(res, e)
    }

}

remove = async (userId) => {
    try {
        const trainings = await Training.find({ userId: userId })
        for (let i = 0; i < trainings.length; i++) {
            const training = await Training.deleteMany({ userId: userId })
            for (let j = 0; j < training.exercises.length; j++) {
                await Exercise.remove({ _id: training.exercises[i] })

            }
        }
        return res.status(200).json(exerciseIds)
    }

    catch (e) {
        console.log(e);
    }
}

checkRoleAdmin = (req) => {
    return req.user.role == 'ADMIN'
}