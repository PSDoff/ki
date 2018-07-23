var five = require('johnny-five');
var board = new five.Board();
var db = require('./firebase');

board.on('ready', function() {
    var sensorLeft = new five.Sensor({
        pin: 2,
        type: "digital",
        freq: 1
    });

    var sensorRight = new five.Sensor({
        pin: 3,
        type: "digital",
        freq: 1
    });

    sensorLeft.on('change', function() {
        pour('left');
    });

    sensorRight.on('change', function() {
        pour('right');
    });
});

function pour(id) {
    tapRef = db.ref('taps/' + id + '/volume');
    tapRef.transaction(function(volume) {
        if (volume) {
            volume = volume - 1;
        }
        return volume;
    });
}

module.exports = board;