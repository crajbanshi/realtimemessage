var path = require('path');

var message = require('./message');

var route = function(app) {
    // message(socket, io);
    // app.use(cors());


    app.get('/', function(req, res) {
        res.sendFile(path.join(basedir, 'view', 'index.html'));
    });

    app.get('/chat', function(req, res) {
        res.sendFile(path.join(basedir, 'view', 'chat.html'));
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

};

module.exports = route;