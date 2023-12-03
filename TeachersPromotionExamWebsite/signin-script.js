function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    auth.signInWithPopup(provider)
        .then((result) => {
            console.log("Google Sign-In successful", result.user);
            // Redirect to the main quiz page after successful sign-in
            window.location.href = 'quiz.html';
        })
        .catch((error) => {
            console.error("Google Sign-In failed", error.message);
        });
}
