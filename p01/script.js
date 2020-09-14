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
// This is the event listner for the form on submit
form.addEventListener('submit', function(e) {
    e.preventDefault(); //Use to Stop the reloding of page

    if (username.value === ''){
        showError(username, ' Username is required');
    }else {
        showSuccess(username);

    }

    if (email.value === ''){
        showError(email, ' email is required');
    } else if (!isValidEmail(email.value)){
        showError(email,'Email is invalid')
    }
    else {
        showSuccess(email);

    }

    if (password.value === ''){
        showError(password, ' password is required');
    }else {
        showSuccess(password);

    }

    if (password2.value === ''){
        showError(password2, ' Password is required');
    }else {
        showSuccess(password2);

    }


})
