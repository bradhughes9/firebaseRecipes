//Track auth status
auth.onAuthStateChanged((user) => {
  if (user) {
    //Using the database with db to get recipes
    db.collection("recipes")
      .get()
      .then((snapshot) => {
        setupRecipes(snapshot.docs);
        setupUI(user);
      });
  } else {
    setupUI();
    setupRecipes([]);
  }
});

// Creating a new recipe
const createForm = document.querySelector("#create-form");
createForm.addEventListener("submit", (e) => {
  e.preventDefault();

  db.collection('recipes').add({
    title: createForm['title'].value,
    ingredients: createForm['content'].value
  })
    .then( () => {
      console.log(`Your recipe ${createForm['title'].value} has been added.`);
      const modal = document.querySelector("#modal-create-form");
      M.Modal.getInstance(modal).close();
      createForm.reset();
    })
});

//signup
const signupForm = document.querySelector("#signup-form");
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //get user info
  const email = signupForm["signup-email"].value;
  const password = signupForm["signup-password"].value;

  //sign up the user
  auth.createUserWithEmailAndPassword(email, password).then((cred) => {
    const modal = document.querySelector("#modal-signup");
    M.Modal.getInstance(modal).close();
    signupForm.reset();
  });
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
    signupForm.reset();
  });
});
