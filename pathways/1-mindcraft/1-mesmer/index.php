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
    $module     = 'mesmer';
    $path       = $config_yml['site']['pathways'][$pathway]['path'];
    $root       = (!empty($_SERVER['HTTPS']) ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'];

    $teaser = array(
        'image' => 'teaser-jtm.jpg',
        'link'  => $path.'2-airloom/',
        'title' => 'A machine to control the mind'
    );

    $audio = 'paris_atmosphere';

    include($docRoot.'/_includes/module.php');