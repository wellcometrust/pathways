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
    $module     = 'ignorant-bride';
    $path       = $config_yml['site']['pathways'][$pathway]['path'];

    
    $teaser = array(
        'image' => '',
        'link'  => $path.'credits.php',
        'title' => 'Example teaser title',
        'text'  => 'While opening up the ‘locked cabinet’ of sex knowledge to a mass audience, Stopes inadvertently become a collector of confessional and emotional personal accounts that illustrate the appetite for – and impact of – the knowledge she shared.'
    );

    include($docRoot.'/_includes/module.php');