<?php
    // 
    if( $_SERVER['SERVER_NAME'] == 'wellcome-pathways.clearleft.com' )
        $docRoot = '/home/clearleft/subdomains/wellcome-pathways';
    else
        $docRoot = $_SERVER['DOCUMENT_ROOT'];

    include($docRoot.'/_includes/Spyc.php');
    include $docRoot.'/_includes/config.php';

    $config_yml = spyc_load_file($docRoot.'/_includes/config.yaml');
    $library_db = spyc_load_file('db.yaml');

    // Config
    $pathway    = 'mindcraft';
    $module     = 'esdaile';
    $path       = $config_yml['site']['pathways'][$pathway]['path'];


    $teaser = array(
        'image' => 'teaser-svengali.jpg',
        'link'  => $path.'5-svengali',
        'title' => 'Dark forces'
    );

    include($docRoot.'/_includes/module.php');