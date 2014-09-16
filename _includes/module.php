<?php
    global $library_db;

    include($docRoot.'/_includes/header.php');
?>

    <main role="main">

        <?php include '_panels/1-start.php'; ?>

        <div class="sequence">

            <?php
                /* Panels */
                $d          = dir('_panels/');
                $file_array = [];

                // Process the files unless they are a hidden file (starts with a .) a directory command (. and ..) or the start panel
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
            /* Teaser */
            pattern('fork');

            /* Library Layer */
            pattern('library_layer');
            
            /* Navigation */
            include '../patterns/navigation.php';
        ?>

    </main>

    <?php
        if( isset($audio) ) {
            echo '<div class="global-audio" data-audio="http://wellcome-pathways.s3.amazonaws.com/'. $audio .'.mp3"></div>';
        }
    ?>


<?php include($docRoot.'/_includes/footer.php') ?>