const express = require('express')
const passport = require('passport')
const controller = require('../controllers/exercise')

const router = express.Router()

router.get('/', passport.authenticate('jwt', { session: false }), controller.getAll)
router.get('/muscle/:id', passport.authenticate('jwt', {session: false}), controller.getByMuscle)
router.get('/:id', passport.authenticate('jwt', { session: false }), controller.getById)
router.post('/', passport.authenticate('jwt', { session: false }), controller.create)
router.patch('/:id', passport.authenticate('jwt', { session: false }), controller.update)
router.delete('/:id', passport.authenticate('jwt', { session: false }), controller.remove)

module.exports = router