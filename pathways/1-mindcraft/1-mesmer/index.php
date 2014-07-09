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
    $module = 'mesmer';

    $library_db = spyc_load_file('db.yaml');

    $teaser = array(
        'image' => 'teaser-jtm.jpg',
        'link'  => $path.'2-airloom',
        'title' => 'A machine to control the mind'
    );

    include($docRoot.'/_includes/header.php');
?>

    <main role="main" class="mesmer-section">

        <?php include '_panels/1-start.php' ?>

        <!-- Sequence -->

        <div class="sequence" data-sequence="cross-fade">

            <?php
                /* Panels */
                $d = dir('_panels/');

                while (false !== ($file = $d->read())) {
                    if( $file != '.' && $file != '..' && !preg_match('/start/', $file) )
                        include '_panels/'.$file;
                }
            ?>

        </div>

        <div class="info-panels">
            <?php
            if( isset( $library_db['info_panels'] ) ) {
                foreach ($library_db['info_panels'] as $key => $ip) {
                    $panel = array(
                        'id'    => $key,
                        'links' => $ip
                    );

                    pattern('library_panel');
                }
            }
            ?>
        </div>

        <?php
            /*
                Library Layer
            */
            pattern('library_layer');
        
            /* Teaser */
            pattern('teaser');
            
            /* Global Navigation */
            pattern('global_navigation');
        ?>
        
    </main>

<?php include($docRoot.'/_includes/footer.php') ?>

