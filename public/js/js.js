// Sample objects for recipes
// Recipe factory to make the recipes easier to add
const recipeFactory = (description, imgPath, recipe, id) => {
  return {
    description,
    imgPath,
    recipe,
    id,
  };
};

// Our current recipes and an array to store them all.
// template to copy/paste ---> const = recipeFactory("", "", "");
const mashedPotatoes = recipeFactory(
  "Mashed Potatoes and Gravy",
  "img/mashedPotatoes.jpg",
  [
    "6Lbs of potatoes",
    "2 bags of gravy",
    "3 packets of potato skins",
    "3 butter",
  ],
  "0"
);
const corn = recipeFactory(
  "Corn on the cob",
  "img/corn.jpg",
  ["5 corns", "2 butters", "3 salt"],
  "1"
);
const buffaloDip = recipeFactory(
  "Buffalo Dip",
  "img/buffaloDip.jpg",
  ["some palm hearts", "buffalo sauce"],
  "2"
);
const blackBeanBurger = recipeFactory(
  "Black Bean Burger",
  "img/blackBeanBurger.jpg",
  ["6 black beans", "2 glue sticks to hold beans together"],
  "3"
);
const cod = recipeFactory(
  "Baked Cod",
  "img/cod.jpg",
  [
    "6Lbs of potatoes",
    "2 bags of gravy",
    "3 packets of potato skins",
    "3 butter",
  ],
  "4"
);
const pasta = recipeFactory(
  "Pasta",
  "img/pasta.jpg",
  [
    "6Lbs of potatoes",
    "2 bags of gravy",
    "3 packets of potato skins",
    "3 butter",
  ],
  "5"
);
const pizza = recipeFactory(
  "Pizza",
  "img/pizza.jpg",
  [
    "6Lbs of potatoes",
    "2 bags of gravy",
    "3 packets of potato skins",
    "3 butter",
  ],
  "6"
);
const shepardsPie = recipeFactory(
  "Shepards Pie",
  "img/shepardsPie.jpg",
  [
    "6Lbs of potatoes",
    "2 bags of gravy",
    "3 packets of potato skins",
    "3 butter",
  ],
  "7"
);
const wraps = recipeFactory(
  "Wraps",
  "img/wraps.jpg",
  [
    "6Lbs of potatoes",
    "2 bags of gravy",
    "3 packets of potato skins",
    "3 butter",
  ],
  "8"
);

const recipeList = [
  mashedPotatoes,
  corn,
  buffaloDip,
  blackBeanBurger,
  cod,
  pasta,
  pizza,
  shepardsPie,
  wraps,
];

//All variables for accessing the DOM
const addButton = document.querySelector(".addToList");
const skipButton = document.querySelector(".skip");
const restartButton = document.querySelector(".startOver");
const recipeImg = document.getElementById("recipeImg");
const recipeDesc = document.getElementById("recipeDesc");
const recipeContainer = document.querySelector(".recipeContainer");
let recipeId = recipeImg.dataset.id;
let counter = 0;
var modal = document.getElementById("myModal");
var btn = document.querySelector(".openModal");
var span = document.getElementsByClassName("close")[0];

//Make sure this button starts off as hidden, until you run through the entire recipe list
restartButton.hidden = true;

//This code will display the first recipe of the array.
recipeImg.src = recipeList[recipeId].imgPath;
recipeDesc.innerHTML = recipeList[recipeId].description;

/*ALL OF THIS IS FOR THE FIRST RECIPE TO DISPLAY ON START */
//where we will write the recipe to the modal on the chopping block
const p = document.getElementById("modalRecipeList");
const pContainer = document.getElementById("modalContainerRecipeList");

//List and list items for each ingredient
const ul = document.createElement("ul");
p.appendChild(ul);

