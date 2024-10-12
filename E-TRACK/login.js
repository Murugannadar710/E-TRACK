document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    if (validateLogin(username, password)) {
        // Create a FormData object to send the form data
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);

        // Send the data using fetch API
        fetch('login.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(result => {
            if (result.includes('Login successful!')) {
                alert(result); // Show the server response
                window.location.href = 'modules/home.html'; // Redirect to home page
            } else {
                showError('login-error', result); // Show error message
            }
        })
        .catch(error => console.error('Error:', error));
    }
});

function validateLogin(username, password) {
    const usernameError = 'Username cannot be empty.';
    const passwordError = 'Password cannot be empty.';

    // Validate username
    if (!username || username === '') {
        showError('login-error', usernameError);
        return false;
    }

    // Validate password
    if (!password || password === '') {
        showError('login-error', passwordError);
        return false;
    }

    // Clear any previous errors if all fields are valid
    showError('login-error', '');
    return true;
}

function showError(elementId, message) {
    document.getElementById(elementId).innerText = message;
}
