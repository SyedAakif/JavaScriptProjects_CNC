const currOnePicker =  document.getElementById('currency-one');
const currTwoPicker = document.getElementById('currency-two');
const currOneAmount = document.getElementById ('amount-one');
const currTwoAmount = document.getElementById ('amount-two');
const flipBtn = document.getElementById('flip');
const rate = document.getElementById('rate');

// Fetch exchange rate from 3rd Party API and update DOM elements
// www.exchangerate-api.com
function calculate() {
    const currencyOneCode = currOnePicker.value;
    const currencyTwoCode = currTwoPicker.value;
    
    fetch(`https://v6.exchangerate-api.com/v6/3ce217f6316decfa65b7b70c/latest/${currencyOneCode}`)
    .then(res => res.json() )

    .then ( data => {
        // Get the Exchange Rate from the  Api Data
        const exchangeRate = data.conversion_rates[currencyTwoCode];

        // Display the Conversion Rate
        rate.innerText = `1 ${currencyOneCode} = ${exchangeRate} ${currencyTwoCode}`;

        // Apply the conversion rate and update the ammount of currencyTwo
        currTwoAmount.value = (currOneAmount.value * exchangeRate).toFixed(2);

    })
}

// Flip function for the FLIP Button  to reverse Currency exchange rate
function flip() {
    const temp =currOnePicker.value
    currOnePicker.value = currTwoPicker.value;
    currTwoPicker.value = temp;
    calculate();
}

// Event Listners 
currOnePicker.addEventListener('change', calculate);
currTwoPicker.addEventListener('change', calculate);
currOneAmount.addEventListener('input', calculate);
currTwoAmount.addEventListener('input', calculate);
flipBtn.addEventListener('click', flip);


calculate();