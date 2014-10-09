<?php
    // 
    if( $_SERVER['SERVER_NAME'] == 'wellcome-pathways.clearleft.com' )
        $docRoot = '/home/clearleft/subdomains/wellcome-pathways';
    else
        $docRoot = $_SERVER['DOCUMENT_ROOT'];

    include($docRoot.'/_includes/Spyc.php');
    

    $config_yml = spyc_load_file($docRoot.'/_includes/config.yaml');
    $library_db = spyc_load_file('db.yaml');

    // Config
    $pathway    = 'mindcraft';
    $module     = 'freud';
    $path       = $config_yml['site']['pathways'][$pathway]['path'];
    $root       = (!empty($_SERVER['HTTPS']) ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'];

    $teaser = array(
        'image' => '',
        'link'  => $path.'credits.php',
        'title' => 'Credits'
    );

    include($docRoot.'/_includes/module.php');