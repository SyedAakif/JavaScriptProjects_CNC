// Grab DOM Elements from HTML
const word = document.getElementById('word');
const wrongLetters = document.getElementById('wrong-letters');
const popupContainer = document.getElementById('popup-container');
const message = document.getElementById('win-lose');
const restartBtn = document.getElementById('restart');
const notification = document.getElementById('slider-container');

const hangmanParts = document.querySelectorAll('.hangman-part');

// An array of Words to Select from
const wordPool = ['javascript' , 'monkey' , 'amazing', 'pancake', 'galvainze', 'facebook', 'concatenate', 'iteration', 'reactivity', 'code', 'taiwan', 'tweets', 'python' , 'beautiful', 'clutch', 'fender'];

// Selecting a word at random from the pool
let selectedWord = wordPool[ Math.floor(Math.random() * wordPool.length) ];

// Arrays to classify the input of the user
const correctLetters = [];
const incorrectLetters = [];

// Function to dispay the word on screen
function displaySelectedWord() {
    word.innerHTML = `
        ${selectedWord
        .split('') 
            .map(
                letter => `
                    <span class="letter" >
                        ${correctLetters.includes(letter) ? letter : '' }  
                    </span> 
                ` // this will return true and false and will check the letter we are putting is in the word or no
            
            )
            .join('')
        }
    `;

    const wordText = word.innerText.replace(/\n/g, '')    //Regular Expression:In this we declare a pattern which we want to find(its between two forward slashes).
   
    if ( wordText === selectedWord ) {
        message.innerText = 'You Won!';
        popupContainer.style.display = 'flex';
    }
}

// Function to display the sliding notification'
function showNotification() {
    notification.hidden  =false;

    setTimeout( () => {notification.hidden  =true;},3000);
}

// Function to update incrorrect letters
function updateWrongLetters() {

    // Update the Display for Wrong Letters
    wrongLetters.innerHTML = `
        ${incorrectLetters.length > 0 ? `<p> Wrong Letters: </p>`:'' }
        ${incorrectLetters.map( letter => `<span> ${letter} </span>`)} 
    `;

     // Display Hangman Parts on incorrect letter input

        //      const errors = incorrectLetters.length; 
        //    if(errors>0){
        //        for(let i = 0 ; i<errors ; i++){
        //            let part = hangmanParts[i];
        //            part.style.display = 'block'
        //        }
        // //    } else{
        // //        for(let i = 0 ; i<hangmanParts.length;i++){
        // //         let part = hangmanParts[i];
        // //         part.style.display = 'none'
        // //        }
        //    }

    hangmanParts.forEach( (part, index) => {
        const errors = incorrectLetters.length; 

        if (errors > index) {
            part.style.display = 'block';
        }else {
            part.style.display = 'none';
        }
    })

    // Show Popup if Lost
    if( incorrectLetters.length === hangmanParts.length ) {
        message.innerText = 'You Lost!';
        popupContainer.style.display = 'flex'
    }

}

// Event Handlers
// 1. Event Handler for Keyboard Button Press
window.addEventListener('keydown', e => {    // Keydown event is used when any key is pressed on keyboard 
    if(e.keyCode >= 65 && e.keyCode <= 90 ) {
        const letter = e.key;

        if ( selectedWord.includes(letter) ) {
            if (!correctLetters.includes(letter) ){
                correctLetters.push(letter);
                displaySelectedWord();
            }else {
                showNotification();
            }
        }else {
            if(!incorrectLetters.includes(letter)){
                incorrectLetters.push(letter);
                updateWrongLetters();
            }else {
                showNotification();
            }
        }
    }
})  

// Event Listners for the Restart Button
restartBtn.addEventListener('click', () => {
    // Empty Arrays
    correctLetters.splice(0);
    incorrectLetters.splice(0);

    // Get new Selected Word from the Pool
    selectedWord = wordPool[ Math.floor(Math.random() * wordPool.length) ];

    displaySelectedWord();

    // Clear the Wron Letters Div
    updateWrongLetters();

    // Hide the Popup
    popupContainer.style.display = 'none';
})

displaySelectedWord();