
<?php
require 'PHPMailer-master/PHPMailerAutoload.php';

$ds          = DIRECTORY_SEPARATOR;  //1
 
$storeFolder = '../../images/uploads';   //2

if(!empty($_POST['data'])){
    
$mail = new PHPMailer;
//$mail->SMTPDebug = 3;                               // Enable verbose debug output

//$mail->isSMTP();                                      // Set mailer to use SMTP
//$mail->Host = 'smtp1.example.com;smtp2.example.com';  // Specify main and backup SMTP servers
//$mail->SMTPAuth = true;                               // Enable SMTP authentication
//$mail->Username = 'user@example.com';                 // SMTP username
//$mail->Password = 'secret';                           // SMTP password
//$mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
//$mail->Port = 587;                                    // TCP port to connect to

$mail->setFrom('chris@gorak.net', 'Mailer');
$mail->addAddress('chris@gorak.net', 'ME ME');     // Add a recipient
$mail->addReplyTo('chris@gorak.net', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');

$tempFile = $_POST['data'];
//var_dump($tempFile['pdfContent']);
    
//attachment files path array
$file = base64_decode($tempFile['pdfContent']);
    
$targetPath = dirname( __FILE__ ) . $ds. $storeFolder . $ds;  //4
    
    if (!file_exists($targetFile)) {
    // echo "The file $filename exists";
    // This will overwrite even if the file exists
        move_uploaded_file($file,$targetFile); //6
       var_dump("New file saved");
    }else
    {
        unlink($targetFile);
        move_uploaded_file($file,$targetFile);
        var_dump( "File was overrided");
    } 

var_dump($file);

//$mail->addAttachment('download.pdf');         // Add attachments
$mail->addAttachment($file, 'name.pdf');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Model Pdf';
$mail->Body    = 'This is the HTML message body <b>in bold!</b>';
$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

if(!$mail->send()) {
    echo 'Message could not be sent.';
    echo 'Mailer Error: ' . $mail->ErrorInfo;
} else {
    echo 'Message has been sent';
}
    
} else {
    echo "No Data Found";
} 


