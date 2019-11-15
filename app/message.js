// var socket = null; // require('socket.io');

// var io = require('socket.io')(http);
var usercount = 0;
var users = [];

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

message.intervarMsg = () => {
        //Send a message after a timeout of 4seconds
        setTimeout(function() {
            socket.send('Sent a message 4seconds after connection!');
        }, 4000);
    }
    //Whenever someone connects this gets executed


module.exports = message;