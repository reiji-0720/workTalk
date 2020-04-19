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


export default firebase