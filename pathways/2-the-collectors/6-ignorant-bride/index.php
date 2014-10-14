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
    $module     = 'ignorant-bride';
    $path       = $config_yml['site']['pathways'][$pathway]['path'];

    
    $teaser = array(
        'image' => '',
        'link'  => $path.'credits.php',
        'title' => 'Credits',
        'text'  => 'By opening up the ‘locked cabinet’ of sexual knowledge to a mass audience, Stopes unintentionally built up a collection of deeply personal correspondence. These confessional and emotional letters illustrate the appetite for – and impact of – the information Stopes once again exposed to the public.'
    );

    include_once($docRoot.'/_includes/module.php');