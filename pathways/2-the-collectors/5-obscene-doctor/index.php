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
    $module     = 'obscene-doctor';
    $path       = $config_yml['site']['pathways'][$pathway]['path'];
    $root       = (!empty($_SERVER['HTTPS']) ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'];

    $teaser = array(
        'image' => 'teaser-ignorant-bride.jpg',
        'link'  => $path.'6-ignorant-bride/index.php',
        'title' => 'The Ignorant Bride',
        'text'  => 'The legal action taken against collections like Kahn’s transformed the public study of anatomy from a source of entertainment and wonder to a secret and shameful activity. It would take a woman distressed by her own ignorance to expose much of this anatomical knowledge again.'
    );

    include_once($docRoot.'/_includes/module.php');
