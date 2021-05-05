import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

firebase.initializeApp({
  apiKey: "AIzaSyAIVQhrzd5UOrS-GrPIZpp5mMpfHl6q3Gc",
  authDomain: "html-game-c3db6.firebaseapp.com",
  databaseURL: "https://html-game-c3db6-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "html-game-c3db6",
  storageBucket: "html-game-c3db6.appspot.com",
  messagingSenderId: "127534098236",
  appId: "1:127534098236:web:ecd6f69f4e8e51ca68e039",
  measurementId: "G-2EZ9H6D181"
});

// console.log(process.env.VUE_APP_FIREBASE_API_KEY);

const fs: any = firebase.firestore();

const google: firebase.auth.AuthProvider = new firebase.auth.GoogleAuthProvider();
const github: firebase.auth.AuthProvider = new firebase.auth.GithubAuthProvider();

export default {
    firebase,
    fs,
    google,
    github,
}