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
    $module     = 'elliotson';
    $path       = $config_yml['site']['pathways'][$pathway]['path'];
    

    $teaser = array(
        'image' => 'teaser-esdaile.jpg',
        'link'  => $path.'4-esdaile',
        'title' => 'Mind over matter'
    );

    include($docRoot.'/_includes/module.php');