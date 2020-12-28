// Getting DOM Elements
const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const description = document.getElementById('description');
const Amount = document.getElementById('amount');

// Dummy Transactions
// const dummyTransactions = [
//     { id: 1, description: 'Salary', amount: 100000 },
//     { id: 2, description: 'Electric Bill', amount: -50000 },
//     { id: 3, description: 'Intenet', amount: -1000 }
// ];


let transactions=[];

// Function to Generate an ID
function generateID(){
    return Math.floor(Math.random() * 100000000 )
}

// Add New Transaction to the Form
function addTransaction(e){
    e.preventDefault();

    if( description.value.trim() === '' || amount.value.trim() === '' ) {
        alert('Please Enter a Valid Description or Transaction amount')
    } else{
        const transaction = {
            id: generateID(),
            description: description.value,
            amount: +amount.value      // Plus sign is for indicating its number not a string
            }
            transactions.push(transaction);

            localStorage.setItem('transaction',JSON.stringify(transactions));
        addTransactionUI(transaction) ;
        updateSums();

        description.value = '';
        amount.value = '';
    }
}

// Function to Remove the Transaction
function deleteTransaction(id) {
    transactions = transactions.filter( transaction => transaction.id != id );
    localStorage.setItem('transaction',JSON.stringify(transactions));


    init()
}

// Function to Display Transacion in Transaction History
function addTransactionUI(transaction) {
    // Classify if Income or Expense
    const type = transaction.amount > 0 ? '+' : '-';

    // Create DOM element for List Item
    const item = document.createElement('li');
    
    // Add Class on list Items Based on type
    item.classList.add ( transaction.amount >  0 ? 'plus' : 'minus' );
    
    item.innerHTML = `
        ${transaction.description}
        <span>${type}${Math.abs(transaction.amount)}</span>
        <button class="delete-btn" onclick="deleteTransaction(${transaction.id})">X</button>
    `;

    list.appendChild(item)
}    

// Function to update the Balance, Income, and Expense summaries
function updateSums() {
    // Create array of Transaction amount from transaction array
    const amounts = transactions.map(  transaction => transaction.amount );

    // Calculate TOTAL value for Balance
    const total = amounts
                    .reduce( (acc, amount) => (acc += amount), 0 )
                    .toFixed(2);
    
    // Calculate Total Income
    const income = amounts
                        .filter( amount => amount > 0 )
                        .reduce( (acc, amount) => (acc += amount), 0 )
                        .toFixed(2);
    
    // Calculate Total Expense
    const expense = amounts
                        .filter( amount => amount < 0 )
                        .reduce( (acc, amount) => (acc += amount), 0 )
                        .toFixed(2);
                   
    // Update Balance in DOM
    balance.innerHTML = `${total} PKR`    
    
    //Update Income in DOM
    money_plus.innerHTML = `${income} PKR`

    // Update Expense in DOM
    money_minus.innerHTML = `${expense} PKR`

}

// Function to initialize the App
function init() {
    list.innerHTML = '';
    if(localStorage.getItem('transaction')){
        transactions = JSON.parse(localStorage.getItem('transaction'));
        transactions.forEach(addTransactionUI);
    }
    updateSums()

   
}

// Event Listners
// 1. Event Listner for Form submit
form.addEventListener('submit', addTransaction)

init();