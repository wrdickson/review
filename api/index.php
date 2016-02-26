<?php
session_start();
require "lib/Slim/Slim.php";    
require "config/config.php";
require "phpClasses/class.dataconnecter.php";
require "phpClasses/class.person.php";
require "phpClasses/class.logger.php";
require "phpClasses/class.film.php";
require "phpClasses/class.films.php";
require "phpClasses/class.review.php";

\Slim\Slim::registerAutoloader();

// create new Slim instance
$app = new \Slim\Slim();


//route the requests . . . 
$app->get('/users/:id', 'getUser');
$app->get('/users/', 'getAllUsers');
$app->get('/login/','login');
$app->get("/logoff/", "logoff");
$app->get('/films/', 'getFilms');
$app->get('/reviews/user/:id', 'getUserReviews');
$app->post('/films/:id', 'updateFilm');
$app->post('/films/', 'addFilm');
$app->post('/reviews/', 'addReview');
$app->post('/reviews/:id', 'updateReview');
$app->get('/reviews/:id', 'getReviews');
$app->post('/users/', 'addUser');
$app->post('/users/:id', 'updateUser');
$app->get('/reviewdata/', 'getReviewData');




//debug . . . 
$app->get('/tmodel/:id', 'getTmodel');
$app->post('/tmodel/', 'addTmodel');
$app->put('/tmodel/:id', 'updateTmodel');
$app->delete('/tmodel/:id', 'deleteTmodel');



function addTmodel () {
	$app = \Slim\Slim::getInstance();
	$params = json_decode($app->request->getBody(), true);
	$response['params'] = $params;
	foreach($params as $key=>$value){
		$response[$key] = $value;
	}	
	print json_encode($response);
}

function deleteTmodel($id) {
	print $id;
}

function getTmodel($id) {
	print $id;
}

function updateTmodel () {
	$app = \Slim\Slim::getInstance();
	//this is the key . . .it's json object coming across
	$params = json_decode($app->request->getBody(), true);
	$response['params'] = $params;
	foreach($params as $key=>$value){
		$response[$key] = $value;
	}
	
	print json_encode($response);
}


//functions . . .
function addFilm () {
	$app = \Slim\Slim::getInstance();
	$response = array();
	$response['params'] = $app->request->params();
	$params = $app->request->params();
	
	//add an empty film and get the new id
	//$response['newId'] = Films::addFilm();
	$newId = Films::addFilm();
	//instantiate the film and run an update on it
	$iFilm = new Film($newId);
    $iFilm->film_name = $params["film_name"];
	$iFilm->film_length = $params["film_length"];
	$iFilm->genre = $params["genre"];
    $iFilm->festival_year = $params["festival_year"];
    $iFilm->review_pwd = $params["review_pwd"];
    $iFilm->review_url = $params["review_url"];
    $iFilm->executive_producer = $params["executive_producer"];
    $iFilm->producer = $params["producer"];
    $iFilm->producer_other = $params["producer_other"];
    $iFilm->executive_director = $params["executive_director"];
    $iFilm->director = $params["director"];
    $iFilm->director_other = $params["director_other"];
    $iFilm->music = $params["music"];
    $iFilm->sound = $params["sound"];
    $iFilm->website = $params["website"];
    $iFilm->special_instructions = $params["special_instructions"];
    $iFilm->press_kit = $params["press_kit"];
    $iFilm->press_links = $params["press_links"];
    $iFilm->short_synopsis = $params["short_synopsis"];
    $iFilm->long_synopsis = $params["long_synopsis"];
    $iFilm->writing = $params["writing"];
    $iFilm->other_credits = $params["other_credits"];
    $iFilm->terms = $params["terms"]; 
	
    $response = $iFilm->update();
    print $response;	
	
}

function addReview() {
	$app = \Slim\Slim::getInstance();
	$params = $app->request->params();
	//$response = array();
	//$response['params'] = $params;
	//check that user doesn't already have a review for this film?
	
	//save off
	$filmId = $params['film']['id'];
	$userId = $params['user']['miffUserId'];
	$rating = $params['rating'];
	$review = $params['review'];
	
	//$response['pfi'] = $filmId;
	//$response['pui'] = $userId;
	//$response['rat'] = $rating;
	//$response['rev'] = $review;
	
	$response = Review::saveReview($filmId, $userId, $rating, $review); 
	
	print json_encode($response);
}

function addUser() {
	$app = \Slim\Slim::getInstance();
	$params = $app->request->params();
	$response = array();
	$response['params'] = $params;
	$response['session'] = $_SESSION;
	if($_SESSION['miffUserPerm'] > 6) {
		//add user to db
		$response['success'] = logger::createUser($params['pwd'], $params['name'], $params['email'], $params['phone'], $params['perm']);
	}	
	print json_encode($response['success']);
}
function getAllUsers(){
	$response = logger::getAllUsers();
	print $response;
}

