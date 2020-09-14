/* This Looks Un-Professional to use if else for everyfuncton, so
we need to refactor it. to reduce the repetative code type.
*/
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// All Functions
// 1. Funtion to Show Error
function showError(input,message) {  // in curly brackets we type the execution
    const formControl = input.parentElement;  
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}
// 2. Function to Show Success
function showSuccess(input){
    const formControl = input.parentElement;  
    formControl.className = 'form-control sucess';

}


// 3. Function to check if email is valid
function isValidEmail(email){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
// Function to check if required fields have data
function checkRequired(inputArray) {
    inputArray.forEach(function(input) {
        if ( input.value === '' ) {
            showError(input,'This field is required');
        } else
            showSuccess(input);
    });
}
// This is the event listner for the form on submit
form.addEventListener('submit', function(e) {
    e.preventDefault(); //Use to Stop the reloding of page

    checkRequired([username,email,password,password2])

})
