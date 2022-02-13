<!-- Stephanie - created entire file for controller -->

<?php

 $postjobposting = file_get_contents("php://input");
    $request = json_decode($postjobposting);
    $title = $request->title;
    $description = $request->description;
    $salary = $request->salary;
    $location = $request->location;
    $email = $request->email;
    $category = $request->category;
    $link = $request->link;

  $getjobposting = file_get_contents("php://input");
    $request = json_decode($getjobposting);

  $getjobpostingbycategory = file_get_contents("php://input");
    $request = json_decode($getjobpostingbycategory);
    $category = $request->category;

  $postjobcategory = file_get_contents("php://input");
    $request = json_decode($postjobcategory);
    $title = $request->title;
    $description = $request->description;

  $getjobcategories = file_get_contents("php://input");
    $request = json_decode($getjobcategories);

  $getjobpostingbyid = file_get_contents("php://input");
    $request = json_decode($getjobpostingbyid);
    $jobib = $request->jobib;


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

// post job postings
$sql = "INSERT INTO jobopenings (title, description, salary , location, email, category, link)
VALUES ($title, $description, $salary , $location, $email, $category, $link)";

if ($link->query($sql1) === TRUE) {
    echo "New job opening record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $link->error;
}

// get job postings
$sql2 = "SELECT * FROM jobopenings";

if ($link->query($sql2) === TRUE) {
    echo "Job openings retrieved";
} else {
    echo "Error: " . $sql . "<br>" . $link->error;
}

// get job postings by category
$sql3 = "SELECT * FROM jobopenings WHERE category = $category";

if ($link->query($sql3) === TRUE) {
    echo "Retrieved job openings by category";
} else {
    echo "Error: " . $sql . "<br>" . $link->error;
}

// post job category
$sql4 = "INSERT INTO jobcategories (category) VALUES ($category)";

if ($link->query($sql4) === TRUE) {
  echo "New category created successfully";
} else {
  echo "Error: " . $sql . "<br>" . $link->error;
}

// get job categories
$sql5 = "SELECT DISTINCT category FROM jobcategories";

if ($link->query($sql5) === TRUE) {
  echo "Job categories selected successfully";
} else {
  echo "Error: " . $sql . "<br>" . $link->error;
}

// get job posting with specific ID
$sql6 = "SELECT * from jobopenings WHERE jobid = $jobid";

if ($link->query($sql6) === TRUE) {
  echo "Job posting retrieved successfully";
} else {
  echo "Error: " . $sql . "<br>" . $link->error;
}

$link->close();
?>
