<?php
/**
 * Step 1: Require the Slim Framework
 *
 * If you are not using Composer, you need to require the
 * Slim Framework and register its PSR-0 autoloader.
 *
 * If you are using Composer, you can skip this step.
 */

//ini_set('display_errors', 1);
require 'Slim/Slim.php';
use \Slim\Slim AS Slim;
\Slim\Slim::registerAutoloader();

// Swift Mailer library will be required. lib folder is available in source code.
//require_once 'SwiftMailer/swift_required.php';

/**
 * Step 2: Instantiate a Slim application
 *
 * This example instantiates a Slim application using
 * its default settings. However, you will usually configure
 * your Slim application now by passing an associative array
 * of setting names and values into the application constructor.
 */
$app = new \Slim\Slim();

/**
 * Step 3: Define the Slim application routes
 *
 * Here we define several Slim application routes that respond
 * to appropriate HTTP request methods. In this example, the second
 * argument for `Slim::get`, `Slim::post`, `Slim::put`, `Slim::patch`, and `Slim::delete`
 * is an anonymous function.
 */

$app->get('/mail/', 'sendMail');
$app->get('/users/', 'getUsers');
$app->get('/user/:id', 'getUser');
$app->post('/add_modelPerson', 'addModelPerson');
$app->get('/modelPersons/', 'getModelPersons');
$app->post('/uploadImageFront', 'uploadFrontImage');
$app->put('/update_modelPerson/:id', 'updateModelPerson');//expects id of 1
//$app->post('/add_game', 'createGame');
//$app->delete('/deleteGameEntrant/:entrantID/:gameID', 'deleteGameEntrant');


function getUser($userName) {
	$sql = "select * FROM t_users WHERE username='$userName' ORDER BY username";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);  
		$wines = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo json_encode($wines);
	} catch(PDOException $e) {
		echo json_encode('{"error":{"text":'. $e->getMessage() .'}}'); 
	}
};

function getUsers() {
  $sql = "select * FROM t_users ORDER BY id";
  try {
    $db = getConnection();
    $stmt = $db->query($sql);  
    $wines = $stmt->fetchAll(PDO::FETCH_OBJ);
    $db = null;
    echo json_encode($wines);
  } catch(PDOException $e) {
    echo json_encode('{"error":{"text":'. $e->getMessage() .'}}'); 
  }
};


function sendMail() {
    // Create the Transport. we can put ip instead of smtp.example.org if we are on intranet.
    $transport = Swift_SmtpTransport::newInstance('smtp.example.org', 25)
      ->setUsername('your username')
      ->setPassword('your password')
      ;

    // Sendmail
    $transport = Swift_SendmailTransport::newInstance('/usr/sbin/sendmail -bs');
    // Mail
    $transport = Swift_MailTransport::newInstance();
    
    // Create the Mailer using your created Transport
    $mailer = Swift_Mailer::newInstance($transport);
    
    // Subject of the Message
    $message = Swift_Message::newInstance('Subject is Crewow Free Web Tutorials');
    
    // Address of Sender will be written in setFrom Function
    $message->setFrom(array('info@crewow.com' => 'Furqan Aziz'));
    
    // Address of the recipients will be written in setTo 
    $message->setTo(array('receiver@domain.org', 'other@domain.org' => 'A name'));
    
    
    //Below code can be used to attached excel. you can attach any file you want like pdf zip or any other. 
    //$message->attach(Swift_Attachment::fromPath('Excel/SampeFile.xls'));
    
    // Send the message
    $result = $mailer->send($message);
};



function uploadFrontImage() {//works
    $response = array();//Create new response
    
    $request = Slim::getInstance()->request();
	$image = json_decode($request->getBody());
    
	$response['status'] = "success";
    echo json_encode($response);
}


/*function getGameEntrants($gameId) {
//$sql = "select * FROM g_game_entrants WHERE game_id='$gameId' ORDER BY game_id";
$sql = "SELECT g_entrants.id, f_name, l_name, email, x1, x2, x3, x4, x5, y1, y2, y3, y4, y5 FROM g_entrants, g_game_entrants WHERE g_game_entrants.game_id=".$gameId." AND (g_entrants.id = g_game_entrants.entrant_id) ORDER BY l_name";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);  
		$entrantsJ = $stmt->fetchAll(PDO::FETCH_OBJ);         
		$db = null;
		echo json_encode($entrantsJ);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
};*/


//Gets all the registered entrants for all games 
/*function getAllGamesEntrants() {
$sql = "SELECT g_game_entrants.game_id, g_date, g_entrants.id, f_name, l_name, email FROM g_games, g_game_entrants, g_entrants WHERE g_entrants.id = g_game_entrants.entrant_id AND (g_games.id = g_game_entrants.game_id) ORDER BY g_game_entrants.game_id";
//$sql = "SELECT g_entrants.id, g_games.id, f_name, l_name, email, g_date FROM g_entrants, g_game_entrants, g_games WHERE (g_entrants.id = g_game_entrants.entrant_id) ORDER BY g_date";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);  
		$entrantsJ = $stmt->fetchAll(PDO::FETCH_OBJ);         
		$db = null;
		echo json_encode($entrantsJ);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
};*/



function addModelPerson() {//works
    $response = array();//Create new response
	$request = Slim::getInstance()->request();
	$entrant = json_decode($request->getBody());
    //var_dump(json_encode($entrant));
	$sqlEntrant = "INSERT INTO t_model_persons (model_Name, height, hair, eyes, bust, waist, hips, shoes, uploaded_front_img_name, uploaded_back_img_name, scale, scaleFactor, groupX, groupY, rotation, quantity, reference, imageMatrix, textColor) VALUES (:model_Name, :height, :hair, :eyes, :bust, :waist, :hips, :shoes, :uploaded_front_img_name, :uploaded_back_img_name, :scale, :scaleFactor, :groupX, :groupY, :rotation, :quantity, :reference, :imageMatrix, :textColor)";
  
	try {
		$db = getConnection();    
        $db->beginTransaction();    
		$stmt = $db->prepare($sqlEntrant);  
        $stmt->bindParam("model_Name", $entrant->modelName);
		$stmt->bindParam("height", $entrant->height);
		$stmt->bindParam("hair", $entrant->hair);
		$stmt->bindParam("eyes", $entrant->eyes);
        $stmt->bindParam("bust", $entrant->bust);        
        $stmt->bindParam("waist", $entrant->waist);
        $stmt->bindParam("hips", $entrant->hips);
        $stmt->bindParam("shoes", $entrant->shoes);
        $stmt->bindParam("uploaded_front_img_name", $entrant->uploadedFrontImgName);
        $stmt->bindParam("uploaded_back_img_name", $entrant->uploadedBackImgName);   
        $stmt->bindParam("scale", $entrant->scale);
        $stmt->bindParam("scaleFactor", $entrant->scaleFactor);
        $stmt->bindParam("groupX", $entrant->groupX);
        $stmt->bindParam("groupY", $entrant->groupY);   
        $stmt->bindParam("rotation", $entrant->rotation);   
        $stmt->bindParam("quantity", $entrant->quantity);   
        $stmt->bindParam("reference", $entrant->reference);   
        $stmt->bindParam("imageMatrix", $entrant->imageMatrix);   
        $stmt->bindParam("textColor", $entrant->textColor);   
		$stmt->execute();
        $entrant->id = $db->lastInsertId();        
        $db->commit();
        $db = null;        
      
        $response['status'] = "success";
		echo json_encode($response); 
	} catch(PDOException $e) {   
        $db->rollback();
        $db = null;        
        $response['status'] = "error";
		$response['message'] = $e->getMessage();
		echo json_encode($response); 
	}
}

