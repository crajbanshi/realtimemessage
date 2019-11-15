var express = require('express');
var app = express();

var http = require('http').Server(app);
// var socketio = require('socket.io');
global.io = require('socket.io')(http);
var path = require('path');

global.basedir = __dirname;

global.socket = null;
var usercount = 0;
var users = [];
var message = require('./app/message');
var route = require('./app/route');

app.use(express.static(path.join(__dirname, 'view', 'static')))

//Whenever someone connects this gets executed
io.on('connection', function(socket1) {
    socket = socket1;
    console.log('A user connected', users.length);
    // message.intervarMsg();

    socket.on('clientEvent', function(data) {
        console.log(data);
        message.clientEvent(data);
    });

    socket.on('setUsername', function(data) {
        console.log(data);

        if (users.indexOf(data) > -1) {
            socket.emit('userExists', data + ' username is taken! Try some other username.');
        } else {
            users.push(data);
            socket.emit('userSet', { username: data });
        }
    });

    socket.on('msg', function(data) {
        //Send message to everyone
        io.sockets.emit('newmsg', data);
    })

    //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', function() {
        console.log('A user disconnected');
    });

});

route(app);

// route(app);
http.listen(3000, function() {
    console.log('listening on *:3000');
});


/**************************  new  ***************************/