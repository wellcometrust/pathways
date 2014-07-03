<?php
    // 
    if( $_SERVER['SERVER_NAME'] == 'wellcome-pathways.clearleft.com' )
        $docRoot = '/home/clearleft/subdomains/wellcome-pathways';
    else
        $docRoot = $_SERVER['DOCUMENT_ROOT'];

    include($docRoot.'/_includes/Spyc.php');
    include $docRoot.'/_includes/config.php';

    $path = $config['pathways'][1]['url'];

    // Config
    $module = 'airloom';

    $library_db = spyc_load_file('db.yaml');

    $teaser = array(
        'image' => 'teaser-oakey.jpg',
        'link'  => $path.'3-elliotson',
        'title' => 'Who controls who?'
    );


    include($docRoot.'/_includes/header.php');
?>

    <main role="main">

        <?php include '_panels/1-start.php'; ?>

        <div class="sequence">

            <?php
                /* Panels */
                $d = dir('_panels/');

                while (false !== ($file = $d->read())) {
                    if( $file != '.' && $file != '..' && !preg_match('/start/', $file) )
                        include '_panels/'.$file;
                }
            ?>

        </div>

        <?php
            /* Library Layer */
            pattern('library_layer');
        
            /* Teaser */
            pattern('teaser');
            
            /* Global Navigation */
            pattern('global_navigation');
        ?>

    </main>


<?php include($docRoot.'/_includes/footer.php') ?>

