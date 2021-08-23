import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const clientCredentials = {
  apiKey: "AIzaSyDFALPDfmCfA3Q3RfpWWBRyv7npwR4XSUI",
  authDomain: "huddle-b2842.firebaseapp.com",
  databaseURL:
    "https://huddle-b2842-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "huddle-b2842",
  storageBucket: "huddle-b2842.appspot.com",
  messagingSenderId: "511394988352",
  appId: "1:511394988352:web:974f9931795f5370a6faa5",
};

if (!firebase.apps.length) {
  firebase.initializeApp(clientCredentials);
}

export default firebase;
