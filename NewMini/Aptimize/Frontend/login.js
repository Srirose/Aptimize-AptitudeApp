console.log("Script loaded successfully");

// const firebaseConfig = {
//     apiKey: "your-key",
//     authDomain: "aptimize-aptitude-app.firebaseapp.com",
//     projectId: "aptimize-aptitude-app",
//     storageBucket: "aptimize-aptitude-app.appspot.com",
//     messagingSenderId: "343077561993",
//     appId: "YOUR_APP_ID",
//   };

//   firebase.initializeApp(firebaseConfig);


document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");

    if (loginForm) { // Check if form exists
        loginForm.addEventListener("submit", async function (event) {
            event.preventDefault(); // Prevent page reload

            const email = document.getElementById("loginEmail").value;
            const password = document.getElementById("loginPassword").value;

            try {
                const response = await fetch("http://localhost:5000/auth/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();

                if (response.ok) {
                    alert(data.message);
                    localStorage.setItem("userEmail",data.userEmail);
                    window.location.href = "home.html"; // Redirect to dashboard
                } else {
                    alert(data.message);
                }
            } catch (error) {
                console.error("Login error:", error);
                alert("Login failed. Try again.");
            }
        });
    } else {
        console.error("Login form not found!");
    }
});

// document.getElementById("google-login").addEventListener("click", async () => {
//     const provider = new firebase.auth.GoogleAuthProvider();
//     try {
//       const result = await firebase.auth().signInWithPopup(provider);
//       const user = result.user;
//       console.log("Google login successful:", user);
  
//       // Send token to backend
//       const idToken = await user.getIdToken();
//       await fetch("http://localhost:5000/api/google-login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({ token: idToken })
//       });
  
//       // Redirect or show success
//       window.location.href = "home.html";
//     } catch (error) {
//       console.error("Google login error:", error);
//     }
//   });
  
// import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// const provider = new GoogleAuthProvider();

// signInWithPopup(auth, provider)
//   .then((result) => {
//     const user = result.user;
//     console.log("User signed in:", user);
//     // Proceed with your app
//   })
//   .catch((error) => {
//     console.error("Google login failed:", error);
//   });
