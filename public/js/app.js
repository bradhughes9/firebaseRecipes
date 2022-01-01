document.addEventListener("DOMContentLoaded", event => {
  const app = firebase.app();
  const db = firebase.firestore();
  const myPost = db.collection('posts').doc('firstpost');

  myPost.get()
    .then(doc => {
      const data = doc.data();
      document.write( data.title + `<br>`)
      document.write( data.CreatedAt)
      
    })
});

function googleLogin() {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
    
    .then(result => {
      const user = result.user;
      document.write(`Hello there, ${user.displayName}!`);
      console.log(user)
    })
    .catch(console.log)
}

