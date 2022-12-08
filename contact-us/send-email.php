<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
$fname = $_POST["name"];
$lname = $_POST["last-name"];
$email = $_POST["email"];
$phone = $_POST["phone"];
$company = $_POST["company"];
$contact_message = $_POST["message"];
$cr = $_POST["contact-reason"];

if ($cr == 3) {
    $subject = "I have a general inquiry";
} elseif ($cr == 2) {
    $subject = "I’m an advertiser looking to promote my business on top digital platforms.";
} else {
    $subject = "I’m interested in partnership opportunities to monetize my platform’s advertising inventory.";
}

$message = "Email from: " . $fname ." ". $lname . "\r\n";
$message .= "Email address: " . $email . "\r\n";
$message .= "Phone: " . $phone . "\r\n";
$message .= "Company: " . $company . "\r\n";
$message .= "Message: \r\n";
$message .= nl2br($contact_message);
$message .= "\r\n ----- \r\nThis email was sent from your site " . "bitspearhead.com" . "'s contact form. \r\n";

$from="info@bitspearhead.com";
$to="info@bitspearhead.com";
mail($to,$subject, $message);


header("Location: mail-success.html");
?>