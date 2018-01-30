window.onload = function() {

  // Video
  var video = document.getElementById("video");

  // Buttons
  var playButton = document.getElementById("play-pause");
  var muteButton = document.getElementById("mute");
  var fullScreenButton = document.getElementById("full-screen");
  var myvids = [
  "http://www.w3schools.com/html/mov_bbb.mp4", 
  "http://www.w3schools.com/html/movie.mp4"
  ];
  // Sliders
  var seekBar = document.getElementById("seek-bar");
  var volumeBar = document.getElementById("volume-bar");
  var buttonsWork = true;
  var playedAd = false;
  var allDone = false;
  var returning = true;
  var switchTime = 5;
  var returnTime;
  var value;
playButton.addEventListener("click", function() {
  if (video.paused == true) {
    // Play the video
    video.play();

    // Update the button text to 'Pause'
    playButton.innerHTML = "Pause";
  } else {
    // Pause the video
    video.pause();

    // Update the button text to 'Play'
    playButton.innerHTML = "Play";
  }
});

// Event listener for the mute button
muteButton.addEventListener("click", function() {
  if (video.muted == false) {
    // Mute the video
    video.muted = true;

    // Update the button text
    muteButton.innerHTML = "Unmute";
  } else {
    // Unmute the video
    video.muted = false;

    // Update the button text
    muteButton.innerHTML = "Mute";
  }
});

// Event listener for the full-screen button
fullScreenButton.addEventListener("click", function() {
  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.mozRequestFullScreen) {
    video.mozRequestFullScreen(); // Firefox
  } else if (video.webkitRequestFullscreen) {
    video.webkitRequestFullscreen(); // Chrome and Safari
  }
});

	// Event listener for the seek bar
seekBar.addEventListener("change", function() {
	if (buttonsWork == true){
  		// Calculate the new time
  		var time = video.duration * (seekBar.value / 100);
  		// Update the video time
		video.currentTime = time;
	}
});


// Update the seek bar as the video plays
video.addEventListener("timeupdate", function() {
  // Calculate the slider value
  value = (100 / video.duration) * video.currentTime;
  	if (document.getElementById("switch").value != ""){
  		switchTime= document.getElementById("switch").value;
  	}
	if (value >= switchTime *10){
	  	if(playedAd == false){
		  returnTime = video.duration * (seekBar.value / 100);
		  playedAd = true;
		  buttonsWork = false;
		  video.src= myvids[1];
		  video.play();
		}
 	}
 	if (allDone == true){
 		if(returning== true){
 			if(video.currentTime>0){
 			console.log(video.currentTime)
	 		returning=false;
 			video.currentTime= returnTime;
 			}
 		}
 	}

  // Update the slider value
  seekBar.value = value;
});

//when the ad is done playing, return to the original video
video.addEventListener("ended", function(){
	if (allDone == false){
		buttonsWork, allDone= true;
		video.src= myvids[0];
		video.play();
	}
	buttonsWork= true;

});
// Pause the video when the slider handle is being dragged
seekBar.addEventListener("mousedown", function() {
	if (buttonsWork == true){
		video.pause();
	}
});

// Play the video when the slider handle is dropped
seekBar.addEventListener("mouseup", function() {
  video.play();
});

// Event listener for the volume bar
volumeBar.addEventListener("change", function() {
  // Update the video volume
  video.volume = volumeBar.value;


});
}