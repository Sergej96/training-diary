const express = require('express')
const passport = require('passport')
const controller = require('../controllers/traning')

const router = express.Router()

router.get('/user/:userId', passport.authenticate('jwt', { session: false }), controller.getByUserTraining)
router.post('/', passport.authenticate('jwt', { session: false }), controller.creat)
router.put('/:id', passport.authenticate('jwt', { session: false }), controller.update)
router.delete('/:id', passport.authenticate('jwt', { session: false }), controller.remove)

module.exports = router