//Updates the splash screen modelPerson 
function updateModelPerson($id) {
    $response = array();
     //var_dump($id);
   // var_dump($request->getBody());
	$request = Slim::getInstance()->request();
	$entrant = json_decode($request->getBody());   
    //var_dump($entrant);
	$sql = "UPDATE t_model_persons SET model_Name=:model_Name, height=:height, hair=:hair, eyes=:eyes, bust=:bust, waist=:waist, hips=:hips, shoes=:shoes, uploaded_front_img_name=:uploaded_front_img_name, uploaded_back_img_name=:uploaded_back_img_name, scale=:scale, scaleFactor=:scaleFactor, groupX=:groupX, groupY=:groupY, rotation=:rotation, quantity=:quantity, reference=:reference, imageMatrix=:imageMatrix, textColor=:textColor WHERE id=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
        $stmt->bindParam("model_Name", $entrant->modelName);
		$stmt->bindParam("height", $entrant->height);
		$stmt->bindParam("hair", $entrant->hair);
		$stmt->bindParam("eyes", $entrant->eyes);
        $stmt->bindParam("bust", $entrant->bust);        
        $stmt->bindParam("waist", $entrant->waist);
        $stmt->bindParam("hips", $entrant->hips);
        $stmt->bindParam("shoes", $entrant->shoes);
        $stmt->bindParam("uploaded_front_img_name", $entrant->uploadedFrontImgName);
        $stmt->bindParam("uploaded_back_img_name", $entrant->uploadedBackImgName); 
        $stmt->bindParam("scale", $entrant->scale);
        $stmt->bindParam("scaleFactor", $entrant->scaleFactor);
        $stmt->bindParam("groupX", $entrant->groupX);
        $stmt->bindParam("groupY", $entrant->groupY);  
        $stmt->bindParam("rotation", $entrant->rotation);  
        $stmt->bindParam("quantity", $entrant->quantity);   
        $stmt->bindParam("reference", $entrant->reference); 
        $stmt->bindParam("imageMatrix", $entrant->imageMatrix); 
        $stmt->bindParam("textColor", $entrant->textColor); 
        $stmt->bindParam("id", $id);
       // var_dump($stmt);
		$stmt->execute();		
		$db = null;        
        $response['status'] = "success";
		echo json_encode($response); 
	} catch(PDOException $e) {
        $response['status'] = "error";
		$response['message'] = $e->getMessage();
		echo json_encode($response); 
	}
}


function getModelPersons() {
  $sql = "select * FROM t_model_persons ORDER BY id";
  try {
    $db = getConnection();
    $stmt = $db->query($sql);  
    $wines = $stmt->fetchAll(PDO::FETCH_OBJ);
    $db = null;
    echo json_encode($wines);
  } catch(PDOException $e) {
    echo json_encode('{"error":{"text":'. $e->getMessage() .'}}'); 
  }
};


/*function createGame() {//works
	$request = Slim::getInstance()->request();
	$game = json_decode($request->getBody());
   // var_dump(json_encode($game));
	$sql = "INSERT INTO g_games ( main_pic_url, ball_pic_url, ball_x, ball_y, g_date) VALUES (:main_pic_url, :ball_pic_url, :ball_x, :ball_y, :g_date)";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
        $stmt->bindParam("main_pic_url", $game->main_pic_url);
		$stmt->bindParam("ball_pic_url", $game->ball_pic_url);
		$stmt->bindParam("ball_x", $game->ball_x);
		$stmt->bindParam("ball_y", $game->ball_y);
        $stmt->bindParam("g_date", $game->g_date);
		$stmt->execute();
		$game->id = $db->lastInsertId();
		$db = null;        
		echo json_encode($game); 
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}*/





/**
 * ------------------------------------------------------------------------
 *
 * ADMIN API 
 * 
 * -------------------------------------------------------------------------
 */




/*function deleteGameEntrant($entrantID, $gameID) {
    $response = array();        
    $sql1 = "DELETE FROM g_game_entrants WHERE entrant_id=:id AND game_id=:game_id";
    try {
        $db = getConnection();
        $stmt1 = $db->prepare($sql1);
        $stmt1->bindParam("id", $entrantID);
        $stmt1->bindParam("game_id", $gameID);
        $stmt1->execute();        
        $db = null;
        $response['status'] = "success";
		echo json_encode($response); 
    } catch(PDOException $e) {
        $response['status'] = "error";
		$response['message'] = $e->getMessage();
		echo json_encode($response); 
    }
}*/







    
    
    
    
//local Settings
/*function getConnection() {
	$dbhost="localhost";
	$dbuser="root";
	$dbpass="";
	$dbname="hive_cards";
	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	return $dbh;
};*/


//Server settings 
function getConnection() {
	$dbhost="localhost";
	$dbuser="root";
	$dbpass="root";
	$dbname="hive_cards";
	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	return $dbh;
};

//Server settings next
/*function getConnection() {
	$dbhost="localhost";
	$dbuser="folio_next";
	$dbpass="}S0GPTuFR..T";
	$dbname="folio_gorak_mac";
	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	return $dbh;
};*/






// POST route
$app->post(
    '/post',
    function () {
        echo 'This is a POST route';
    }
);

// PUT route
$app->put(
    '/put',
    function () {
        echo 'This is a PUT route';
    }
);

// PATCH route
$app->patch('/patch', function () {
    echo 'This is a PATCH route';
});

// DELETE route
$app->delete(
    '/delete',
    function () {
        echo 'This is a DELETE route';
    }
);

/**
 * Step 4: Run the Slim application
 *
 * This method should be called last. This executes the Slim application
 * and returns the HTTP response to the HTTP client.
 */
$app->run();
