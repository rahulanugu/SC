<!-- Stephanie - created entire PHP file for controller -->

<?php

 $postcaregiverdata = file_get_contents("php://input");
    $request = json_decode($postcaregiverdata);
    $firstName = $request->firstName;
    $lastName = $request->lastName;
    $email = $request->email;
    $message = $request->message;


$dbhost = $_SERVER['database-1.cgurbeaohou6.us-east-2.rds.amazonaws.com'];
$dbport = $_SERVER['3306'];
$dbname = $_SERVER['scriptchain'];
$charset = 'utf8' ;

// Create linkection
$link = new mysqli($dbhost, $_SERVER['admin'], $_SERVER['Scriptchain21'], $_SERVER['scriptchain'], $_SERVER['3306']);
// Check linkection
if ($link->linkect_error) {
    die("linkection failed: " . $link->linkect_error);
}

$sql = "INSERT INTO caregivers (firstName, lastName, email, message)
VALUES ($fname, $lname, $email , $message)";

if ($link->query($sql) === TRUE) {
    echo "New caregiver record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $link->error;
}

$link->close();
?>
