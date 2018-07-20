const express = require('express');
const app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var base = require("firebase-admin");
var five = require('johnny-five');

// FIREBASE
var serviceAccount = require("./serviceAccountKey.json");

base.initializeApp({
  credential: base.credential.cert(serviceAccount),
  databaseURL: "https://keg-intelligence.firebaseio.com"
});

var db = base.database();
var tapsRef = db.ref('taps');

// INITIALIZE EXPRESS AND SOCKET.IO

app.use("/assets", express.static(__dirname + '/assets'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    initializeTaps();
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});

function initializeTaps() {
    initializeTap('left');
    initializeTap('right');
}

function initializeTap(key) {
    tapsRef.once("value").then(function(tapSnapshot) {
        var tapRef = tapSnapshot.child(key);
        var kegRef = db.ref('kegs/' + tapRef.child('keg').val());
        kegRef.once("value").then(function(kegSnapshot){
            var tappedKeg = kegSnapshot.val();
            tap = {
                id: key,
                keg: tappedKeg,
                volume: tapRef.child('volume').val(),
            };
            io.emit('initialize', tap);
        });
    });
}

// JOHNNY-FIVE INITIALIZE AND LISTEN
var board = new five.Board();

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
        pourBeer('left');
    });

    sensorRight.on('change', function() {
        pourBeer('right');
    });
});

function pourBeer(id) {
    tapRef = db.ref('taps/' + id + '/volume');
    tapRef.transaction(function(volume) {
        if (volume) {
            volume = volume - 1;
            io.emit('pour', {id, volume});
        }
        return volume;
    });
}
