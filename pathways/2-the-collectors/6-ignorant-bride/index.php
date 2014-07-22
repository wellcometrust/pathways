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
                    if( $file[0] != '.' && !preg_match('/start/', $file) )
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

