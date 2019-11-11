var express = require('express');
var app = express();

var http = require('http').Server(app);
var socket = require('socket.io');
var io = require('socket.io')(http);
var path = require('path');

var socket = null;
var usercount = 0;
var users = [];
var message = require('./app/message');

app.use(express.static(path.join(__dirname, 'view', 'static')))

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'view', 'index.html'));
});

app.get('/chat', function(req, res) {
    res.sendFile(path.join(__dirname, 'view', 'chat.html'));
});

app.get('/testerEvent', function(req, res) {
    message.testerEvent();
    res.end('done');
});

app.get('/getUsers', function(req, res) {
    var data = {
        status: true,
        data: { users: users },
        timestamp: new Date()
    }
    res.send(data);
    res.end();
});

var message = function() {};
message.intervarMsg = () => {
    //Send a message after a timeout of 4seconds
    setTimeout(function() {
        socket.send('Sent a message 4seconds after connection!');
    }, 4000);
};

message.testerEvent = () => {
    //Send a event emit
    socket.emit('testerEvent', { description: 'A custom event named testerEvent!' });
};


message.clientEvent = (clientdata) => {
    //Send a client message
    socket.emit('clientEvent', { data: clientdata });
};

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

http.listen(3000, function() {
    console.log('listening on *:3000');
});


/**************************  new  ***************************/