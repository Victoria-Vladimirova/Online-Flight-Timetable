var express = require('express');
var router = express.Router();
var flightControllers = require('../controllers/flights.js');

router.get('/flights', flightControllers.list);
router.post('/flights', flightControllers.add);
router.put('/flights/:id', flightControllers.edit);
router.delete('/flights/:id', flightControllers.delete);

module.exports = router;
