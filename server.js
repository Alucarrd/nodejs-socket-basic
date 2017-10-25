var PORT = process.env.PORT || 3000

var express = require('express');

var app = express();

var moment = require('moment');

var now = moment();

//build in build module
//this is telling node that start a new server and use the express app as boiler plate, anything express listens, this server will listen, too

var http = require('http').Server(app);


var io = require('socket.io')(http); //this is the format socket.io expect

//expose the static folder
app.use(express.static(__dirname + '/public'));

//on will let you listen for event, now it's listening to connection event
io.on('connection', function(socket){
	//we get access to individual socket on the server 
	socket.on('message', function(message){
		console.log('message received:' + message.text);

		//now to send out the msage
		//broadcast.emit will send this to everyone but the sender
		//socket.broadcast.emit('message', message);
		//io.emit will send msg to everyone
		if(!message.timestamp)
			message.timestamp = now.valueOf();

		io.emit('message', message);
	}); //this is now making the server listening to socket msg
	socket.emit('message', {
		name : 'System',
		text : 'Welcome to the chat',
		timestamp: now.valueOf()
	}); //emit an event, which takes one parameter value.  So its' better to pass in a javascript object


	console.log('user connected via socket.io');
});

http.listen(PORT, function(){
	console.log('Server has started at port ' + PORT);
});