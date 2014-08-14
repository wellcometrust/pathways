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
    $module     = 'esdaile';
    $path       = $config_yml['site']['pathways'][$pathway]['path'];


    $teaser = array(
        'image' => 'teaser-svengali.jpg',
        'link'  => $path.'5-svengali',
        'title' => 'Dark forces'
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

        <!-- Quiz -->

        <script type="text/html" id="template-quiz">
            <div class="quiz-container">

                <div class="quiz-icon">
                    <i></i>
                    <span>Quiz</span>
                </div>

                <div class="quiz-start">
                    <div class="quiz-header-image">
                        <img alt="" src="http://placekitten.com/250/250">
                    </div>

                    <header class="quiz-start--header">
                        <h1>The Esdaile Game</h1>
                    </header>

                    <div class="quiz-start--text">
                        <p>The surgeon performed dozens of operations, many of which were documented.</p>
                        <p>See if you can work out what went on in each picture - but be quick, you’ve only got 10 seconds each!</p>
                    </div>

                    <span class="button">Start</span>
                </div>

                <div class="status-bar clearfix">
                    <div class="remaining">
                        <em>1</em> of <span>10</span>
                    </div>

                    <div class="score">
                        Your Score: <span>0</span>
                    </div>
                </div>

                <div class="quiz-playground">

                    <div class="question"></div>

                    <div class="image">
                        <img alt="" src="http://placekitten.com/500/295">
                    </div>

                    <div class="answers"></div>
                </div>

                <div class="quiz-finish">

                    <header class="quiz-finish--header">
                        <h1>Not bad muchacho, you got</h1>
                    </header>

                    <div class="quiz-finish--score"></div>

                    <footer class="quiz-finish--footer clearfix">
                        <div class="button play-again">Play Again?</div>

                        <div class="sm-links">
                            <a href="#" class="facebook"></a>
                            <a href="#" class="twitter"></a>
                        </div>
                    </footer>
                </div>

            </div>
        </script>

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

