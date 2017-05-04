$(function () {
  var socket = io();

  //Deal with getting username
  $('#userIdForm').submit(function() {
    console.log($('#userIdInput').val());
    socket.emit('new user', $('#userIdInput').val());
    $('#gameDiv').show();
    $('#logInDiv').hide();
    return false; //This tell jquery to not refresh the page
  });

  //Deal with getting the plea
  $('#pleaForm').submit(function() {
    socket.emit('plea', $('#pleaInput').val());
    $('#pleaForm').hide();
    $('#waitingDiv').show();
    return false;
  });

  //This will be called when all users have pled
  socket.on('allUsersHavePled', function(msg) {
    $('#resultsDiv').append(msg.p1 + " plead: " + msg.a1 +"."  + "<br>" + msg.p2 + "\n plead: " + msg.a2 + ".<br>");
    $('#waitingDiv').hide();
    $('#resultsDiv').show();
     return false
  });
  socket.on('outcome0', function(msg) {
    $('#resultsDiv').append("Both " + msg.p1 + " and " + msg.p2 + " get 10 years in prison.");
    $('#waitingDiv').hide();
    $('#resultsDiv').show();
     return false
  });
  socket.on('outcome1', function(msg) {
    $('#resultsDiv').append("Both " + msg.p1 + " and " + msg.p2 + " get off scott free.");
    $('#waitingDiv').hide();
    $('#resultsDiv').show();
     return false
  });
  socket.on('outcome2', function(msg) {
    $('#resultsDiv').append(msg.p1 + " gets 5 years in prison, " + msg.p2 + " gets 15.");
    $('#waitingDiv').hide();
    $('#resultsDiv').show();
     return false
  });
  socket.on('outcome3', function(msg) {
    $('#resultsDiv').append(msg.p1 + " gets 15 years in prison, " + msg.p2 + " gets 5.");
    $('#waitingDiv').hide();
    $('#resultsDiv').show();
     return false
  });

});
