var db = require('./firebase');

var kegsRef = db.ref('kegs');
var tapsRef = db.ref('taps');

kegsRef.on("child_changed", function(snap) {

});

tapsRef.on("child_changed", function(snap) {
    io.emit('update volume', {
        key: snap.key,
        tap: snap.val(),
    });
});