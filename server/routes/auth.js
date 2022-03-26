const express = require('express')
const controller = require('../controllers/auth')
const {check} = require('express-validator')

const router = express.Router()

router.post('/login', controller.login)
router.post('/register', 
    check('email', "Имя пользователя не должно быть пустым").notEmpty(),
    check('password',"Password is too short - should be 8 charts minimum").isLength({min:8}),
    controller.register
    )



module.exports = router