<?php
    if( $_SERVER['SERVER_NAME'] == 'wellcome-pathways.clearleft.com' )
        $docRoot = '/home/clearleft/subdomains/wellcome-pathways';
    else
        $docRoot = $_SERVER['DOCUMENT_ROOT'];

    include($docRoot.'/_includes/Spyc.php');
    include($docRoot.'/_includes/header.php');

    $config_yml = spyc_load_file($docRoot.'/_includes/config.yaml');

    // Config
    $pathway    = 'the-collectors';
    $module     = '';
    $path       = $config_yml['site']['pathways'][$pathway]['path'];
?>

    <main role="main">

        <div id="credits" class="credits">

            <div class="inner">

                <h1>Credits</h1>

                <h3>Wellcome Collection</h3>

                <ul>
                    <li><span>Author:</span> Mike Jay</li>
                    <li><span>Producer:</span> Jane Audas</li>
                    <li><span>Executive Producer:</span> Danny Birchall</li>
                    <li><span>Project Manager:</span> Oliver Vicars-Harris</li>
                    <li><span>Production Assistant:</span> Joe Simmonds-Issler</li>
                    <li><span>Digital/Production Assistant:</span> Anna Ostrowska</li>
                    <li><span>Content Research:</span> Julia Nurse and Ruth Blue</li>
                    <li><span>Media Production:</span> Chris Chapman</li>
                </ul>

                <h3>Clearleft</h3>

                <ul>
                    <li><span>Art direction &amp; Design:</span> Michael Allan</li>
                    <li><span>Developer:</span> Graham Smith</li>
                    <li><span>UX Designer:</span> Richard Rutter and Ben Sauer</li>
                    <li><span>Project Manager:</span> Jessica Jebari</li>
                </ul>

            </div><!-- .inner -->
        </div><!-- .credits -->

        <?php pattern('global-navigation--the-collectors') ?>
        
    </main>

<?php include($docRoot.'/_includes/footer.php') ?>