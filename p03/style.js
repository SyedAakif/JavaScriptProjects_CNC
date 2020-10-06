const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const progress = document.getElementById('progress');
const timestamp= document.getElementById('timestamp');

// Fuctions
// 1. toggleVideo - play & pause video
// If video is playing, then pause
// If video is paused, then play
function toggleVideo() {
    if (video.paused) {  // HTML Media Element Paused: Returns a Boolean that indicates whether the media element is paused
        video.play();
    } else {
        video.pause();
    }
};

// 2. UpdateIcon - Toggle between Play and Pause icons
// If video is playing, then show pause icon
// If video is paused, then show play icon
function updateIcon() {
    if (video.paused) {
        play.innerHTML =  '<i class="fas fa-play fa-2x"></i>';
    } else {
        play.innerHTML =  '<i class="fas fa-pause fa-2x"></i>';
    }
}

// 3. UpdateProgress - Update the position of the Progress Bar
function updateProgress() {
    // update slider

    progress.value = video.currentTime/video.duration*100;

    // Update timeStamp
    // rounding down the minutes
    let minutes = Math.floor(video.currentTime / 60);
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    // rounding down the seconds
    let seconds = Math.floor(video.currentTime % 60) ;
    if (seconds < 10) {
         seconds= `0${seconds}`;
    }     
    
    // Display timeStamp 
    timestamp.innerHTML = `${minutes}:${seconds}`;
}

// 4. stopVideo - Stop video playback and reset time to 0
function stopVideo(){
    video.pause();
    video.currentTime = 0;
}
// 5. setProgress - Update video playback time based on manual 
function setProgress() {
    debugger;
    video.currentTime = progress.value* video.duration / 100;
}

// Event Listners
// 1. Video Element - Click to play or pause the video
video.addEventListener('click', toggleVideo) ;

// 2. Video Element - pause to toggle play icon to pause icon
video.addEventListener('pause', updateIcon) ;

// 3. Video Element - play to toggle pause icon back to play icon
video.addEventListener('play', updateIcon) ;

// 4. update progress bar and timestamp
video.addEventListener('timeupdate', updateProgress);

// 5. Play Buttton - Click to Play or pause video
play.addEventListener('click', toggleVideo);

// 6. Stop Button -  Click to reset video and pause video
stop.addEventListener('click', stopVideo)

// 7. Progress Bar - Change position to change time of playback
progress.addEventListener('change', setProgress);
progress.addEventListener('click', setProgress);
// we can use change on any input, as we use input for progress bar so we can use change eventlistne here