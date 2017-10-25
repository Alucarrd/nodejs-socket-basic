var socket = io();
	
socket.on('connect', function(){
	console.log('connected to socket io server now');
});


socket.on('message', function(message){
	//this will fire everytime msg comes 
	console.log(message.timestamp);
	var momentTimeStamp = moment.utc(message.timestamp);
	console.log(momentTimeStamp);
	console.log('new message');
	console.log(message.text);
	//.message is the find for jquery to look for class
	jQuery('.messages').append('<p><strong>' + momentTimeStamp.local().format('M/D/YYYY H:mma') + "</strong>: " + message.text + '</p>');

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
		text : $message.val()
	})
	$message.val('');
});
