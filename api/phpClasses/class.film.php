<?php
Class Film {
    public $id;
    public $film_name;
	public $film_length;
	public $genre;
    public $festival_year;
    public $review_pwd;
    public $review_url;
    public $executive_producer;
    public $producer;
    public $producer_other;
    public $executive_director;
    public $director;
    public $director_other;
    public $music;
    public $sound;
    public $website;
    public $special_instructions;
    public $press_kit;
    public $press_links;
    public $short_synopsis;
    public $long_synopsis;
    public $writing;
    public $other_credits;
    public $terms;
    
    public function __construct ($id) {
        //get properties from db
        $pdo = DataConnecter::getConnection();
        $stmt = $pdo->prepare("SELECT * FROM films WHERE id = :id");
        $stmt->bindParam(":id",$id,PDO::PARAM_INT);
        $stmt->execute();
        while($obj = $stmt->fetch(PDO::FETCH_OBJ)){
            $this->id = $obj->id;
            $this->film_name = $obj->film_name;
			$this->film_length = $obj->film_length;
			$this->genre = $obj->genre;
            $this->festival_year = $obj->festival_year;
            $this->review_pwd = $obj->review_pwd;
            $this->review_url = $obj->review_url;
            $this->executive_producer = $obj->executive_producer;
            $this->producer = $obj->producer;
            $this->producer_other = $obj->producer_other;
            $this->executive_director = $obj->executive_director;
            $this->director = $obj->director;
            $this->director_other = $obj->director_other;
            $this->music = $obj->music;
            $this->sound = $obj->sound;
            $this->website = $obj->website;
            $this->special_instructions = $obj->special_instructions;
            $this->press_kit = $obj->press_kit;
            $this->press_links = $obj->press_links;
            $this->short_synopsis = $obj->short_synopsis;
            $this->long_synopsis = $obj->long_synopsis;
            $this->writing = $obj->writing;
            $this->other_credits = $obj->other_credits;
            $this->terms = $obj->terms;
        }
    }
    
    public function dumpArray() {
        $arr = array();
        $arr['id'] = $this->id;
        $arr['film_name'] = $this->film_name;
		$arr['film_length'] = $this->film_length;
		$arr['genre'] = $this->genre;
        $arr['festival_year'] = $this->festival_year;
        $arr['review_pwd'] = $this->review_pwd;
        $arr['review_url'] = $this->review_url;
        $arr['executive_producer'] = $this->executive_producer;
        $arr['producer'] = $this->producer;
        $arr['producer_other'] = $this->producer_other;
        $arr['executive_director'] = $this->executive_director;
        $arr['director'] = $this->director;
        $arr['director_other'] = $this->director_other;
        $arr['music'] = $this->music;
        $arr['sound'] = $this->sound;
        $arr['website'] = $this->website;
        $arr['special_instructions'] = $this->special_instructions;
        $arr['press_kit'] = $this->press_kit;
        $arr['press_links'] = $this->press_links;
        $arr['short_synopsis'] = $this->short_synopsis;
        $arr['long_synopsis'] = $this->long_synopsis;
        $arr['writing'] = $this->writing;
        $arr['other_credits'] = $this->other_credits;
        $arr['terms'] = $this->terms;        
        return $arr;
    }
    
    public function update() {
        //this presumes that the new properties have been set
        $pdo = DataConnecter::getConnection();
        $stmt = $pdo->prepare("UPDATE films SET film_name = :film_name, film_length = :film_length, genre = :genre, festival_year = :festival_year, review_pwd = :review_pwd, review_url = :review_url, executive_producer = :executive_producer, producer = :producer, producer_other = :producer_other, executive_director = :executive_director, director = :director, director_other = :director_other, music = :music, sound = :sound, website = :website, special_instructions = :special_instructions, press_kit = :press_kit, press_links = :press_links, short_synopsis = :short_synopsis, long_synopsis = :long_synopsis, writing = :writing, other_credits = :other_credits, terms = :terms WHERE id = :id");
        $stmt->bindParam(":film_name",$this->film_name, PDO::PARAM_STR);
		$stmt->bindParam(":film_length", $this->film_length, PDO::PARAM_INT);
		$stmt->bindParam(":genre", $this->genre, PDO::PARAM_STR);
        $stmt->bindParam(":id", $this->id, PDO::PARAM_STR);
        $stmt->bindParam(":festival_year", $this->festival_year, PDO::PARAM_STR);
        $stmt->bindParam(":review_pwd", $this->review_pwd, PDO::PARAM_STR);
        $stmt->bindParam(":review_url", $this->review_url , PDO::PARAM_STR);
        $stmt->bindParam(":executive_producer", $this->executive_producer , PDO::PARAM_STR);
        $stmt->bindParam(":producer", $this->producer , PDO::PARAM_STR);
        $stmt->bindParam(":producer_other", $this->producer_other , PDO::PARAM_STR);
        $stmt->bindParam(":executive_director", $this->executive_director , PDO::PARAM_STR);
        $stmt->bindParam(":director", $this->director , PDO::PARAM_STR);
        $stmt->bindParam(":director_other", $this->director_other , PDO::PARAM_STR);
        $stmt->bindParam(":music", $this->music , PDO::PARAM_STR);
        $stmt->bindParam(":sound", $this->sound , PDO::PARAM_STR);
        $stmt->bindParam(":website", $this->website , PDO::PARAM_STR);
        $stmt->bindParam(":special_instructions", $this->special_instructions , PDO::PARAM_STR);
        $stmt->bindParam(":press_kit", $this->press_kit , PDO::PARAM_STR);
        $stmt->bindParam(":press_links", $this->press_links , PDO::PARAM_STR);
        $stmt->bindParam(":short_synopsis", $this->short_synopsis , PDO::PARAM_STR);
        $stmt->bindParam(":long_synopsis", $this->long_synopsis , PDO::PARAM_STR);
        $stmt->bindParam(":writing", $this->writing , PDO::PARAM_STR);
        $stmt->bindParam(":other_credits", $this->other_credits , PDO::PARAM_STR);
        $stmt->bindParam(":terms", $this->terms , PDO::PARAM_STR);
        $result = $stmt->execute();
        return $result;        
    }
    
    public static function addFilm ($data) {
    
    }

}