<?php
  try{
    $myPDO = new PDO("psql:host=localhost, dbname=ftc_brewing", "adam", "" )
    echo "Connected TO Postgres";
     
  }catch(PDOException $e){
    echo $e->getMessage();
  }
?>