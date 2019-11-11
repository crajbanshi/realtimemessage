var user = localStorage.getItem('chatUser');
var socket = io();

var timerActive = false,
    almostAFK = false;


//function to add message to window, if who === username, it's your message, otherwise its the stranger
var sendMsg = function(who, text) {
    if (text === null || text === undefined || text === "") { return; }

    var html = '' +
        '<div class="' + (who === user ? "them" : "you") + ' message">' +
        '<div class="avatar"></div>' +
        '<div class="name">' + who + '</div>' +
        '<div class="text">' + text + '</div>' +
        '</div>';

    document.getElementById('message-container').innerHTML += html;
    if (who === user) {
        if (!timerActive) {
            timerActive = true;
        }
        almostAFK = false;

        document.getElementById('message').value = "";
    }
};


socket.on('message', function(data) {
    document.write(data)
});

socket.on('testerEvent', function(data) {
    document.write(data.description)
});

function enableChat() {

    document.getElementById('usenamedisplay').innerHTML = user;
    document.getElementById('setuser').style.display = "none";
    document.getElementsByClassName('dim')[0].style.display = "none";
    document.getElementById('message').removeAttribute('disabled');
}
if (user) {
    enableChat()
}

function setUsername() {
    socket.emit('setUsername', document.getElementById('name').value);
};


socket.on('userExists', function(data) {
    document.getElementById('error-container').innerHTML = data;
});
socket.on('userSet', function(data) {
    user = data.username;
    localStorage.setItem('chatUser', user)
        // document.body.innerHTML = '<input type = "text" id = "message">\
        //      <button type = "button" name = "button" onclick = "sendMessage()">Send</button>\
        //      <div id = "message-container"></div>';
    enableChat();
});

function sendMessage() {
    var msg = document.getElementById('message').value;
    if (msg) {
        socket.emit('msg', {
            message: msg,
            user: user
        });
    }
}
socket.on('newmsg', function(data) {
    if (user) {
        sendMsg(data.user, data.message)
            // document.getElementById('message-container').innerHTML += '<div><b>' +
            //     data.user + '</b>: ' + data.message + '</div>'
    }
});