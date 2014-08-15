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
    $module     = 'merchants-of-light';
    $path       = $config_yml['site']['pathways'][$pathway]['path'];


    $teaser = array(
        'image' => '',
        'link'  => $path.'3-death-collector/index.php',
        'title' => 'Example teaser title',
        'text'  => 'Bacon’s vision of scientific investigations based on evidence collected from the real world and the systematic study of observations was powerfully realised three decades later by a London haberdasher with an unhealthy interest in death.'
    );

    include($docRoot.'/_includes/module.php');