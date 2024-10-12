<?php
// Database configuration
$servername = "localhost";
$username = "root"; // Replace with your database username
$password = "";     // Replace with your database password
$dbname = "E-TRACK";

// Create a connection to the database
$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the form data
$loginUsername = $_POST['username'];
$loginPassword = $_POST['password'];

// Validate the input
if (empty($loginUsername) || empty($loginPassword)) {
    echo "Username and password are required.";
    exit;
}

// Prepare and execute the SQL statement
$stmt = $conn->prepare("SELECT password FROM users WHERE username = ?");
$stmt->bind_param("s", $loginUsername);
$stmt->execute();
$stmt->store_result();

// Check if username exists
if ($stmt->num_rows > 0) {
    $stmt->bind_result($hashedPassword);
    $stmt->fetch();

    // Verify the password
    if (password_verify($loginPassword, $hashedPassword)) {
        echo "Login successful!";
    } else {
        echo "Invalid username or password.";
    }
} else {
    echo "Invalid username or password.";
}

// Close the statement and connection
$stmt->close();
$conn->close();
?>
