import firebase from "firebase";

const config = {
  apiKey: "AIzaSyCTXi6-sBMZKOcaK9nZypOdvmU1bYtgjuk",
  authDomain: "seven-wonders-duel-5f11e.firebaseapp.com",
  databaseURL: "https://seven-wonders-duel-5f11e.firebaseio.com",
  projectId: "seven-wonders-duel-5f11e",
  storageBucket: "seven-wonders-duel-5f11e.appspot.com",
  messagingSenderId: "982459435072"
};

const fb = firebase.initializeApp(config);

export { fb };
