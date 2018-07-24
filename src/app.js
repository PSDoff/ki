var express = require('express');
var path = require('path');

require('./services/flow');
require('./services/socketEvents');

var app = express();

var http = require('http').Server(app);
global.io = require('socket.io')(http);

app.use("assets", express.static(__dirname + '/assets'));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

var indexRouter = require('./routes/index');
var tapsRouter = require('./routes/taps');
var adminRouter = require('./routes/admin');

app.use('/', indexRouter);
app.use('/taps', tapsRouter);
app.use('/admin', adminRouter);

io.on('connection', function(socket){
    console.log('user connected');
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});
