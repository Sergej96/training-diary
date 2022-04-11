const Training = require('../models/Training')
const Exercise = require('../models/Exercise')
const errorHandler = require("../utils/errorHandler")


function checkRoleAdmin(req) {
    return req.user.role == 'ADMIN'
}

module.exports.getByUserTraining = async (req, res) => {
    try {

        const trainings = await Training.find({ userId: req.params.userId })
        console.log(111111111111111111111)

        console.log(trainings)
        for (let i = 0; i < trainings.length; i++) {
            for (let j = 0; j < trainings[i].exercises.length; j++) {
                console.log(333333333333333333333333333)
                console.log(trainings)
                trainings[i].exercises[j] = await Exercise.find({_id:trainings[i].exercises[j]})
            }
        }
        console.log(2222222222222222222)
        console.log(trainings)

        return res.status(200).json(trainings)
    }
    catch (e) {
        errorHandler(res, e)
    }
}

module.exports.creat = async (req, res) => {
    try {
        if (checkRoleAdmin(req)) {

            const dataTrainings = req.body.trainings
            const trainingsId = []

            for (let i = 0; i < dataTrainings.length; i++) {
                const exercises = []
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

            return res.status(200).json({ message: 'Тренировки сосзданы' })
        }
        return res.status(403).json({ message: 'У вас нет прав для создания тренировки' })
    }
    catch (e) {
        errorHandler(res, e)
    }

}

module.exports.update = async (req, res) => {

    try {
        if (checkRoleAdmin(req)) {

            const dataTrainings = req.body.trainings
            for (let i = 0; i < dataTrainings.length; i++) {
                const exercisesId = []
                console.log(12222);
                for (let j = 0; j < dataTrainings[i].exercises.length; j++) {
                    console.log(444);
                    let exercise = await Exercise.findOneAndUpdate(
                        { _id: dataTrainings[i].exercises[j]._id },
                        { $set: dataTrainings[i].exercises[j] },
                        { new: true }
                    )
                }

            }
            // const training = await Training.findOneAndUpdate(
            //     { userId: req.params.id },
            //     { $set: req.body },
            //     { new: true }//дождётся когда измениеня запишутся в БД
            // )
            return res.status(200).json({message: 'updated'})
        }

        return res.status(403).json({ message: 'У вас нет прав на изменения страницы' })
    }
    catch (e) {
        errorHandler(res, e)
    }

}

module.exports.remove = async (req, res) => {
    try {
        if (checkRoleAdmin(req)) {
            // const dataTrainings = req.body.trainings
            // for(let i =0; i< dataTrainings.length; i++){
            //     for(let j = 0; j<dataTrainings[i].exercises.length; j++){
            //         await Exercise.remove(trainingId: dataTrainings[i]._id)
            //     }
            // }
            const exerciseIds = await Training.findOneAndRemove({ _id: req.params.id })
            for (let i = 0; i < exerciseIds.exercises.length; i++) {
                await Exercise.remove({ _id: exerciseIds.exercises[i] })

            }
            //await Training.remove({ _id: req.params.id })
            return res.status(200).json(exerciseIds)
        }

        return res.status(403).json({ message: 'У вас нет прав на удаление страницы' })
    }
    catch (e) {
        errorHandler(res, e)
    }
}