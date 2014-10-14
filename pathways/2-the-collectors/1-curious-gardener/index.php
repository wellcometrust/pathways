<?php
    // 
    if( $_SERVER['SERVER_NAME'] == 'wellcome-pathways.clearleft.com' )
        $docRoot = '/home/clearleft/subdomains/wellcome-pathways';
    else
        $docRoot = $_SERVER['DOCUMENT_ROOT'];

    include_once($docRoot.'/_includes/Spyc.php');
    

    $config_yml = spyc_load_file($docRoot.'/_includes/config.yaml');
    $library_db = spyc_load_file('db.yaml');

    // Config
    $pathway    = 'the-collectors';
    $module     = 'curious-gardener';
    $path       = $config_yml['site']['pathways'][$pathway]['path'];

    $teaser = array(
        'image' => 'teaser-merchants-of-light.jpg',
        'link'  => $path.'2-merchants-of-light/index.php',
        'title' => 'Merchants of Light',
        'text'  => 'By the time Tradescant died in 1638, a new approach to collecting was emerging: not the gathering and display of eclectic and rare curiosities, but an ordered search for specimens that might be studied to understand the world. In one philosopher’s mind, the men building up such collections were nothing less than ‘merchants of light’.'
    );

    include_once($docRoot.'/_includes/module.php');