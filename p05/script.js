// Getting DOM Elements
const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleMoneyBtn = document.getElementById('double');
const showMillionairesOnlyBtn = document.getElementById('show-millionairs');
const sortRichestbtn = document.getElementById('sort');
const totalBtn = document.getElementById('calculate-total');

// Initializing Data Array
let data = [];

// Create Initial User
generateRandomUser();
generateRandomUser();
generateRandomUser();

// Function to fetch Random User from API
// API: "randomuser.me/api"

/*function generateRandomUser() {
    fetch('https://randomuser.me/api')
    .then( res => res.json)
    .then( data => {
    } )
} */
 
// Async & await function used commonly now for promise fuction
async function generateRandomUser() {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();
    const user = data.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        worth: Math.round(Math.random()*1000000)
    }

     addData(newUser);

}

// Function to Double the Net Worth of Each user
function doubleWorth() {
    data = data.map( item => {
        return { ...item, worth: item.worth * 2 };  //"..." it is spread operator used to return the existing data
    })

    updateDOM();
}

// Fuction to Sort the Users by Richest
function sortRichest() {
    data.sort( (a,b) => b.worth - a.worth);

    updateDOM();
}

// Function to filter the users & only show millionaires
function showMillionaires() {
    data = data.filter(
        item => item.worth > 1000000
    );
    updateDOM();
}

// Function to calculate the Total Net worth of All Users
function calculateTotalNetWorth() {
    const totalWorth = data.reduce (  // Reduce returns the single value of the Array
        (acc, item) => (acc += item.worth), 0
    );

    const totalNetWorthElement = document.createElement('div');
    totalNetWorthElement.innerHTML = `<h3>Total Net Worth <strong>${formatCurrency(totalWorth)}</strong></h3>`;
    main.appendChild(totalNetWorthElement) ;
}

// Add Newly Generated Data into Data Array
function addData(newUser) {
    data.push(newUser);

    updateDOM();
}

// Function to Update the UI with DOM
function updateDOM(inputData = data) {
    main.innerHTML = '<h2><strong>Name</strong> Net Worth </h2>';

    inputData.forEach( item => {
        const element = document.createElement('div');
        element.classList.add('name');
        element.innerHTML = `<strong>${item.name}</strong> ${formatCurrency(item.worth)}`;
        main.appendChild(element);
    });
       
}

// Function to format a number as Currency
function formatCurrency(num) {
    return 'PKR ' + (num).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');  // this is used to covert the nymber to currency from stackoverflow
}

// Event Listners
// 1. Add User Event Listner
addUserBtn.addEventListener('click', generateRandomUser);

// 2. Add Double Money Event Listner
doubleMoneyBtn.addEventListener('click', doubleWorth);

// 3. Add Sort Event Listner
sortRichestbtn.addEventListener('click', sortRichest);

// 4. Add Show Millionaires Event Listner
showMillionairesOnlyBtn.addEventListener('click', showMillionaires);

// 5. Add Calculate Total Wealth Event Listner
totalBtn.addEventListener('click', calculateTotalNetWorth)