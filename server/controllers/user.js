const User = require('../models/User')
const errorHandler = require("../utils/errorHandler")

module.exports.getById = async (req, res) => {
    try{
        const user = await User.findById(req.params.id)
        return res.status(200).json(user)
    }   
    catch(e){
        errorHandler(res, e)
    } 
}

module.exports.create = async (req, res) => {
    try{
        const user = await new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            weight: req.body.weight
        }).save()
        return res.status(200).json(user)
    }
    catch(e){
        errorHandler(res, e)
    }
}

module.exports.update = async (req, res) => {
    try{
        const user = await User.findByIdAndUpdate(
            {_id: req.params.id},
            {$set: req.body},
            {new: true}
        )
        return res.status(200).json(user)
    }
    catch(e){
        errorHandler(res, e)
    }
}

module.exports.remove = async (req, res) => {
    try{
        await User.remove({_id: req.params.id})
        return res.status(200).json({message: 'Deleted user'})
    }
    catch(e){
        errorHandler(res, e)
    }
}