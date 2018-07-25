var express = require('express');
var fileUpload = require('express-fileupload');
var path = require('path');
global.imageUploadFolder = path.join(__dirname, 'assets/images/posters');

require('./services/flow');
require('./services/socketEvents');

var app = express();

app.use(fileUpload({
    limits: { 
        fileSize: 10 * 1024 * 1024 * 1024,
        files: 1,
    }
}));

app.use(express.urlencoded({ extended: false }));

var http = require('http').Server(app);
global.io = require('socket.io')(http);

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

var indexRouter = require('./routes/index');
var tapsRouter = require('./routes/taps');
var adminRouter = require('./routes/admin');

app.use('/', indexRouter);
app.use('/taps', tapsRouter);
app.use('/admin', adminRouter);
app.use("/assets", express.static(path.join(__dirname, 'assets')));

io.on('connection', function(socket){
    console.log('user connected');
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});
