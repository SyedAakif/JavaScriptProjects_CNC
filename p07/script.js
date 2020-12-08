// Getting DOM Elements
const search = document.getElementById('search');
const submit = document.getElementById('submit');
const random = document.getElementById('random');
const resultHeading = document.getElementById('result-heading');
const mealContainer = document.getElementById('meals');
const selectedMeal = document.getElementById('selected-meal');

// Function to search Meal from API and fetch data 
function searchMeal(e) {
    e.preventDefault()

    // Clear selected meal after the search
    selectedMeal.innerHTML = '';

    // Get the search term from the input Field
    const term = search.value;
    // Check If the seach Term exists
    if (term.trim()){   // trim function is used to trim out the extra spaces
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                resultHeading.innerHTML = `<h2>Search results for '${term}':</h2>`;
                if(data.meals == null) {
                    resultHeading.innerHTML = `<p>There are no search results for '${term}'. Please try a diffrent search</p>`
                } else {
                    mealContainer.innerHTML = data.meals.map( meal => `
                        <div class = 'meal'>
                            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                            <div class="meals-info" data-mealId="${meal.idMeal}"
                                <h3>${meal.strMeal}</h3>
                            </div>                        
                        </div>
                    ` )
                    .join(' ')
                }
                search.value = '';
            })
    } else {
        alert ('Please enter a valid search')
    }
}


// Function to fetch the meal data by MealID 
function getMealById(mealID) {
    fetch (`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
        .then( res => res.json())
        .then( data => {
            const meal = data.meals[0]
            addMealToDOM(meal);
        })
}

// Fuction to add a Meal to DOM
function addMealToDOM(meal) {
    const Ingredients = [];

    for(i=1; i<=20; i++) {
        if(meal[`strIngredient${i}`]) {
            Ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
        } else {
            break;   //  Used to exit the For Loop
        }
    };

    selectedMeal.innerHTML = `
        <div class="selected-meal">
            <h1>${meal.strMeal}</h1>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
            <div class="selected-meal-info">
                ${meal.strCategory ?  `<h3>category:</h3><p>${meal.strCategory}</p>` : ''}
                ${meal.strArea ? `<h3>Area:</h3><p>${meal.strArea}</p>` : ''}
            </div>
            <div class="main">
            <h2>Ingredients</h2>
            <ul>
                ${Ingredients.map( ingredient => `<li>${ingredient}</li>` ).join('')}
            </ul>
                <h3>Instructions</h3>
                <p>${meal.strInstructions}</p>
                
            </div>
        </div>
    `;

}

// Event Listners
// 1. Submit Button
submit.addEventListener('submit', searchMeal)

// 2. When Clicking a Meal
mealContainer.addEventListener('click', e => {
    const mealInfo = e.path.find( item => {
        if (item.classList) {
            return item.classList.contains('meals-info');
        } else {
            return false
        }
    });
    
    if (mealInfo) {
        const mealID = mealInfo.getAttribute('data-mealid');
        getMealById(mealID);
    }

})