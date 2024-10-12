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
$signupUsername = $_POST['username'];
$signupPassword = $_POST['password'];

// Validate the input
if (empty($signupUsername) || empty($signupPassword)) {
    echo "Username and password are required.";
    exit;
}

// Hash the password
$hashedPassword = password_hash($signupPassword, PASSWORD_BCRYPT);

// Prepare and execute the SQL statement
$stmt = $conn->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
$stmt->bind_param("ss", $signupUsername, $hashedPassword);

if ($stmt->execute()) {
    echo "Signup successful!";
} else {
    echo "Error: " . $stmt->error;
}

// Close the statement and connection
$stmt->close();
$conn->close();
?>