//Loop through the objects recipe list
//and append each ingredient to the list.
for (let i = 0; i <= recipeList[0].recipe.length - 1; i++) {
  var li = document.createElement("li");
  li.textContent = `${recipeList[0].recipe[i]}`;
  ul.appendChild(li);
}
/*END OF THE START RECIPE*/

//Onclick for the add to list button
addButton.addEventListener("click", (e) => {
  if (counter == recipeList.length - 1) {
    recipeImg.src = "img/backToBeginning.jpg";
    recipeDesc.innerHTML = " ";
    addButton.hidden = true;
    skipButton.hidden = true;
    restartButton.hidden = false;
  } else {
    recipeId = recipeImg.dataset.id;
    let modalCounter = counter + 1;
    handleModal();
    addRecipeToModal(recipeList[modalCounter]);
    addHTML(recipeList[counter]);
    counter++;
    recipeImg.src = recipeList[counter].imgPath;
    recipeDesc.innerHTML = recipeList[counter].description;
    recipeImg.setAttribute("data-id", `${recipeList[counter].id}`);
  }
});

//onclick for the skip button
skipButton.addEventListener("click", (e) => {
  if (counter == recipeList.length - 1) {
    recipeImg.src = "img/backToBeginning.jpg";
    recipeDesc.innerHTML = " ";
    addButton.hidden = true;
    skipButton.hidden = true;
    restartButton.hidden = false;
  } else {
    recipeId = recipeImg.dataset.id;
    let modalCounter = counter + 1;
    handleModal();
    addRecipeToModal(recipeList[modalCounter]);
    counter++;
    recipeImg.src = recipeList[counter].imgPath;
    recipeDesc.innerHTML = recipeList[counter].description;
    recipeImg.setAttribute("data-id", `${recipeList[counter].id}`);
  }
});

// Onclick for the restart button
restartButton.addEventListener("click", (e) => {
  addButton.hidden = false;
  skipButton.hidden = false;
  restartButton.hidden = true;
  counter = 0;
  recipeImg.src = recipeList[counter].imgPath;
  recipeDesc.innerHTML = recipeList[counter].description;
});

//Onclick for recipe container images
function containerModal(recipeObject) {}

//Function to create new divs with the recipe inside of them.
//This adds recipes to the recipe container below the "chopping block"
function addHTML(recipeObject) {
  const responsiveDiv = document.createElement("div");
  const galleryDiv = document.createElement("div");
  const image = document.createElement("img");
  const desc = document.createElement("div");
  responsiveDiv.classList.add("responsive");
  galleryDiv.classList.add("gallery");
  recipeContainer.appendChild(responsiveDiv);
  responsiveDiv.append(galleryDiv);
  galleryDiv.append(image);
  image.src = recipeObject.imgPath;
  image.alt = recipeObject.description;
  image.setAttribute("data-id", `${recipeObject.id}`);
  image.classList.add("openModal");
  desc.classList.add("desc");
  galleryDiv.append(desc);
  desc.innerHTML = recipeObject.description;
}

//This function clears the modal so that when it is clicked
//the previous recipe is cleared
function handleModal() {
  let modal = document.getElementById("modalRecipeList");
  modal.innerHTML = "";
}

function addRecipeToModal(recipeObject) {
  //where we will write the recipe
  const p = document.getElementById("modalRecipeList");
  //List and list items for each ingredient
  const ul = document.createElement("ul");
  p.appendChild(ul);
  //Now we must loop through the objects recipe list
  //and append each ingredient to the list.

  for (let i = 0; i <= recipeObject.recipe.length - 1; i++) {
    var li = document.createElement("li");
    li.textContent = `${recipeObject.recipe[i]}`;
    ul.appendChild(li);
  }
}

document.addEventListener("click", function (e) {
  if (e.target && e.target.className == "openModal") {
    let imgId = e.target.getAttribute("data-id");
    modal.style.display = "block";
    handleModal();
    addRecipeToModal(recipeList[imgId]);
  }
});

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

