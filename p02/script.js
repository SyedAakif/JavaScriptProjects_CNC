const container = document.querySelector('.container');
const seats = document.querySelectorAll ('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
let ticketPrice = +movieSelect.value ; //+ is used to convert string into a number

populateUI();

//JSON  ==> Java script Object Notation

// Pull data from local storage to build UI
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats')) ;
    console.log(selectedSeats);

    if (selectedSeats != null && selectedSeats.length > 0) {
        seats.forEach( (seat , index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        })
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if (selectedMovieIndex != null) {
        movieSelect.selectedIndex = selectedMovieIndex ;
    }
}

// Function to update counts
function updateSelectedCount () {
   
    const selectedSeats = document.querySelectorAll ('.row .seat.selected');
    const countSelectedSeats = selectedSeats.length ;

    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat) ); // Spread opearator(...) used to convert node to Array

    localStorage.setItem('selectedSeats',JSON.stringify(seatsIndex)); // JSON.stringfy used to convert an array to string    
    
    count.innerText = countSelectedSeats;
    total.innerText = ticketPrice * countSelectedSeats;
}

// Function to save the selected seat and its Price
function setMovieDate (movieIndex, Price){
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice',Price);
}

// Event Listener for change on select movie dropdown 
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    setMovieDate(e.target.selectedIndex,e.target.value);
    updateSelectedCount(); 
})


// Event Listener for click on availaible seats 
container.addEventListener('click', (e) => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected') // we can use add or remove instead of toggle for the same function of select & deselect
        updateSelectedCount();
    }
})

// Calculate initial number of seats and price
updateSelectedCount();