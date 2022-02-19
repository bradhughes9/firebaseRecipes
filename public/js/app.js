// setup materialize components
document.addEventListener("DOMContentLoaded", function () {
  var modals = document.querySelectorAll(".modal");
  M.Modal.init(modals);

  var items = document.querySelectorAll(".collapsible");
  M.Collapsible.init(items);
});

// Write the Groceries to the page
const groceryList = document.querySelector(".groceries");
const setupGroceries = (data) => {
  if (data.length) {
    let html = "";
    data.forEach((doc) => {
      const grocery = doc.data();
      
      const li = `
    <li data-id="${doc.id}" class="groceryLi ingredient">
      ${grocery.title}
      <a href="#!" class="waves-effect waves-circle waves-light btn-floating secondary-content removeButton">
    <i class="material-icons removeIngredient">remove</i>
  </a>
    </li>
    `;

      html += li;
    });
    groceryList.innerHTML = html;
  } else {
    groceryList.innerHTML =
      '<h5 class="center-align">Login to view your recipes.</h5>';
  }
};

// Write the recipes to the page
const recipeList = document.querySelector(".recipes");
const setupRecipes = (data) => {
  if (data.length) {
    let html = "";
    data.forEach((doc) => {
      const recipe = doc.data();
      const li = `
    <li>
      <div class="collapsible-header grey lighten-4 center-align">${recipe.title}</div>
      <div class="collapsible-body white"><ul class="z-depth-0">${listIngredients(
        recipe.ingredients
      )}</ul>
      </div>
    </li>
    `;
      html += li;
    });
    recipeList.innerHTML = html;
  } else {
    recipeList.innerHTML =
      '<h5 class="center-align">Login to view your recipes.</h5>';
  }
};

//functions for setupRecipes to display lists
const listIngredients = (ingredients) => {
  //First we find how many ingredients are in the recipe
  const lengthOfRecipe = ingredients.length;
  //Make a container to hold all of the lists for each ingredient
  let html = "";
  for (let i = 0; i < lengthOfRecipe; i++) {
    let li = `
    <li class="ingredientsLi ingredient">${ingredients[i]}  <a href="#!" class="waves-effect waves-circle waves-light btn-floating secondary-content">
    <i class="material-icons addIngredient">add</i>
  </a>
     
    </li>`;
    html += li;
  }
  return html;
};

//setupUi will show and hide links based on if a user is logged in or not
const loggedOutLinks = document.querySelectorAll(".logged-out");
const loggedInLinks = document.querySelectorAll(".logged-in");
const accountDetails = document.querySelector(".account-details");

const setupUI = (user) => {
  //toggle UI elements if user is logged in/out
  if (user) {
    //account info
    db.collection('users').doc(user.uid).get().then(doc => {
      const html = `
      <div>Logged in as: ${user.email}</div>
      <div>${doc.data().bio}</div>
      `;
      accountDetails.innerHTML = html;
    });

    loggedInLinks.forEach((item) => (item.style.display = "block"));
    loggedOutLinks.forEach((item) => (item.style.display = "none"));
  } else {
    //hide account info
    accountDetails.innerHTML = "";
    loggedInLinks.forEach((item) => (item.style.display = "none"));
    loggedOutLinks.forEach((item) => (item.style.display = "block"));
  }
};

//Add more text inputs for user creating a recipe
//The add button
const addTextBtn = document.querySelector(".addTextBtn");
const ingredientsModalContainer = document.querySelector(
  ".ingredientContainer"
);
addTextBtn.addEventListener("click", (e) => {
  e.preventDefault();

  //Create
  const textArea = document.createElement("textarea");
  textArea.classList.add("materialize-textarea");
  textArea.classList.add("content");
  textArea.classList.add("ingredientField");

  //Add the text area to the DOM
  ingredientsModalContainer.appendChild(textArea);
});

//Array to store all our ingredients
let ingredientArray = [];

function ingredientHelper() {
  //Selector to locate the ingredient textAreas
  const ingredientsTextArea = document.querySelectorAll(".ingredientField");
  //Foreach ingredient add it to the array above
  ingredientsTextArea.forEach((x) => ingredientArray.push(x.value));
  //Return the array when the function is called
  return ingredientArray;
}

//Mobile nav
document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.sidenav');
  // ***NOTE***: Optional options, are passed as the 2nd argument as an object
  var instances = M.Sidenav.init(elems, { inDuration: 600, edge: 'right' });
});

