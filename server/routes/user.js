const express = require('express')
const passport = require('passport')
const controller = require('../controllers/user')

const router = express.Router()

router.get('/all', passport.authenticate('jwt', { session: false }), controller.getAllUsers)
router.get('/count', passport.authenticate('jwt', { session: false }), controller.countUser)
router.get('/info', passport.authenticate('jwt', { session: false }), controller.getUserInfo)
router.get('/:id', passport.authenticate('jwt', { session: false }), controller.getById)
router.post('/:id', passport.authenticate('jwt', { session: false }), controller.create)
router.patch('/:id', passport.authenticate('jwt', { session: false }), controller.update)
router.delete('/:id', passport.authenticate('jwt', { session: false }), controller.remove)

module.exports = router