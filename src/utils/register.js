import firebase from "firebase/app";
// import firebaseConfig from "../utils/firebaseConfig";

// firebase.initializeApp(firebaseConfig);

console.log(firebase.test);

const registerMember = (e, email, password) => {
  e.preventDefault();
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((result) => {
      console.log(result);
    })
    .catch(function (error) {
      console.log(error.message);
    });
};

export { registerMember };
