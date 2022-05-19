const express = require('express')
const passport = require('passport')
const controller = require('../controllers/traning')

const router = express.Router()

router.get('/user/', passport.authenticate('jwt', { session: false }), controller.getByUserTraining)
router.get('/user/:userId', passport.authenticate('jwt', { session: false }), controller.getByUserTraining)
router.post('/', passport.authenticate('jwt', { session: false }), controller.save)

module.exports = router