const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Role = require('../models/Role')
const keys = require('../config')
const errorHandler = require('../utils/errorHandler')

module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const candidate = await User.findOne({ email: email })

        if (candidate) {
            const passwordResult = bcrypt.compareSync(password, candidate.password)
            if (passwordResult) {
                const token = jwt.sign({
                    email: candidate.email,
                    userId: candidate._id
                }, keys.jwt, { expiresIn: '24h' });
                return res.status(200).json({
                    token: `Bearer ${token}`,
                    role: candidate.role
                })
            }
            else {
                return res.status(401).json({ message: 'Пароль не верный' })
            }
        }
        else {
            return res.status(404).json({ message: 'Пользователь не найден' })
        }
    }
    catch (e) {
        errorHandler(res, e)
    }
}

module.exports.register = async (req, res) => {
    try {

        const { email, password, firstName, lastName, birthdate } = req.body;

        const candidate = await User.findOne({ email: email })

        if (candidate) {
            return res.status(409).json({ message: 'Пользователь уже существует' })
        }
        else {
            const hashPassword = bcrypt.hashSync(password, 7)
            const userRole = await Role.findOne({ value: "USER" })
            const user = await new User({
                email,
                password: hashPassword,
                role: userRole.value,
                firstName,
                lastName,
                birthdate
            })
            await user.save()
            return res.status(201).json({ message: "Пользователь зарегистрирован" })
        }
    }
    catch (e) {
        errorHandler(res, e)
    }
}

const validate = (regexp, str) => {
    return regexp.test(str)
}