function getFilms(){
	$app = \Slim\Slim::getInstance();
    $year = $app->request->params('year');
    $response = array();
    $response = Films::getFilmsByYear($year);
    print json_encode($response);
}

function getReviewData(){
	$app = \Slim\Slim::getInstance();
    $year = $app->request->params('year');
	$response = array();
	$response = Films::getFilmsByYearWithReviews($year);
	print json_encode($response);
}

function getReviews($filmId){
	$app = \Slim\Slim::getInstance();	
    //$filmId = $app->request->params('filmId');	
	$reviews = Review::getReviews($filmId);
	print json_encode($reviews);
}

function getUser($id){
	$iPerson = new Person($id);
	print $iPerson->dumpJson();
}

function getUserReviews($userId){
	$app = \Slim\Slim::getInstance();
    $params = $app->request->params();	
	$response = array();
	$response['params'] = $params;
	$response['reviews'] = Review::getUserReviews($userId);
	
	print json_encode($response);
}

function login(){ 
	$app = \Slim\Slim::getInstance();
    $username = $app->request->params('username');
    $pwd = $app->request->params('password');
    $result = Logger::check_login($username,$pwd);
    if($result['pass'] == 1){
        //this will persist user data if they refresh
        $_SESSION['miffUserId'] = $result['id'];
        $_SESSION['miffUserKey'] = $result['key'];
        $_SESSION['miffUsername'] = $result['username'];
        $_SESSION['miffUserPerm'] = $result['permission'];    
    }
	print json_encode($result);
}

function logoff(){
	$app = \Slim\Slim::getInstance();
    $id = $app->request->params('miffUserId');
    $key = $app->request->params('miffUserKey');
    $result = Logger::logoff($id, $key);
    //only reset if user logged off successfully with id and key,
    //otherwise, anyone could log anyone off through the api
    if($result['success'] == true){
        $_SESSION['miffUserId'] = 0;
        $_SESSION['miffUserKey'] = 0;
        $_SESSION['miffUsername'] = "Guest";
        $_SESSION['miffUserPerm'] = 0;     
    };
    print json_encode($result);
}
function updateFilm($id) {
	$app = \Slim\Slim::getInstance();
    
    $params = $app->request->params();
    //TODO validate
    
    $iFilm = new Film($params['id']);
    $iFilm->film_name = $params["film_name"];
    $iFilm->festival_year = $params["festival_year"];
	$iFilm->film_length = $params["film_length"];
	$iFilm->genre = $params["genre"];
    $iFilm->review_pwd = $params["review_pwd"];
    $iFilm->review_url = $params["review_url"];
    $iFilm->executive_producer = $params["executive_producer"];
    $iFilm->producer = $params["producer"];
    $iFilm->producer_other = $params["producer_other"];
    $iFilm->executive_director = $params["executive_director"];
    $iFilm->director = $params["director"];
    $iFilm->director_other = $params["director_other"];
    $iFilm->music = $params["music"];
    $iFilm->sound = $params["sound"];
    $iFilm->website = $params["website"];
    $iFilm->special_instructions = $params["special_instructions"];
    $iFilm->press_kit = $params["press_kit"];
    $iFilm->press_links = $params["press_links"];
    $iFilm->short_synopsis = $params["short_synopsis"];
    $iFilm->long_synopsis = $params["long_synopsis"];
    $iFilm->writing = $params["writing"];
    $iFilm->other_credits = $params["other_credits"];
    $iFilm->terms = $params["terms"]; 
    //TODO - clean /n, add slashes, strip tags?
    $response = $iFilm->update();
    print $response;
}
function updateReview($id){
	$app = \Slim\Slim::getInstance();
    $params = $app->request->params();
    //TODO validate
	$response = array();
	//$response['params'] = $params;
	$iReview = new Review($id);
	$iReview->film = $params['film']['id'];
	$iReview->reviewer = $params['user']['miffUserId'];
	$iReview->rating = $params['rating'];
	$iReview->review = $params['review'];
	$response['updatedReview'] = $iReview->dumpArray();
	$response['success'] = $iReview->updateReview();
	
	
	print json_encode($response);
}
function updateUser($id){
	$app = \Slim\Slim::getInstance();
    $params = $app->request->params();
    //TODO validate
	$response = array();
	$response['params'] = $params;
	if($_SESSION['miffUserPerm'] > 6) {
		//check if there's a pwd param
		if(array_key_exists("pwd", $params)){
			$response['hasPwd'] = true;
			$response['success'] = logger::updateUserPassword($id, $params['pwd']);
			//update with password
		}else{
			$response['hasPwd'] = false;
			//update without password
			$success = logger::updateUser($params['id'], $params['username'], $params['email'], $params['phone'], $params['permission']);
			$response['success'] = $success;
		}
		
	}

	print json_encode($response['success']);
}


$app->run();
