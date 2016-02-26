<?php
Class Films {
	
	public static function addFilm(){
		$pdo = DataConnecter::getConnection();
		$stmt = $pdo->prepare("INSERT INTO films () VALUES ()");
		$stmt->execute();
		$returnId = $pdo->lastInsertId();
		return $returnId;
	}

    public static function getFilmsByYear($year){
        $response = array();
        $response['year'] = $year;
        $response['films'] = array();
		$response['reviews'] = array();
        $response['user'] = $_SESSION['miffUserId'];
        $response['userPerm'] = $_SESSION['miffUserPerm'];
        //get properties from db
        $pdo = DataConnecter::getConnection();
        $stmt = $pdo->prepare("SELECT id, title, screener, screenerpass FROM filminfo WHERE festivalyear = :year ORDER BY title");
        $stmt->bindParam(":year", $year, PDO::PARAM_STR);
        $stmt->execute();
		//this is an array of all films with this festivalyear
		//will be used below to find reviews for this year
		$filmsByYear = array();
        while($obj = $stmt->fetch(PDO::FETCH_OBJ)){
			//add it to the filmsByYear array
			array_push($filmsByYear, $obj->id);
            $iFilm = array();
            $iFilm['id'] =  $obj->id;	
            $iFilm['title'] =  $obj->title;
			$iFilm['screener'] = $obj->screener;
			$iFilm['screenerpass'] = $obj->screenerpass;
            array_push($response['films'], $iFilm);
        };
		//now get an array of all reviews with an array of userId as value
		$reviews = array();
		$stmt = $pdo->prepare("SELECT film, reviewer FROM reviews");
		$stmt->execute();
		while($obj = $stmt->fetch(PDO::FETCH_OBJ)){
			//first, check that this review is for a film in filmsByYear array
			if(in_array($obj->film, $filmsByYear)){
				//check if the array key (filmId) exists already
				if(array_key_exists($obj->film, $reviews)){
					array_push($reviews[$obj->film], intval($obj->reviewer));
				}else{
					$reviews[$obj->film] = array(intval($obj->reviewer));
				}
			}
		}
		$response['reviews'] = $reviews;
        return $response;
    }
	
	public static function getFilmsByYearWithReviews($year) {
        $response = array();
        $response['year'] = $year;
        $response['films'] = array();
		$response['reviews'] = array();
        //get properties from db
        $pdo = DataConnecter::getConnection();
		//get all films for the year
        $stmt = $pdo->prepare("SELECT id, title, screener, screenerpass FROM filminfo WHERE festivalyear = :year ORDER BY title");
        $stmt->bindParam(":year", $year, PDO::PARAM_STR);
        $stmt->execute();
		//this is an array of all films with this festivalyear
		//will be used below to find reviews for this year
		$filmsByYear = array();
        while($obj = $stmt->fetch(PDO::FETCH_OBJ)){
			//add it to the filmsByYear array
			array_push($filmsByYear, $obj->id);
            $iFilm = array();
            $iFilm['id'] =  $obj->id;	
            $iFilm['title'] =  $obj->title;
			$iFilm['screener'] = $obj->screener;
			$iFilm['screenerpass'] = $obj->screenerpass;
            array_push($response['films'], $iFilm);
        };
		//get an array of all usernames, indexed to their ids
		$stmt = $pdo->prepare("SELECT id, user_name FROM users");
		$stmt->execute();
		$usersArr = array();
		while($obj = $stmt->fetch(PDO::FETCH_OBJ)){
				$usersArr[$obj->id] = $obj->user_name;
		}
		//now get an array of all reviews with an array of userId as value
		$reviews = array();
		$stmt = $pdo->prepare("SELECT * FROM reviews");
		$stmt->execute();
		while($obj = $stmt->fetch(PDO::FETCH_OBJ)){
			//first, check that this review is for a film in filmsByYear array
			if(in_array($obj->film, $filmsByYear)){
				//check if the array key (filmId) exists already
				//make an array of the review
				$iReview = array();
				$iReview['id'] = $obj->id;
				$iReview['film'] = $obj->film;
				$iReview['reviewer'] = $obj->reviewer;
				$iReview['reviewer_name'] = $usersArr[$obj->reviewer];
				$iReview['rating'] = $obj->rating;
				$iReview['review'] = $obj->review;
				$iReview['lastUpdate'] = $obj->last_update;
				if(array_key_exists($obj->film, $reviews)){
					array_push($reviews[$obj->film], $iReview);
				}else{
					$reviews[$obj->film] = array($iReview);
				}
			}
		}
		$response['reviews'] = $reviews;
        return $response;		
	}
}