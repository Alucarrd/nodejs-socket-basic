var PORT = process.env.PORT || 3000

var express = require('express');

var app = express();

var io = require('socket.io')(http); //this is the format socket.io expect

//build in build module
//this is telling node that start a new server and use the express app as boiler plate, anything express listens, this server will listen, too

var http = require('http').Server(app);

//expose the static folder
app.use(express.static(__dirname + '/public'));

//on will let you listen for event, now it's listening to connection event
io.on('connection', function(){
	console.log('user connected via socket.io');
});

http.listen(PORT, function(){
	console.log('Server has started at port ' + PORT);
});