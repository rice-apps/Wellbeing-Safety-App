const PORT = process.env.PORT || 8000

// Library
var express = require('express');
var db = require('./db');
var cors = require('cors');

var Request = require('./models/request');

var requestController = require('./controllers/request-controller');

// Express App
var app = express();

// Server
var server = require('http').Server(app);

// SocketIO
var io = require('socket.io')(server);

// Middlewares
app.use(cors());
app.use('/api/req', requestController);

// Routers
app.get('/', function (req, res) {
  console.log("Hit / dir.");
  res.status(200).send("Hello, World.");
})

// New Connection
io.on('connection', function(socket) {
  console.log("new connection");
  socket.emit('request', {hello: 'World'});
  
  socket.on('request', function(msg) {
    console.log(msg);
  });
});

server.listen(PORT, function () {
  console.log('Server listens on port ' + PORT);
})