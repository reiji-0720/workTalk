import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyD0Qdh7lrEBMW4fBwQEPjX3da7ld1SG_EM",
    authDomain: "login-worktalk.firebaseapp.com",
    databaseURL: "https://login-worktalk.firebaseio.com",
    projectId: "login-worktalk",
    storageBucket: "login-worktalk.appspot.com",
    messagingSenderId: "915432062466",
    appId: "1:915432062466:web:997ac7d1623b70b162b11b"
  })
}

var user = firebase.auth().currentUser;
var name, email, photoUrl, uid, emailVerified;

if (user != null) {
  name = user.displayName;
  email = user.email;
  photoUrl = user.photoURL;
  emailVerified = user.emailVerified;
  uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                   // this value to authenticate with your backend server, if
                   // you have one. Use User.getToken() instead.
}


export default firebase