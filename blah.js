
// This listens for a click anywhere on the dom, looking specifically for 
//my .addIngredient class paragraphs
document.addEventListener('click', () => {
    let paragraph = document.querySelectorAll('.addIngredient');
    paragraph.forEach(p => {
        p.addEventListener('click', addElementToGroceries);
    });
  });
  // Then once it is found, it bubbles up the node tree until it finds my li
  // containing the ingredient value  which will then use the substring method
  // to chop off everything besides the ingredient
  function addElementToGroceries(ev) {
    let toFind = 'li'; // name of the tag we want to find.
    let currentElement = ev.target;
    while (toFind !== currentElement.tagName.toLowerCase() &&
        currentElement.tagName.toLowerCase() !== 'html') {
        currentElement = currentElement.parentNode;
    }
    let word = currentElement.textContent;
    word = word.substring(0, word.indexOf('+'))
    //Now we add the ingredient to the grocery list
    listGroceries(word);
  }
  
  //functions for setupRecipes to display lists
  const listGroceries = (ingredients) => {
    //Make a container to hold all of the lists for each ingredient
    let html = "";
    for (let i = 0; i < lengthOfRecipe; i++) {
      let li = `
      <li class="recipesLi ingredient">${ingredients[i]}<p class="right removeIngredient" style="display: inline;">
          -
          </p>
       
      </li>`;
      html += li;
    }
    return html;
  };




  // // This listens for a click anywhere on the dom, looking specifically for 
// //my .addIngredient class paragraphs
// document.addEventListener('click', () => {
//   let paragraph = document.querySelectorAll('.addIngredient');
//   paragraph.forEach(p => {
//       p.addEventListener('click', findElement);
//   });
// });
// // Then once it is found, it bubbles up the node tree until it finds my li
// // containing the ingredient value  which will then use the substring method
// // to chop off everything besides the ingredient
// function findElement(ev) {
//   let toFind = 'li'; // name of the tag we want to find.
//   let currentElement = ev.target;
//   while (toFind !== currentElement.tagName.toLowerCase() &&
//       currentElement.tagName.toLowerCase() !== 'html') {
//       currentElement = currentElement.parentNode;
//   }
//   let word = currentElement.textContent;
//   word = word.substring(0, word.indexOf('+'))

//   console.log(word);
// }





