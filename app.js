var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var appendDefaultData = require('./scripts/appendDefaultData.js');

var routes = require('./routes/index');
var flights = require('./routes/flights');

var app = express();

app.set('views', path.join(__dirname, 'bundles'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/', flights);

appendDefaultData();

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    if (res.status === 500) {
        res.send('error', {
            message: err.message,
            error: err
        });
    } else {
        next(err);
    }
});

module.exports = app;
