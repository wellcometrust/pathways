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
    $pathway    = 'the-collectors';
    $module     = 'unceasing-seeker';
    $path       = $config_yml['site']['pathways'][$pathway]['path'];


    $teaser = array(
        'image' => '',
        'link'  => $path.'5-obscene-doctor/index.php',
        'title' => 'Example teaser title'
    );

    include($docRoot.'/_includes/module.php');