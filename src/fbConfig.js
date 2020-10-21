import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDauw_CwsoG2H8zaRqDeyA-kSh3ThCiK-Q",
  authDomain: "test-8cd63.firebaseapp.com",
  databaseURL: "https://test-8cd63.firebaseio.com",
  projectId: "test-8cd63",
  storageBucket: "test-8cd63.appspot.com",
  messagingSenderId: "639086697825",
  appId: "1:639086697825:web:dd0c4f293902b9909fb920"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;