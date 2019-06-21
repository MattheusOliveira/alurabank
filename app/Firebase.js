import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

const settings = {timestampsInSnapshots: true};

var firebaseConfig = {
  apiKey: "AIzaSyBHkMU-cS27B1LuBytZPaMQmW59ABLSgfQ",
  authDomain: "alurabank.firebaseapp.com",
  databaseURL: "https://alurabank.firebaseio.com",
  projectId: "alurabank",
  storageBucket: "alurabank.appspot.com",
  messagingSenderId: "1020226055296",
  appId: "1:1020226055296:web:fd82f3bc785c88cc"
};
firebase.initializeApp(firebaseConfig);

firebase.firestore().settings(settings);

export default firebase;
