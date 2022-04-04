const express = require('express')
const passport = require('passport')
const controller = require('../controllers/traning')

const router = express.Router()

router.get('/', passport.authenticate('jwt', {session: false}), controller.getAll)
router.get('/:id', passport.authenticate('jwt', {session: false}), controller.getByTrainingId)
router.post('/', controller.creat)
router.put('/:id', passport.authenticate('jwt', {session: false}), controller.update)
router.delete('/:id', passport.authenticate('jwt', {session: false}),controller.remove)

module.exports = router