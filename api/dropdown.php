
<?php
  header('Content-Type: application/json; charset=utf-8');
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Methods: GET');
  header("Access-Control-Allow-Headers: X-Requested-With");
  error_reporting(E_ERROR | E_PARSE);
// Read the JSON file 
$json = file_get_contents('category.json');

// Display data
print($json);
  
?>