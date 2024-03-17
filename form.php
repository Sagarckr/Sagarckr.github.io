<?php
//database connection
echo "test";
$servername = "localhost";
$username = "root";
$password = "";
$database = "sagar";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $name = $_POST['Name'];
    $email = $_POST['Email'];
    $message = $_POST['Message'];
    
    // SQL query to insert form data into table
    $sql = "INSERT INTO form (name, email, message) VALUES ('$name', '$email', '$message')";
    
    if ($conn->query($sql) === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

// Close connection
$conn->close();
?>