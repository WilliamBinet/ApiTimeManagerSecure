const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const csurf = require('csurf');
const cors = require('cors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const workingTimesRouter = require('./routes/workingtimes');
const clocksRouter = require('./routes/clocks');
const teamsRouter = require('./routes/teams');

const app = express();
const csrfProtection = csurf({cookie: true});
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
 //app.use(csrfProtection);
var corsOptions = {
    exposedHeaders : ['Authorization']
};
app.use(cors(corsOptions));


    app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.use('/', indexRouter);
app.use('/workingtimes', workingTimesRouter);
app.use('/users', usersRouter);
app.use('/clocks', clocksRouter);
app.use('/teams', teamsRouter);


module.exports = app;
