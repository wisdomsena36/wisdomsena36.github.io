// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBteZ5EXw0fce-w2ukFt6SxEBICx1MUb6g",
    authDomain: "teacherspromotionexam.firebaseapp.com",
    databaseURL: "https://teacherspromotionexam-default-rtdb.firebaseio.com",
    projectId: "teacherspromotionexam",
    storageBucket: "teacherspromotionexam.appspot.com",
    messagingSenderId: "105385618739",
    appId: "1:105385618739:web:da6b09de5d50cf4474a246",
    measurementId: "G-S53BMGXHNQ"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
