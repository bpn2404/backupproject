<?php
 
//Include the class which will actually generate the pdf
//error_reporting(E_ALL); ini_set('display_errors', 1);
require_once('generatePdf.php');
require_once('../email/mailer.php');

$storeFolder = '../../images/uploads/';
$copyFolder = '/images/uploads/';
$postData = file_get_contents('php://input');

    $request;
    $svgData;
    $sendEmail;
    $pdfName;
    $userEmail;
    $recipientName;



if($postData != null)
{
    $request = json_decode($postData);
    $svgData = $request->svgData;
    $imageName = $request->imageName;
    $pdfName = $request->pdfName;
    $sendEmail = $request->sendEmail;
    $userEmail = $request->userEmail;
    $recipientName = $request->recipientName;
}


//Try to copy a a main image from the uploaded directory to the images directory for pdfOut
/*$file = $storeFolder . $imageName;
$copyfile = $copyFolder . $imageName;*/

//var_dump($file);
//var_dump($copyfile);

/*if (!copy($file, $copyfile)) {
    echo "failed to copy $file...\n";
}*/


//echo $svgData;
//echo $data;


//$success = generatePdfAndSave($pdfName);
//echo $success;
if ($svgData != null)
{
    if(file_put_contents("svgdata.svg", $svgData) > 0)
    {
        $success = generatePdfAndSave($pdfName);
        
        if($success == true)
            {   
                echo "TRUE";
                emailPdf($userEmail, $recipientName, $pdfName);
            }else
            {
                echo "FALSE";
                //echo $success;
            }
        
        
    }else
    {
        echo "SVG data was not saved prior to pdfOutput";
    }
    //echo "Success";
} 
else 
{
  $svgData = null;
  echo "No SVG data found in POST request";
}
