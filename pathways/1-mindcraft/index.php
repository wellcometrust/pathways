<?php

if( $_SERVER['SERVER_NAME'] == 'wellcome-pathways.clearleft.com' )
    $docRoot = '/home/clearleft/subdomains/wellcome-pathways';
else
    $docRoot = $_SERVER['DOCUMENT_ROOT'];

include_once($docRoot.'/_includes/page-data.php');

$page = PageBuilder::getPage('mindcraft', 'intro');

include_once($docRoot.'/_includes/header.php');

?>
    <?php include_once($docRoot.'/_includes/cookie_consent.php'); ?>

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
