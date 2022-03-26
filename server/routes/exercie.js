const express = require('express')
const controller = require('../controllers/exercie')

const router = express.Router()

router.get('/:id', controller.getById)
router.get('/', controller.getAll)

module.exports = router