var express = require('express');
var router = express.Router();
var SerialPort = require('serialport');
var port = new SerialPort('/dev/cu.wchusbserial1440', {
    baudRate: 112500
});

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Keg Intelligentsia' });
});

setInterval(function() {
    port.write('/');
}, 1000);

// Switches the port into "flowing mode"
port.on('data', function (data) {
  console.log(data.toString('hex'));
});

// Open errors will be emitted as an error event
port.on('error', function(err) {
  console.log('Error: ', err.message);
})

module.exports = router, port;
