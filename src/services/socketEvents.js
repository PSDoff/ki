var db = require('./firebase').db;

var tapsRef = db.ref('taps');

tapsRef.on("child_changed", function(snap) {
    io.emit('update volume', {
        key: snap.key,
        tap: snap.val(),
    });
});