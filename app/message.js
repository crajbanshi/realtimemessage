var socket = require('socket.io');

exports.intervarMsg = () => {
    //Send a message after a timeout of 4seconds
    setTimeout(function() {
        socket.send('Sent a message 4seconds after connection!');
    }, 4000);
};