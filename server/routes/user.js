const express = require('express')
const controller = require('../controllers/user')

const router = express.Router()

router.get('/:id', controller.getById)
router.post('/:id', controller.create)
router.patch('/:id', controller.update)
router.delete('/:id', controller.remove)

module.exports = router