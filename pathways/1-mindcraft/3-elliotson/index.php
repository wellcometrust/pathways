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
    $pathway    = 'mindcraft';
    $module     = 'elliotson';
    $path       = $config_yml['site']['pathways'][$pathway]['path'];
    

    $teaser = array(
        'image' => 'teaser-esdaile.jpg',
        'link'  => $path.'4-esdaile',
        'title' => 'Mind over matter'
    );

    include($docRoot.'/_includes/header.php');
?>

    <main role="main">

        <?php include '_panels/1-start.php'; ?>

        <div class="sequence">

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
            /* Library Layer */
            pattern('library_layer');

            /* Teaser */
            pattern('teaser');
            
            /* Navigation */
            include '../patterns/navigation.php';
        ?>

    </main>

<?php include($docRoot.'/_includes/footer.php') ?>

