const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const passport = require('passport')
const authRoutes = require('./routes/auth')
const exercieRoutes = require('./routes/exercie')
const traningRoutes = require('./routes/traning')
const userRoutes = require('./routes/user')
const middlewarePassport = require('./middleware/passport')
const keys = require('./config')

mongoose.connect(keys.mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err))

const app = express();
const port = process.env.PORT || 3000;

app.use(passport.initialize())
middlewarePassport(passport)

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors('dev'))

app.listen(3000, () => console.log(`server port: ${port}`));