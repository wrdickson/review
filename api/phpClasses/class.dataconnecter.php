<?php
/*
class.dataconnecter.php
*/
class DataConnecter {
	public static function getConnection(){
		try {
		   $pdo = new PDO('mysql:host=' . DB_HOST .';dbname=' . DB_NAME, DB_USER, DB_PASS);
			return $pdo;
		} catch (PDOException $e) {
		    return "Error!: " . $e->getMessage() . "<br/>";
		    die();
		}	
	}
}


