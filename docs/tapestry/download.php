<?php
    // Settings & Includes
    if( $_SERVER['SERVER_NAME'] == 'wellcome-pathways.clearleft.com' )
        $docRoot = '/home/clearleft/subdomains/wellcome-pathways';
    else
        $docRoot = $_SERVER['DOCUMENT_ROOT'];

    include_once($docRoot.'/_includes/Spyc.php');
    include_once('functions.php');
    
    $config_yml = spyc_load_file($docRoot.'/_includes/config.yaml');

    // get the pathway from the url arguments
    if( isset($_GET['pathway']) ) {
        $pathway = $_GET['pathway'];
        export($pathway);
    }
    else {
        header('Location: /');
    }