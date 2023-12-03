
// // Replace these values with your Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyBteZ5EXw0fce-w2ukFt6SxEBICx1MUb6g",
//     authDomain: "teacherspromotionexam.firebaseapp.com",
//     databaseURL: "https://teacherspromotionexam-default-rtdb.firebaseio.com",
//     projectId: "teacherspromotionexam",
//     storageBucket: "teacherspromotionexam.appspot.com",
//     messagingSenderId: "105385618739",
//     appId: "1:105385618739:web:da6b09de5d50cf4474a246",
//     measurementId: "G-S53BMGXHNQ"
// };

// firebase.initializeApp(firebaseConfig);

// const auth = firebase.auth();
// const database = firebase.database();
// const quizRef = database.ref("tests/AD I Every Day Quiz/Quiz 101 : 10 Questions");
// let currentQuestion = 0;
// let score = 0;
// let timerSeconds = 8;
// let timerInterval;

// function startQuiz() {
//     timerInterval = setInterval(updateTimer, 1000);
//     loadQuestion();
// }

// function loadQuestion() {
//     quizRef.child("Questions").once("value", (snapshot) => {
//         const questions = snapshot.val();
//         if (currentQuestion < questions.length) {
//             const questionData = questions[currentQuestion];
//             const questionElement = document.getElementById("question");
//             const optionsElement = document.getElementById("options");

//             questionElement.textContent = `${currentQuestion + 1}. ${questionData.question}`;

//             optionsElement.innerHTML = "";
//             for (const option in questionData) {
//                 if (option.startsWith("opt_")) {
//                     const button = document.createElement("button");
//                     button.textContent = questionData[option];
//                     button.addEventListener("click", () => selectOption(questionData.answer, questionData[option]));
//                     optionsElement.appendChild(button);
//                 }
//             }
//         } else {
//             finishQuiz();
//         }
//     });
// }

// function selectOption(correctAnswer, selectedAnswer) {
//     if (selectedAnswer === correctAnswer) {
//         score++;
//     }
//     currentQuestion++;
//     loadQuestion();
// }

// function updateTimer() {
//     const timerElement = document.getElementById("timer");
//     timerElement.textContent = `Time: ${timerSeconds} seconds`;

//     if (timerSeconds <= 0) {
//         clearInterval(timerInterval);
//         finishQuiz();
//     } else {
//         timerSeconds--;
//     }
// }

// function submitQuiz() {
//     clearInterval(timerInterval);
//     finishQuiz();
// }

// function finishQuiz() {
//     const resultElement = document.getElementById("result");
//     const fractionScore = `${score}/${currentQuestion}`;
//     const percentageScore = `${((score / currentQuestion) * 100).toFixed(2)}%`;

//     resultElement.textContent = `Score: ${fractionScore} (${percentageScore})`;

//     quizRef.child("Questions").once("value", (snapshot) => {
//         const questions = snapshot.val();
//         const optionsElement = document.getElementById("options");

//         optionsElement.innerHTML = "";
//         for (let i = 0; i < questions.length; i++) {
//             const questionData = questions[i];
//             const correctAnswer = questionData.answer;
//             const selectedAnswer = i < currentQuestion ? questionData[`opt_${i + 1}`] : null;

//             const button = document.createElement("button");
//             button.textContent = `${i + 1}. ${questionData.question}`;
//             if (selectedAnswer === correctAnswer) {
//                 button.style.backgroundColor = "#4caf50"; // Green for correct answer
//             } else if (selectedAnswer !== null) {
//                 button.style.backgroundColor = "#f44336"; // Red for wrong answer
//             }
//             optionsElement.appendChild(button);
//         }
//     });
// }

// // Start the quiz when the page loads
// startQuiz();

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
const database = firebase.database();
const quizRef = database.ref("tests/AD I Every Day Quiz/Quiz 101 : 10 Questions");

let currentQuestion = 0;
let score = 0;
let timerMinutes = 8; // Adjust this based on the time from Firebase
let timerSeconds = timerMinutes * 60;
let timerInterval;

function startQuiz() {
    timerInterval = setInterval(updateTimer, 1000);
    loadQuestion();
}

function loadQuestion() {
    quizRef.child("Questions").once("value", (snapshot) => {
        const questions = snapshot.val();
        if (currentQuestion < questions.length) {
            const questionData = questions[currentQuestion];
            const questionElement = document.getElementById("question");
            const optionsElement = document.getElementById("options");

            questionElement.textContent = `${currentQuestion + 1}. ${questionData.question}`;

            optionsElement.innerHTML = "";
            for (const option in questionData) {
                if (option.startsWith("opt_")) {
                    const button = document.createElement("button");
                    button.textContent = questionData[option];
                    button.addEventListener("click", () => selectOption(questionData.answer, questionData[option]));
                    optionsElement.appendChild(button);
                }
            }
        } else {
            finishQuiz();
        }
    });
}

function selectOption(correctAnswer, selectedAnswer) {
    if (selectedAnswer === correctAnswer) {
        score++;
    }
    currentQuestion++;
    loadQuestion();
}

function updateTimer() {
    const timerElement = document.getElementById("timer");

    const minutes = Math.floor(timerSeconds / 60);
    const seconds = timerSeconds % 60;

    timerElement.textContent = `Time: ${minutes} minutes ${seconds} seconds`;

    if (timerSeconds <= 0) {
        clearInterval(timerInterval);
        finishQuiz();
    } else {
        timerSeconds--;
    }
}

function submitQuiz() {
    clearInterval(timerInterval);
    finishQuiz();
}

function finishQuiz() {
    const resultElement = document.getElementById("result");
    const fractionScore = `${score}/${currentQuestion}`;
    const percentageScore = `${((score / currentQuestion) * 100).toFixed(2)}%`;

    resultElement.textContent = `Score: ${fractionScore} (${percentageScore})`;

    quizRef.child("Questions").once("value", (snapshot) => {
        const questions = snapshot.val();
        const optionsElement = document.getElementById("options");

        optionsElement.innerHTML = "";
        for (let i = 0; i < questions.length; i++) {
            const questionData = questions[i];
            const correctAnswer = questionData.answer;
            const selectedAnswer = i < currentQuestion ? questionData[`opt_${i + 1}`] : null;

            const button = document.createElement("button");
            button.textContent = `${i + 1}. ${questionData.question}`;
            if (selectedAnswer === correctAnswer) {
                button.style.backgroundColor = "#4caf50"; // Green for correct answer
            } else if (selectedAnswer !== null) {
                button.style.backgroundColor = "#f44336"; // Red for wrong answer
            }
            optionsElement.appendChild(button);
        }
    });
}

function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    auth.signInWithPopup(provider)
        .then((result) => {
            console.log("Google Sign-In successful", result.user);
            startQuiz(); // Start the quiz after successful sign-in
        })
        .catch((error) => {
            console.error("Google Sign-In failed", error.message);
        });
}

// Uncomment the line below if you want to start the quiz immediately (optional)
startQuiz();
