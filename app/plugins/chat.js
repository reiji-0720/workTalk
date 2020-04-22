import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyD1fbpc-QlvFpHEmuiN_9lpfAMt-U7HL_U",
    authDomain: "chatworktalk.firebaseapp.com",
    databaseURL: "https://chatworktalk.firebaseio.com",
    projectId: "chatworktalk",
    storageBucket: "chatworktalk.appspot.com",
    messagingSenderId: "654842612789",
    appId: "1:654842612789:web:935e92dede906fd0c0f57c"
  })
}

export default firebase
