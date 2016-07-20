
<?php
//error_reporting(E_ALL); ini_set('display_errors', 1);
require 'PHPMailer-master/PHPMailerAutoload.php';

function emailPdf($to, $recipientName, $pdfName) {
    
 
$storeFolder = '/pdfOut/pdfOutput/';   //2
$upOne = realpath(__DIR__ . '/..');
$file = $storeFolder.$pdfName;

$mail = new PHPMailer;
$mail->IsSendmail(); // telling the class to use SendMail transport
//$mail->SMTPDebug = 3;                               // Enable verbose debug output

/*$mail->isSMTP(true);                                      // Set mailer to use SMTP
$mail->Host = 'isabella.secure.kgix.net;isabella.secure.kgix.net';  // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'no-reply@folio.cards';                 // SMTP username
$mail->Password = 'vm0pfu3rzch8';                           // SMTP password
$mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465;                                    // TCP port to connect to*/

//$mail->setFrom('no-reply@folio.cards', 'Mailer');

$mail->setFrom('proofs@folio.cards', 'Folio Cards');
$mail->addAddress($to);     // Add a recipient
//$mail->addReplyTo('chris@gorak.net', 'Information');
echo $mail->addAttachment($upOne.$storeFolder.$pdfName, $pdfName);
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
    
    /*if(file_exists('model_name.pdf'))
    {
        echo $to;
        echo $recipientName;
        echo $file;        
        
    }*/

    
//$mail->addAttachment('model_name.pdf');    // Optional name
//$binary_content = file_get_contents('model_name.pdf');
    
//Use the === (strict) operator to
// check $binary_content for false.
/*if ($binary_content) {
   throw new Exception("Could not fetch remote content from: 'model_name.pdf'");
}*/
    

$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Folio Card PDF generated';
$mail->Body    = 'Dear '.$recipientName.' <br /><br /> Thank you for using Folio Cards, the generated PDF is in the attachement.<br /><br /><br /><br />PDF @ Folio Cards';
$mail->AltBody = 'Dear '.$recipientName.' Thank you for using Folio Cards, the generated PDF is in the attachement.';

//$mail->addAttachment("download.pdf", $name = 'Name_for_pdf',  $encoding = 'base64', $type = 'application/pdf');         // Add attachments
    
if(!$mail->send()) {
    //echo 'Message could not be sent.';
    echo 'Mailer Error: ' . $mail->ErrorInfo;
} else {
    echo 'Message has been sent';
}

    
}

?>

