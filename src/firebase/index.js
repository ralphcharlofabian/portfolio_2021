import firebase from 'firebase/app'
import 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBBpPAZ3RPiYw-PN9p1-VOll3QvmU5xQxU",
  authDomain: "pts-app-e4ba0.firebaseapp.com",
  databaseURL: "https://pts-app-e4ba0.firebaseio.com",
  projectId: "pts-app-e4ba0",
  storageBucket: "pts-app-e4ba0.appspot.com",
  messagingSenderId: "7781952983",
  appId: "1:7781952983:web:3b1aad1ec82f7b73006f92"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase