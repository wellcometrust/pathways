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
    $pathway    = 'the-collectors';
    $module     = 'unceasing-seeker';
    $path       = $config_yml['site']['pathways'][$pathway]['path'];


    $teaser = array(
        'image' => 'teaser-obscene-doctor.jpg',
        'link'  => $path.'5-obscene-doctor/index.php',
        'title' => 'The Obscene Doctor',
        'text'  => 'Wellcome intended his museums to be used primarily by those engaged in research. Yet he also knew how to exploit his acquisitions to create a spectacle, a skill he shared with another London immigrant, whose popular collection was ultimately destroyed.'
    );

    include($docRoot.'/_includes/module.php');