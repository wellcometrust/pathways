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
    $module     = 'death-collector';
    $path       = $config_yml['site']['pathways'][$pathway]['path'];


    $teaser = array(
        'image' => 'teaser-unceasing-seeker.jpg',
        'link'  => $path.'4-unceasing-seeker/index.php',
        'title' => 'The Unceasing Seeker',
        'text'  => 'Almost 150 years after Graunt’s election to the Royal Society, another London businessman deliberately set out to gain a similar level of academic respectability. His own plans to publish a ground-breaking book were, however, thwarted by an unceasing desire to acquire the perfect collection.'
    );

    include_once($docRoot.'/_includes/module.php');