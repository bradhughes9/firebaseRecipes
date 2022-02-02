// setup materialize components
document.addEventListener("DOMContentLoaded", function () {
  var modals = document.querySelectorAll(".modal");
  M.Modal.init(modals);

  var items = document.querySelectorAll(".collapsible");
  M.Collapsible.init(items);
});

const recipeList = document.querySelector(".recipes");

const setupRecipes = (data) => {
  if (data.length) {
    let html = "";
    data.forEach((doc) => {
      const recipe = doc.data();
      const li = `
    <li>
      <div class="collapsible-header grey lighten-4">${recipe.title}</div>
      <div class="collapsible-body white"><ul class="z-depth-0">${setupHelper(
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
const setupHelper = (ingredients) => {
  //First we find how many ingredients are in the recipe
  const lengthOfRecipe = ingredients.length;
  //Make a container to hold all of the lists for each ingredient
  let html = "";
  for (let i = 0; i < lengthOfRecipe; i++) {
    let li = `<li>${ingredients[i]}</li>`;
    html += li;
  }
  return html;
};

//setupUi will show and hide links based on if a user is logged in or not
const loggedOutLinks = document.querySelectorAll(".logged-out");
const loggedInLinks = document.querySelectorAll(".logged-in");

const setupUI = (user) => {
  if (user) {
    loggedInLinks.forEach((item) => (item.style.display = "block"));
    loggedOutLinks.forEach((item) => (item.style.display = "none"));
  } else {
    loggedInLinks.forEach((item) => (item.style.display = "none"));
    loggedOutLinks.forEach((item) => (item.style.display = "block"));
  }
};

//Add more text inputs for user creating a recipe
//The add button
const addTextBtn = document.querySelector(".addTextBtn");
const whereToAddTheTextField = document.querySelector(".ingredientField");
addTextBtn.addEventListener("click", (e) => {
  e.preventDefault();

  //Create
  const textArea = document.createElement("textarea");
  textArea.classList.add("materialize-textarea");
  textArea.setAttribute("id", "content");

  //Add the text area to the DOM
  whereToAddTheTextField.append(textArea);
});
