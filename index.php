<?php 
    session_start();
    define('BASE_URL', "http://localhost/review/");
    define('BASE_ROOT', "review");
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    
    <meta charset="utf-8">
    <title>Moab International Film Festival - Reviewers</title>
    <!-- for Bootstrap -->
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!--
    NOTE: because of the routing from maps/:id, we need to use absolute urls, boo!
    -->  
    <link rel="stylesheet" href="<?php echo BASE_URL?>assets/css/application.css">
    <link rel="stylesheet" href="<?php echo BASE_URL?>assets/js/vendor/bootstrap/dist/css/bootstrap.css">
    <link rel="stylesheet" href="<?php echo BASE_URL?>assets/js/vendor/bootstrap/dist/css/bootstrap-theme.min.css"> 
    <link rel="stylesheet" href="<?php echo BASE_URL?>assets/js/vendor/font-awesome-4.4.0/css/font-awesome.min.css">
	<link rel="stylesheet" href="<?php echo BASE_URL?>assets/js/vendor/DataTables/DataTables-1.10.10/css/jquery.dataTables.css">
	<link rel="stylesheet" href="<?php echo BASE_URL?>assets/js/vendor/tablesorter/themes/blue/style.css">

    <?php
        //get session user data if available
        //this is to handle the situation where a user refreshes or manually enters a url
        if(isset($_SESSION['miffUserId']) && isset($_SESSION['miffUserKey']) && isset($_SESSION['miffUserPerm'])){
        
        }else{
            $_SESSION['miffUserId'] = 0;
            $_SESSION['miffUserKey'] = 0;
            $_SESSION['miffUsername'] = "Guest";
            $_SESSION['miffUserPerm'] = 0;
        }
        $miffUser = array();
        $miffUser['miffUserId'] = $_SESSION['miffUserId'];
        $miffUser['miffUserKey'] = $_SESSION['miffUserKey'];
        $miffUser['miffUserName'] = $_SESSION['miffUsername'];
        $miffUser['miffUserPerm'] = $_SESSION['miffUserPerm'];
        
        $userJson = json_encode($miffUser);
        //send mtoUser (global!) to javascript
        echo"<script>var miffUser= " . $userJson . ";</script>";

        //send BASE_URL (global!) to javascript
        echo"<script>var miffBaseUrl = '" . BASE_URL . "';</script>";
        //mtoRoot is needed by router(s)
        echo"<script>var miffRoot = '" . BASE_ROOT . "';</script>";
		//tell js the year
		echo"<script>var miffCurrentYear = '" .  date('Y')  . "';</script";
    ?>
  </head>
  <body>
            <nav id="mtoNav" role="navigation" class="navbar navbar-inverse navbar-fixed-top">
                <div class="navbar-header">
                    <button type="button" data-target="#navbarCollapse" data-toggle="collapse" class="navbar-toggle">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a href="#" class="navbar-brand navbar-logged-in">Moab Film Festival</a>
                </div>
                <div id="navbarCollapse" class="collapse navbar-collapse">
                    <ul id="miffNavbar" class="nav navbar-nav">
                        <li id="miffLoginNav" class="hidden"><a id = "miffLoginA" href="">Login</a></li>
                        <li id = "miffUserNav" class="dropdown hidden">
                            <a id="userNavA" data-toggle="dropdown" class="dropdown-toggle" href="#">MyUser<b class="caret"></b></a>
                            <ul role="menu" class="dropdown-menu">
                                <li><a id="userLogoff" href="">Logoff</a></li>
                            </ul>                
                        </li>
						<li id="addFilmNav" class="hidden"><a href="">Add Film</a></li>
                        <li id = "festYear" class="dropdown">
                            <a id="yearSelect" data-toggle="dropdown" class="dropdown-toggle" href="">Year<b class="caret"></b></a>
                            <ul role="menu" class="dropdown-menu">
                                <li><a id="y2015" class="mYearSelect" fyear="2015" href="">2015</a></li>
                                <li><a id="y2016" class="mYearSelect" fyear="2016" href="">2016</a></li>
								<li><a id="y2017" class="mYearSelect" fyear="2017" href="">2017</a></li>
								<li><a id="y2018" class="mYearSelect" fyear="2018" href="">2018</a></li>
								<li><a id="y2019" class="mYearSelect" fyear="2019" href="">2019</a></li>
								<li><a id="y2020" class="mYearSelect" fyear="2020" href="">2020</a></li>
                            </ul>                
                        </li>
						<li id="adminToggleLi" class="hidden"><a id="adminToggleA" href="">Admin Panel</a></li>
                    </ul>
					
                </div>
            </nav>
            <div class="container-fluid mainContent">
                <div class="row">
                    <div class="col-md-3 col-sm-4 " id="filmsListWrapper" >
                        <div id="filmListView">
                        </div>    
                    </div>
					<!-- change to col-md-9 for production -->
                    <div class="col-md-9 col-sm-8 " id="workslate">
                        <div  id="workslateContent">
                        </div>
                    </div>
                </div>
            </div>
			<div id="spinnerWrapper">
				<div id="spinner">
				</div>
			</div>
           
			<div id="dialogRegion"></div>
            
        	
            <script data-main="<?php echo BASE_URL?>assets/js/require_main.js" src="<?php echo BASE_URL?>assets/js/vendor/require.js"></script>
       
 	 <!--   
            <script src="<?php echo BASE_URL?>assets/js/build/compiled.js"></script>
       -->     
   </body>
</html>
