<?php
//============================================================+
// File name   : example_058.php
// Begin       : 2010-04-22
// Last Update : 2013-05-14
//
// Description : Example 058 for TCPDF class
//               SVG Image
//
// Author: Nicola Asuni
//
// (c) Copyright:
//               Nicola Asuni
//               Tecnick.com LTD
//               www.tecnick.com
//               info@tecnick.com
//============================================================+

/**
 * Creates an example PDF TEST document using TCPDF
 * @package com.tecnick.tcpdf
 * @abstract TCPDF - Example: SVG Image
 * @author Nicola Asuni
 * @since 2010-05-02
 */

// Include the main TCPDF library (search for installation path).

require_once('tcpdf_include.php');

function generatePdfAndSave ($pdfName){
    

    // create new PDF document
$pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

//$pdf->setHeaderData('',0,'','',array(0,0,0), array(255,255,255) ); // This will hide the header line by applying white color to the line 

// set document information
$pdf->SetCreator(PDF_CREATOR);
$pdf->SetAuthor('Folio Cards');
$pdf->SetTitle('Model Card');
$pdf->SetSubject('Pdf output');
$pdf->SetKeywords('Folio Cards, PDF, Model Card');

// set default header data
//$pdf->SetHeaderData(PDF_HEADER_LOGO, PDF_HEADER_LOGO_WIDTH, PDF_HEADER_TITLE.' 058', PDF_HEADER_STRING);
// set header and footer fonts
//$pdf->setHeaderFont(Array(PDF_FONT_NAME_MAIN, '', PDF_FONT_SIZE_MAIN));
//$pdf->setFooterFont(Array(PDF_FONT_NAME_DATA, '', PDF_FONT_SIZE_DATA));

// set default monospaced font
$pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);

// set margins
$pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_TOP, PDF_MARGIN_RIGHT);
$pdf->SetHeaderMargin(PDF_MARGIN_HEADER);
$pdf->SetFooterMargin(PDF_MARGIN_FOOTER);

// set auto page breaks
$pdf->SetAutoPageBreak(FALSE, PDF_MARGIN_BOTTOM);

// set image scale factor
$pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);

// set some language-dependent strings (optional)
if (@file_exists(dirname(__FILE__).'/lang/eng.php')) {
	require_once(dirname(__FILE__).'/lang/eng.php');
	$pdf->setLanguageArray($l);
}

// ---------------------------------------------------------

// set font
$pdf->SetFont('helvetica', '', 10);

// add a page
$pdf->AddPage();

// NOTE: Uncomment the following line to rasterize SVG image using the ImageMagick library.
//$pdf->setRasterizeVectorImages(true);

$pdf->ImageSVG($file='svgdata.svg', $x=5, $y=5, $w='', $h='', $link='', $align='', $palign='', $border=0, $fitonpage=false);


// ---------------------------------------------------------

 //Close and output PDF document
 $pdf->Output(dirname(__FILE__).'/pdfOutput/'.$pdfName, 'F');

        if (file_exists(dirname(__FILE__).'/pdfOutput/'.$pdfName)) {
            //echo "pdfOutput true";
            return true;
        }else
        {
            //echo "pdfOutput false";
            return false;
        }
    
}

//============================================================+
// END OF FILE
//============================================================+
?>