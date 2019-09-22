var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var csurf = require('csurf');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var workingTimesRouter = require('./routes/workingtimes');
var clocksRouter = require('./routes/clocks');
var teamsRouter = require('./routes/teams');

var app = express();
 var csrfProtection = csurf({ cookie: true });
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
 //app.use(csrfProtection);

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use((req, res, next) => {
 res.header('Access-Control-Allow-Origin', '*');
 res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
 res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST, OPTION');
 next();
});

app.use('/', indexRouter);
app.use('/workingtimes', workingTimesRouter);
app.use('/users', usersRouter);
app.use('/clocks', clocksRouter);
app.use('/teams', teamsRouter);


module.exports = app;
