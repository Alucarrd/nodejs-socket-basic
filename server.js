var PORT = process.env.PORT || 3000

var express = require('express');

var app = express();

//build in build module
//this is telling node that start a new server and use the express app as boiler plate, anything express listens, this server will listen, too

var http = require('http').Server(app);

//expose the static folder
app.use(express.static(__dirname + '/public'));


http.listen(PORT, function(){
	console.log('Server has started at port ' + PORT);
});