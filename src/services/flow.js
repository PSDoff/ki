var five = require('johnny-five');
var board = new five.Board();
var db = require('./firebase').db;

var pourModel = require('../models/pour');
var currentPours = {
    'left': { 'volume': 0, 'previousVolume': 0 },
    'right': { 'volume': 0, 'previousVolume': 0 }
};

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
    
    setTimeout(function() {
        sensorLeft.on('change', function() {
            pour('left', 1);
        });
    
        sensorRight.on('change', function() {
            pour('right', 1);
        });
    }, 2000);
});

board.on('info', function(event) {
    console.log("%s sent an 'info' message: %s", event.class, event.message);
});

board.on('fail', function(event) {
    console.log("%s sent an 'warn' message: %s", event.class, event.message);
});

board.on('warn', function(event) {
    console.log("%s sent an 'fail' message: %s", event.class, event.message);
});

board.on('exit', function(event) {
    console.log("Board exited for some reason.");
});

board.on('connect', function(event) {
    console.log("Board connected.");
})

function pour(tap, volume) {
    if (!config.maintenanceMode) {
        updateTap(tap, volume);
        updatePour(tap, volume);
    }
}

function updateTap(tap, quantity) {
    tapRef = db.ref(`taps/${tap}`);
    
    tapRef.child('volume').transaction(function(volume) {
        if (volume) {
            volume = volume - quantity;
        }
        return volume;
    });
}

function firePouringEvent(tap) {
    io.emit('pouring', {
        tap: tap,
        volume: currentPours[tap].volume
    });
}

function fireNotPouringEvent(key) {
    io.emit('not pouring', {
        tap: key
    });
}

function firePouringCompleteEvent(pour, key) {
    io.emit('pouring complete', {
        tap: key,
        volume: pour.volume
    });
}

function updatePour(tap, volume) {
    currentPours[tap].volume += volume;
}

function checkForCompletePours() {
    Object.keys(currentPours).forEach(function(key) {
        var pour = currentPours[key];
        
        if (pour.volume == 0) {
            fireNotPouringEvent(key);
            return;
        } else if (pour.volume > pour.previousVolume) {
            validatePour(key, pour);
            pour.previousVolume = pour.volume;
        } else {
            var clonedPour = Object.assign({}, pour);
            firePouringCompleteEvent(clonedPour, key);
            currentPours[key] = { 'volume': 0, 'previousVolume': 0 };
            pourModel.create(clonedPour, key);
        }
    });
}

function validatePour(key, pour) {
    // It's possible that a drip may come through the line, or there may be electrical interference.
    // We check if the flow is sufficient enough to be considered a real pour to get around this.
    if (pour.previousVolume + 10 < pour.volume) {
        firePouringEvent(key);
    } 
}

setInterval(checkForCompletePours, config.pourFinishingFrequency);

function testPours() {
    if (config.testMode) {
        pour('left', 1);
        pour('right', 1);
    }
}

setInterval(testPours, 100);