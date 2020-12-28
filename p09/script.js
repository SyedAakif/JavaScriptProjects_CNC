const previousButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const audio = document.getElementById('audio');
const imgCover = document.getElementById('cover');
const musicContainer = document.getElementById('music-container');
const progressContainer = document.getElementById('progress-container');
const progressBar = document.getElementById('progress');
const playButton = document.getElementById('play');
const tittle = document.getElementById('tittle');


// List of Songs 
const songsList = ['Alan Walker - Faded',
                   'Anne-Marie - Ciao Adios', 
                   'Raja Kumari ft. DIVINE - City Slums ',
                   'IQBAL - KHUDDAY LINE',    
                   'Marshmello & Anne-Marie - FRIENDS'
                  ];


// Track Which Sonmg is Currently Playing 
let currentSong = 3;

// Update the Song to the DOM
function loadSong(song) {
    tittle.innerText = song
    audio.src = `music/${song}.mp3`
    audio.src = `images/${song}.jpg`
}

// initial song load 
loadSong(songsList[currentSong])

// Event Listners
playButton.addEventListener('click', () => {
    
})