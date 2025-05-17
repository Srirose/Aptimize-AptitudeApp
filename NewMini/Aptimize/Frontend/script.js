// Add event listener to the signup form
document.getElementById('signupForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent default form submission

    // Get the input values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Prepare the data to be sent to the backend
    const userData = { name, email, password };

    try {
        // Send a POST request to the backend API
        const response = await fetch('http://localhost:5000/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });

        const data = await response.json();

        if (response.status === 200) {
            alert("Signup successful!");
            window.location.href = "home.html"; // Redirect to home page after successful signup
        } else {
            alert(data.message); // Display the error message
        }
    } catch (error) {
        console.error("Error during signup:", error);
        alert("Something went wrong, please try again.");
    }
});
