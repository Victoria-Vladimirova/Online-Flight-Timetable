var Flight = require('../models/flight.js');
var moment = require('moment');

function parseBody(body) {
    body.time = moment(body.time, 'hh:mm DD-MM-YY');
    body.actualTime = moment(body.actualTime, 'hh:mm DD-MM-YY');
    return body;
};

function serializeList(list) {
    return list.map(serializeItem);
};

function serializeItem(item) {
    item = item.toObject();
    item.time = item.time ? moment(item.time).format('hh:mm DD-MM-YY') : '';
    item.actualTime = item.actualTime ? moment(item.actualTime).format('hh:mm DD-MM-YY') : '';
    return item;
};

module.exports.list = function (req, res) {
    var query;

    if (req.query.departure === 'true') {
        query = Flight.where('from').eq('Екатеринбург')
            .where('to').eq(new RegExp(req.query.search, 'i'));
    } else {
        query = Flight.where('to').eq('Екатеринбург')
            .where('from').eq(new RegExp(req.query.search, 'i'));
    }

    if (req.query.status) {
        query = query.where('status').eq(req.query.status);
    }

    query.exec((err, flights) => {
        err ? console.err(err) : res.json(serializeList(flights));
    });
};

module.exports.add = function (req, res) {
    new Flight(parseBody(req.body)).save((err, data) => {
        err ? console.error(err) : res.json(serializeItem(data));
    });
};

module.exports.edit = function (req, res) {
    Flight.findByIdAndUpdate(req.params.id, parseBody(req.body), {new: true}, (err, data) => {
            err ? console.error(err) : res.json(serializeItem(data));
        });
};

module.exports.delete = function (req, res) {
    Flight.findById(req.params.id).remove((err, data) => {
        err ? console.error(err) : res.json({});
    });
};
