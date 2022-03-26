const express = require('express')
const controller = require('../controllers/traning')
const passport = require('passport')

const router = express.Router()

router.get('/', passport.authenticate('jwt', {session: false}), controller.getAll)
router.get('/:id', controller.getById)
router.post('/', controller.creat)
router.patch('/:id', controller.update)

module.exports = router