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
        'link'  => $path.'',
        'title' => 'Example teaser title',
        'text'  => 'Renowned as a worthy, curious and diligent searcher and preserver of all nature’s rarities, Tradescant built up a collection that held more curiosities than a man might see in a lifetime of travel. By the time of his death, however, collecting was transitioning from the eclectic, intriguing and alluring to an ordered search for specimens studied to gain knowledge. In one proto-scientist’s mind, the men compiling such collections were nothing less than ‘merchants of light’.'
    );

    include($docRoot.'/_includes/header.php');
?>

    <main role="main" class="section">

        <?php include '_panels/1-start.php' ?>

        <!-- Sequence -->

        <div class="sequence" data-sequence="cross-fade">

            <?php
                /* Panels */
                $d          = dir('_panels/');
                $file_array = [];

                while (false !== ($file = $d->read())) {
                    if( $file != '.' && $file != '..' && !preg_match('/start/', $file) )
                        $file_array[] = $file;
                }

                sort($file_array);

                foreach ($file_array as $file) {
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
            pattern('global-navigation--the-collectors');
        ?>
        
    </main>

<?php include($docRoot.'/_includes/footer.php') ?>

