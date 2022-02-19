//Track auth status
auth.onAuthStateChanged((user) => {
  if (user) {
    db.collection("recipes").onSnapshot(
      (snapshot) => {
        setupRecipes(snapshot.docs);
        setupUI(user);
      },
      (err) => console.log(err.message)
    );
    db.collection("groceries").onSnapshot(
      (snapshot) => {
        setupGroceries(snapshot.docs);
      },
      (err) => console.log(err.message)
    )
  } else {
    setupUI();
    setupRecipes([]);
  }
});

// Creating a new recipe
const createForm = document.querySelector("#create-form");
createForm.addEventListener("submit", (e) => {
  e.preventDefault();
  db.collection("recipes")
    .add({
      title: createForm["title"].value,
      ingredients: ingredientHelper(),
    })
    .then(() => {
      const modal = document.querySelector("#modal-create");
      M.Modal.getInstance(modal).close();
      createForm.reset();
    })
    .catch((err) => {
      console.log(err.message);
    });
});


/* FOR ADDING GROCERY */

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
  word = word.substring(0, word.indexOf('add'))
  //Now we add the ingredient to the grocery list
  
  db.collection("groceries")
  .add({
    title: word,
  })
  .catch((err) => {
    console.log(err.message);
  });
}


/* FOR removing GROCERY */

// This listens for a click anywhere on the dom, looking specifically for 
//my .addIngredient class paragraphs
document.addEventListener('click', () => {
  let paragraph = document.querySelectorAll('.removeIngredient');
  paragraph.forEach(p => {
      p.addEventListener('click', removeElementFromGroceries);
  });
});

// Then once it is found, it bubbles up the node tree until it finds my li
// containing the ingredient value  which will then use the substring method
// to chop off everything besides the ingredient
function removeElementFromGroceries(ev) {
  let toFind = 'li'; // name of the tag we want to find.
  let currentElement = ev.target;
  while (toFind !== currentElement.tagName.toLowerCase() &&
      currentElement.tagName.toLowerCase() !== 'html') {
      currentElement = currentElement.parentNode;
  }
  let word = currentElement.textContent;
  console.log(word)
  word = word.substring(0, word.indexOf('remove'))
  word.trim()
  console.log(word)

  //Now we add the ingredient to the grocery list
  
  db.collection("groceries").doc("word").delete().then(() => {
    console.log("Document successfully deleted!");
  }).catch((error) => {
      console.error("Error removing document: ", error);
  });
}






//signup
const signupForm = document.querySelector("#signup-form");
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //get user info
  const email = signupForm["signup-email"].value;
  const password = signupForm["signup-password"].value;

  //sign up the user
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((cred) => {
      return db.collection("users").doc(cred.user.uid).set({
        bio: signupForm["signup-bio"].value,
        email: cred.user.email
      });
    })
    .then(() => {
      const modal = document.querySelector("#modal-signup");
      M.Modal.getInstance(modal).close();
      signupForm.reset();
      signupForm.querySelector('.error').innerHTML = '';
    }).catch(err => {
      signupForm.querySelector('.error').innerHTML = err.message;
    })
});

//Logout
const logout = document.querySelector("#logout");
logout.addEventListener("click", (e) => {
  e.preventDefault();
  auth.signOut();
});

//Login
const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get login info
  const email = loginForm["login-email"].value;
  const password = loginForm["login-password"].value;

  auth.signInWithEmailAndPassword(email, password).then(() => {
    const modal = document.querySelector("#modal-login");
    M.Modal.getInstance(modal).close();
    loginForm.reset();
    loginForm.querySelector('.error').innerHTML = '';
  }).catch(err => {
    loginForm.querySelector('.error').innerHTML = err.message;
  })
});