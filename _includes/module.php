<?php include_once($page->docRoot.'/_includes/header.php'); ?>

    <main role="main">
        
        <a class="mute" href="#"></a>

        <?php include_once('_panels/1-start.php'); ?>

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
                    include_once '_panels/'.$file;
                }
            ?>

        </div>

        <div class="info-panels">

            <?php            
                $panels = $page->getModuleData('info_panels');

                foreach ($panels as $key => $ip) {   
                    
                    $share = isset($ip['share']) ? $ip['share'] : NULL;

                    if (isset($ip['links'])) {  
                        $panel = array(
                            'id'    => $key,
                            'links' => $ip['links'],
                            'share' => $share
                        );
                        $page->renderPattern('library_panel', $panel);
                    }
                }
            
            ?>
        </div>

        <?php
            /* Survey */
            // Comment out this line to remove the survey when no longer required
            $page->renderPattern('survey');   

            /* Teaser */
            $page->renderPattern('fork');            

            /* Library Layer */
            $page->renderPattern('library_layer');
            
            /* Navigation */   
            $page->renderPattern('navigation'); 
        ?>

    </main>

<?php include_once($page->docRoot.'/_includes/footer.php'); ?>
