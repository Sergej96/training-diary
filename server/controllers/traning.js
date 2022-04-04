const Approaches = require('../models/Approache')
const Training = require('../models/Training')
const Approache = require('../models/Approache')
const errorHandler = require("../utils/errorHandler")

module.exports.getAll = async (req, res) => {
    try{
        const trainings = await Training.find({userId: req.user.id})
        return res.status(200).json(trainings)
    }
    catch(e){
        errorHandler(res, e)
    }

}

module.exports.getByTrainingId = async (req, res) => {
    try{
        const training = await Training.findById(req.params.id)
        return res.status(200).json(training)
    }
    catch(e){
        errorHandler(res, e)
    }
}

module.exports.creat = async (req, res) => {
    try{
        const approaches = req.body.approaches
        const approachesId = []
        for(let i = 0; i < approaches.length; i++) {
            let approache = await new Approaches({
                trainingId: approaches[i].trainingId,
                exerciesId: approaches[i].exerciesId,
                weight: approaches[i].weight,
                breakBeforeInSec: approaches[i].breakBeforeInSec,
                repeat: approaches[i].repeat
            }).save()
            approachesId.push(approache._id)  
        }

        const training = await new Training({
            userId: req.body.userId,
            date: req.body.date,
            approaches: approachesId
        }).save()
        return res.status(200).json(training)
    }
    catch(e){
        errorHandler(res, e)
    }
    
}

module.exports.update = async (req, res) => {

    try{
        const training = await Training.findOneAndUpdate(
            {_id: req.params.id},
            {$set: req.body},
            {new: true}//дождётся когда измениеня запишутся в БД
        )
        return res.status(200).json(training)
    }
    catch(e){
        errorHandler(res, e)
    }
    
}

module.exports.remove = async (req, res) => {
    try{
        await Training.remove({_id: req.params.id})
        await Approache.remove({trainingId: req.params.id})
        return res.status(200).json({message: 'Deleted training'})
    }
    catch(e){
        errorHandler(res, e)
    }
}