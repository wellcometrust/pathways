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
    $module     = 'curious-gardener';
    $path       = $config_yml['site']['pathways'][$pathway]['path'];

    $teaser = array(
        'image' => '',
        'link'  => $path.'2-merchants-of-light/index.php',
        'title' => 'Example teaser title',
        'text'  => 'Renowned as a worthy, curious and diligent searcher and preserver of all nature’s rarities, Tradescant built up a collection that held more curiosities than a man might see in a lifetime of travel. By the time of his death, however, collecting was transitioning from the eclectic, intriguing and alluring to an ordered search for specimens studied to gain knowledge. In one proto-scientist’s mind, the men compiling such collections were nothing less than ‘merchants of light’.'
    );

    include($docRoot.'/_includes/module.php');