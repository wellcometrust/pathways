<?php

if( $_SERVER['SERVER_NAME'] == 'wellcome-pathways.clearleft.com' )
    $docRoot = '/home/clearleft/subdomains/wellcome-pathways';
else
    $docRoot = $_SERVER['DOCUMENT_ROOT'];

include_once($docRoot.'/_includes/page-data.php');

$page = PageBuilder::getPage('mindcraft', 'intro');

include_once($docRoot.'/_includes/header.php');

?>
    <div id="cookieconsent">
        <p>We use cookies on this website. By continuing to use this site without changing your cookie settings, you agree that you are happy to accept our cookies and for us to access these on your device.</p>
        <a id="cookies-accept" href="#">Continue</a>
    </div>

    <main role="main">

        <div class="intro intro--mindcraft">

            <div class="bg-container">
                <img alt="" src="/_assets/img/spacer.png">
            </div>

            <div class="logo"><a href="http://www.wellcomecollection.org/"><img alt="Wellcome Collection" title="Wellcome Collection" src="/_assets/img/logo.png" /></a></div>

            <div class="inner">
                <header class="intro-header">
                    <h1>Mindcraft</h1>
                </header>

                <p class="intro-body">A century of madness, murder and mental healing</p>

                <a href="1-mesmer/index.php" class="intro-button">
                    Start your journey
                    <span></span>
                </a>
            </div>

        <?php
            /* Navigation */
            $page->renderPattern('intro-navigation');
        ?>

        </div>

    </main>

<?php include_once($docRoot.'/_includes/footer.php') ?>
