
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js'
import { getAuth, signOut, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js'
import { getDatabase, set, ref, update } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCbLtSWFjXunOQuERz-1j8OhVPTvcnlx_M",
  authDomain: "moving-puzzle-59a38.firebaseapp.com",
  databaseURL: "https://moving-puzzle-59a38-default-rtdb.firebaseio.com",
  projectId: "moving-puzzle-59a38",
  storageBucket: "moving-puzzle-59a38.appspot.com",
  messagingSenderId: "254800052748",
  appId: "1:254800052748:web:5cf0513e92fef9573c2429",
  measurementId: "G-0G9Q24BVJ1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

// signOut(auth).then(() => {
//     // Sign-out successful.
//   }).catch((error) => {
//     // An error happened.
//   });

document.getElementById("submit-btn").addEventListener("click", () => {
    const email = document.getElementById("emailR").value;
    const password = document.getElementById("passwordR").value;
    const username = document.getElementById("username").value;
    let err = "";
    if (password.length < 6) {
        err = "Minimal length of the password is 6 characters";
        alert(err);
        return;
    }

     createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                // ... user.uid
                set(ref(database, 'users/' + user.uid), {
                    email: email,
                    username: username,
                    password: password,
                    seconds: {
                        easy: 0,
                        medium: 0,
                        hard: 0},
                })
                    .then(() => {
                        // Data saved successfully!
                        alert('user created successfully');
        
                    })
                    .catch((error) => {
                        // The write failed...
                        alert(error);
                    });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
                alert(errorMessage);
            });
});

document.getElementById("login-btn").addEventListener("click", () => {
    const email = document.getElementById("emailL").value;
    const password = document.getElementById("passwordL").value;

    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    document.location.replace("/game.html");
   // alert("Hello " + user.username)
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = "Wrong credentials! " + error.message;
    alert(errorMessage)
  });


}); 


let login = document.getElementById("login-container");
let register = document.getElementById("register-container");
const removeText = "remove";

document.getElementById("go-sign-btn").addEventListener("click", () => {
login.classList.add(removeText);
register.classList.remove(removeText);
});

document.getElementById("go-log-btn").addEventListener("click", () => {
    register.classList.add(removeText);
    login.classList.remove(removeText);
    });
