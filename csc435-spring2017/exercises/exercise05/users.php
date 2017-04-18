<?php
  //Connect to the database named "ClassDemo" that is hosted locally
  $host = "localhost";
  $user = "root";
  $password = "";

  $mysqli = new mysqli($host, $user, $password, "exercise05");
  if ($mysqli->connect_errno) {
    die("Error: " . $mysqli->connect_errno);
  }

  //Get all entries for 'name' and 'age' from the Users table in the "ClassDemo" database
  $sql = "SELECT band1 FROM users";
  $result = $mysqli->query($sql);

  //Loop through every entry and it out print out
  if($result->num_rows >= 1) {
    while($row = $result->fetch_assoc()) {
      $band = $row['band1'];
      echo "<p>$band</p>";
    }
  }
?>
