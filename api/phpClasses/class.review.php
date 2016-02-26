<?php
Class Review {
	public $id;
	public $film;
    public $reviewer;
    public $rating;
    public $review;
	public $last_update;
    
	
	
	
    public function __construct($reviewId) {
		$pdo = DataConnecter::getConnection();
		$stmt = $pdo->prepare("SELECT * FROM reviews WHERE reviewer = :reviewId");
		$stmt->bindParam(":reviewId", $reviewId, PDO::PARAM_INT);
		$stmt->execute();
		while($obj = $stmt->fetch(PDO::FETCH_OBJ)){
			$this->id = $obj->id;
			$this->film = $obj->film;
			$this->reviewer = $obj->reviewer;
			$this->rating = $obj->rating;
			$this->review = $obj->review;
			$this->last_update = $obj->last_update;
		}
    }
    
    public function dumpArray() {
        $arr = array();
		$arr['id'] = $this->id;
		$arr['film'] = $this->film;
        $arr['reviewer'] = $this->reviewer;
        $arr['rating'] = $this->rating;
        $arr['review'] = $this->review;
		$arr['last_update'] = $this->last_update;
		return $arr;
    }
	
	public static function getReviews($filmId){
		$response = array();
        $pdo = DataConnecter::getConnection();
        $stmt = $pdo->prepare("SELECT * FROM reviews WHERE film = :film ORDER BY last_update");
        $stmt->bindParam(":film", $filmId, PDO::PARAM_INT);
        $stmt->execute();
        while($obj = $stmt->fetch(PDO::FETCH_OBJ)){
			$reviewArr = array();
			$reviewArr['id'] = $obj->id;
			$reviewArr['reviewer'] = $obj->reviewer;
			$iPerson = new Person($obj->reviewer);
			$reviewArr['reviewer_name'] = $iPerson->get_username();
			$reviewArr['rating'] = $obj->rating;
			$reviewArr['review'] = $obj->review;
			$reviewArr['last_update'] = $obj->last_update;
			array_push($response, $reviewArr);
		}
		return $response;
	}	
	
	public static function getUserReviews ($userId) {
		$reviewsArr = array();
		$pdo = DataConnecter::getConnection();
		$stmt = $pdo->prepare("SELECT * FROM reviews INNER JOIN filminfo ON reviews.film = filminfo.id WHERE reviewer = :userId");
		$stmt->bindParam(":userId", $userId, PDO::PARAM_INT);
		$stmt->execute();		
		while($obj = $stmt->fetch(PDO::FETCH_OBJ)){
			$iReview = array();
			$iReview['id'] = $obj->id;
			$iReview['film'] = $obj->film;
			$iReview['reviewer'] = $obj->reviewer;
			$iReview['rating'] = $obj->rating;
			$iReview['review'] = $obj->review;
			$iReview['last_update'] = $obj->last_update;
			$iReview['title'] = $obj->title;
			array_push($reviewsArr, $iReview);
		}
		return $reviewsArr;
	}		
	
	public static function saveReview($filmId, $userId, $rating, $review){
		$pdo = DataConnecter::getConnection();
		$stmt = $pdo->prepare("INSERT INTO reviews (film, reviewer, rating, review, last_update) VALUES (:film, :reviewer, :rating, :review, NOW())");
		$stmt->bindParam(":film", $filmId, PDO::PARAM_INT);
		$stmt->bindParam(":reviewer", $userId, PDO::PARAM_INT);
		$stmt->bindParam(":rating", $rating, PDO::PARAM_INT);
		$stmt->bindParam(":review", $review, PDO::PARAM_STR);
		$success = $stmt->execute();
		return $success;
	}
	
	public function updateReview(){
		$pdo = DataConnecter::getConnection();
		$stmt = $pdo->prepare("UPDATE reviews SET review = :review, rating = :rating, last_update = NOW() WHERE film = :film AND reviewer = :reviewer");
		$stmt->bindParam(":film", $this->film, PDO::PARAM_INT);
		$stmt->bindParam(":reviewer", $this->reviewer, PDO::PARAM_INT);
		$stmt->bindParam(":rating", $this->rating, PDO::PARAM_INT);
		$stmt->bindParam(":review", $this->review, PDO::PARAM_STR);
		$success = $stmt->execute();
		$rowCount = $stmt->rowCount();
		if($rowCount == 1){
			$success = true;
		}else{
			$success = false;
		}
		return $success;		
	}

}