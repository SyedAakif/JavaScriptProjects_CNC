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
function checkEmail(input){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if ( re.test(input.value.trim()) ) {
        showSuccess(input);
    }else {
        showError(input,`${getFieldId(input)} is not valid`);
    }

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
// Function  to check the length of the input function
function checkLength(input, min, max) {
    if (input.value.length < min ){
        showError(input,`${getFieldId(input)} needs to be at least ${min} characters`)
    }else if(input.value.length > max ) {
        showError(input,`${getFieldId(input)} needs to be less than ${max} characters`);
    } else
        showSuccess(input);
}
// Function to Check if Password & confirm Password is Match 
function checkPasswordMatch(input1, input2){
    if (input1.value !== input2.value) {
        showError(input2, "Passwords Don't match");
    }
}
// Function to get the ID for the input field with proper case
function getFieldId(input){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);  
}
//Function to refresh all the feilds 
function refreshForm(inputArray){
inputArray.forEach(function(input){
    input.value = '';
})
}
// This is the event listner for the form on submit
form.addEventListener('submit', function(e) {
    e.preventDefault(); //Use to Stop the reloding of page

    checkRequired([username,email,password,password2]);
    checkLength(username,3,10);  // (field, minValue, maxValue)
    checkLength(password,6,30);
    checkEmail(email) ;
    checkPasswordMatch(password,password2);
    refreshForm([username,email,password,password2]);
    alert("Your Form is submitted successfully");
    
})
