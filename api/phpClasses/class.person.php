<?php 

class Person {

    private $id;
    private $username;
    private $email;
	private $phone;
    private $permission;   
    private $registered;
    private $last_login;
    private $last_activity;
    private $key; 

    public function __construct($id){
        //handle the case of a non user
        if($id == 0){
        $this->id = 0;
        $this->username = "Guest";
        $this->email = "";
		$this->phone = "";
        $this->permission = 0;
        $this->registered = 0;
            $this->last_login = 0;
            $this->last_activity = 0;            
            $hData = "lookada" . json_encode(getdate()) . "saltysaltydog" . mt_rand();
        $this->key = hash('sha256', $hData);
        } else {
        //get properties from db
            $pdo = DataConnecter::getConnection();
            $stmt = $pdo->prepare("SELECT * FROM users WHERE id = :id");
            $stmt->bindParam(":id",$id,PDO::PARAM_INT);
            $stmt->execute();
            while($obj = $stmt->fetch(PDO::FETCH_OBJ)){
				$this->id = $obj->id;
				$this->username = $obj->user_name;
				$this->email = $obj->user_email;
				//$this->email = "protected";
				$this->phone = $obj->user_phone;
				$this->permission = $obj->user_perm;
				$this->registered = $obj->user_registered;
				$this->last_login = $obj->user_last_login;
				$this->last_activity = $obj->user_last_activity;
				$this->key = $obj->user_key;
            }
        }
    }

    public function dumpArray(){
        $arr = array();
        $arr['id'] = $this->id;
        $arr['username'] = $this->username;
        $arr['email'] = $this->email;
		$arr['phone'] = $this->phone;
        $arr['permission'] = $this->permission;
        $arr['registered'] = $this->registered;
        $arr['last_login'] = $this->last_login;
        $arr['last_activity'] = $this->last_activity;
        $arr['key'] = 'protected';
        return $arr;
    }

    public function get_id() {
        return $this->id;
    }

    public function get_username() {
        return $this->username;
    }
      
    public function get_email() {
        return $this->email;
    }

    public function set_password($password) {
        //hash the new password
        $password = hash('sha256', $password);
        $xid = $this->get_id();
        $pdo = DataConnecter::getConnection();
        $stmt = $pdo->prepare("UPDATE users SET user_pass = :passwd WHERE id = :xid");
        $stmt->bindParam(":passwd",$password,PDO::PARAM_STR);
        $stmt->bindParam(":xid",$xid,PDO::PARAM_INT);
        $result = $stmt->execute();
        //password is not kept on the object, so we don't need to reset
        return $result;
    }

    public function get_permission() {
        return $this->permission;
    }

    public function set_permission($permission) {
        $xid = $this->get_id();
        $pdo = DataConnecter::getConnection();
        $stmt = $pdo->prepare("UPDATE users SET user_perm = :newPerm WHERE id = :xid");
        $stmt->bindParam(":newPerm",$permission,PDO::PARAM_INT);
        $stmt->bindParam(":xid",$xid,PDO::PARAM_INT);
        $result = $stmt->execute();
        if ($result == true){
            $this->permission = $permission;
        }
        return $result;
    }
      
    public function get_date_created() {
        return $this->date_created;
    }
    
    public function get_key() {
        return $this->key;
    }

    public function updateActivity(){
        $pdo = DataConnecter::getConnection();
        $date = date("Y-m-d H:i:s");
        $stmt = $pdo->prepare("UPDATE users SET user_last_activity = NOW() WHERE id = :xid");
        $stmt->bindParam(":xid",$this->id,PDO::PARAM_STR);
        $result = $stmt->execute();
        if ($result == true){
            $this->last_acitivty = $date;
        }
        return $result;
    }

    public function verify_key($key1){
        if($key1 == $this->key){
            $this->updateActivity();
            return true;
        }else{
            return false;
        }
    }
}
?>
