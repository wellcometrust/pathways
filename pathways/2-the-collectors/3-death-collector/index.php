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
    $module     = 'death-collector';
    $path       = $config_yml['site']['pathways'][$pathway]['path'];


    $teaser = array(
        'image' => '',
        'link'  => $path.'4-unceasing-seeker/index.php',
        'title' => 'Example teaser title',
        'text'  => 'Almost 150 years later another London businessman deliberately set out to gain a similar level of academic respectability. His own plans for collecting data to publish a ground-breaking book were, however, thwarted by his unceasing desire to acquire the perfect collection.'
    );

    include($docRoot.'/_includes/module.php');