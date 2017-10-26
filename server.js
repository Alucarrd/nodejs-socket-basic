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

var clientInfo = {};

//send current users to provided socket
function sendCurrentUsers(vSocket){
	var userData = clientInfo[vSocket.id];
	var users = [];

	if(typeof userData === undefined){
		return;
	}
	Object.keys(clientInfo).forEach(function(socketId){
		var userInfo = clientInfo[socketId];
		if(info.room === userInfo.room){
			users.push(userInfo.name);
		}

	});
	socket.emit('message', {
		name: 'System',
		text: 'Current users:' + users.join(','),
		timestamp: moment().valueOf()
	});

}

//on will let you listen for event, now it's listening to connection event
io.on('connection', function(socket){
	//we get access to individual socket on the server 
	//disconnect is a built in socket.io event, so you can't pick any name

	socket.on('disconnect', function(){
console.log('disconnecting');
		var userData = clientInfo[socket.id];
		//check to see if there's data for this user
		if(typeof userData !== undefined){
			
			socket.leave(userData.room);//leaving the room
			io.to(userData.room).emit('message', {
				name: 'System',
				text: userData.name + ' has left...',
				timestamp: moment().valueOf
			});
			delete clientInfo[socket.id];
		}
	});

	socket.on('joinRoom', function(req){
		clientInfo[socket.id] = req;
		socket.join(req.room);
		socket.broadcast.to(req.room).emit('message', {
			name: 'System',
			text: req.name + ' had joined!',
			timestamp : moment().valueOf()
		});
	});


	socket.on('message', function(message){
		console.log('message received:' + message.text);


		//time to setup custom command


		if(message.text === '@currentUsers')
		{
			sendCurrentUsers(socket);
		}else
		{
			message.timestamp = moment().valueOf();

			io.to(clientInfo[socket.id].room).emit('message', message);
		}


		//now to send out the msage
		//broadcast.emit will send this to everyone but the sender
		//socket.broadcast.emit('message', message);
		//io.emit will send msg to everyone
		
		
	});
	 //this is now making the server listening to socket msg
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