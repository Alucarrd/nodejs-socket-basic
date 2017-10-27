var socket = io();
var room = getQueryVariable('room') || 'chat';
var name = getQueryVariable('name') || 'Peter';

//update h1 tag
jQuery('.room-title').text(room);

socket.on('connect', function(){
	console.log('connected to socket io server now');
	socket.emit('joinRoom' , {
		name: name,
		room: room
	});
	
});




socket.on('message', function(message){
	//this will fire everytime msg comes 
	console.log(message.timestamp);

	var momentTimeStamp = moment.utc(message.timestamp);
	var $messages = jQuery('.messages');
	var $message = jQuery('<li class="list-group-item"></li>');
	$message.append('<p><strong>' + message.name + ' ' + momentTimeStamp.local().format('M/D/YYYY H:mma') + '</strong></p>');
	$message.append('<p>' + message.text + '</p>');
	 
	$messages.append($message); 
	console.log(momentTimeStamp);
	console.log('new message');
	console.log(message.text);
	//.message is the find for jquery to look for class
	

});

//handles submitting of new message
//selector, when select by id, then you start off with # then follows by id.
var $form = jQuery('#message-form');

$form.on('submit', function(event){
	//prevent the old fashion form submission
	event.preventDefault();
	var $message = $form.find('input[name=message]');
	//the syntax for find is element[attribute=value]
	//for the below example, we are looking for input element with name attribute that has value of "message"
	socket.emit('message', {
		name : name,
		text : $message.val()
	})
	$message.val('');
});
