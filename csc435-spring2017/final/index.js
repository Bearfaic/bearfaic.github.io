// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(__dirname + '/public'));



//We will use this object to hold all of the players' pleas
var pleas = {};

io.on('connection', function (socket) {
	
	socket.on('new user', function (id) {
		socket.userId = id;
		console.log(id);
	});

	socket.on('plea', function (plea) {
		pleas[socket.userId] = plea
		console.log(plea);
		
	        //This is how you find out how many keys are in an associative array in js
		var numPleas = Object.keys(pleas).length;
		// console.log("we've gotten: " + numPleas + " pleas.");
		if (numPleas >= 2) {
			//Determine the outcome
			var count = 0; 
			var outcome;
			for (var userId in pleas) {
				if (count == 0){
					player1= userId;
					answer1= pleas[userId]
					count++;
				}
				else if (count == 1){
					player2= userId;
					answer2= pleas[userId]
				}
			}
		
			if(answer1 == "guilty"){
				if(answer2 == "guilty"){
					outcome = 0;
				}
				if(answer2 == "not guilty"){
					outcome = 2;
				}
			}
			if(answer1 == "not guilty"){
				if(answer2 == "guilty"){
					outcome = 3;
				}
				if(answer2 == "not guilty"){
					outcome = 1;
				}
			}
			// Announce the winner to everyone
			io.emit('allUsersHavePled', {
				p1: player1,a1: answer1, p2: player2, a2: answer2
			});
			if(outcome==0){
				io.emit('outcome0', {p1: player1, p2: player2});
			}
			if(outcome==1){
				io.emit('outcome1', {p1: player1, p2: player2});
			}
			if(outcome==2){
				io.emit('outcome2', {p1: player1, p2: player2});
			}	
			if(outcome==3){
				io.emit('outcome3', {p1: player1, p2: player2});
			}
		}
	});
});

