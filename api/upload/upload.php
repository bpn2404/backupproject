<?php


$ds          = DIRECTORY_SEPARATOR;  //1
 
$storeFolder = '../../images/uploads';   //2
 
if (!empty($_FILES)) {
     
    $response = array();//Create new response
    $tempFile = $_FILES['file']['tmp_name'];          //3           
    $fileName = $_FILES['file']['name'];
      
    $targetPath = dirname( __FILE__ ) . $ds. $storeFolder . $ds;  //4
     
    $targetFile =  $targetPath. $_FILES['file']['name'];  //5
    
    if (!file_exists($targetFile)) {
    // echo "The file $filename exists";
    // This will overwrite even if the file exists
        move_uploaded_file($tempFile,$targetFile); //6
        $response['message'] = "New file saved";
    }else
    {
        unlink($targetFile);
        move_uploaded_file($tempFile,$targetFile);
        $response['message'] = "File was overrided";
    }   
    
         
	$response['status'] = "success";
    $response['fileName'] = $fileName;
    echo json_encode($response);
     
}else 
{
    $response = array();//Create new response     
	$response['status'] = "failure";
    $response['message'] = "File was not sent";
    echo json_encode($response);
}
?>  