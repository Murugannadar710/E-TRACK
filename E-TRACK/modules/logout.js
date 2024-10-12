document.addEventListener('DOMContentLoaded', function() {
    const logoutButton = document.getElementById('logoutButton');

    logoutButton.addEventListener('click', function() {
        // Show a confirmation popup
        const confirmation = confirm("Are you sure you want to log out?");
        
        // If the user confirms, proceed with logout
        if (confirmation) {
            // Assuming a session or token-based authentication
            // Clear user session or token here
            // Example: localStorage.removeItem('authToken');

            // Redirect to the login page
            window.location.href = '../login.html';
        }
    });
});
