var socket = io();

socket.on('connect', function(){
	console.log('connected to socket io server now');
});


socket.on('message', function(message){
	console.log('new message');
	console.log(message.text);
});

//handles submitting of new message
var $form = jQuery('#message-form');