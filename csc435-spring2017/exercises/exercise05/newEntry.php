<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>New User Added</title>
  </head>
  <body>
  <p>Account Created!</p>
    <p>
    <?php
      $host = "localhost";
      $user = "root";
      $password = "";

      $mysqli = new mysqli($host, $user, $password, "exercise05");
      if ($mysqli->connect_errno) {
        die("Error: " . $mysqli->connect_errno);
      }

      $username = $_POST["username"];
      $password = $_POST["password"];
      $band1 = $_POST["band1"];
      $band2 = $_POST["band2"];
      $band3 = $_POST["band3"];

      $sql = "INSERT INTO users (username, password, band1, band2, band3) VALUES ('$username', '$password', '$band1', '$band2', '$band3')";
      $mysqli->query($sql);

      echo "Added entry for ($username, $password, $band1, $band2, $band3) to users database.";
    ?>
    </p>
  <a href="index.html">Return to log in.</a>
  </body>
</html>
