<?php

if( $_SERVER['SERVER_NAME'] == 'wellcome-pathways.clearleft.com' )
    $docRoot = '/home/clearleft/subdomains/wellcome-pathways';
else
    $docRoot = $_SERVER['DOCUMENT_ROOT'];

include_once($docRoot.'/_includes/page-data.php');

$page = PageBuilder::getPage('the-collectors', 'intro');

include_once($docRoot.'/_includes/intro.php');

?>
