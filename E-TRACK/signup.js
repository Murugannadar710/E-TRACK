document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;

    if (validateSignup(username, password)) {
        // Create a FormData object to send the form data
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);

        // Send the data using fetch API
        fetch('signup.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(result => {
            alert(result); // Show the server response
            if (result.includes('Signup successful!')) {
                window.location.href = 'login.html'; // Redirect to login page
            }
        })
        .catch(error => console.error('Error:', error));
    }
});

function validateSignup(username, password) {
    const usernameError = 'Username cannot be empty.';
    const passwordError = 'Password cannot be empty.';
    const passwordLengthError = 'Password must be at least 4 characters long.';

    // Validate username
    if (!username || username === '') {
        showError('signup-error', usernameError);
        return false;
    }

    // Validate password
    if (!password || password === '') {
        showError('signup-error', passwordError);
        return false;
    }

    if (password.length < 4) {
        showError('signup-error', passwordLengthError);
        return false;
    }

    // Clear any previous errors if all fields are valid
    showError('signup-error', '');
    return true;
}

function showError(elementId, message) {
    document.getElementById(elementId).innerText = message;
}
