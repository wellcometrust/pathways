<?php

include_once($docRoot.'/_includes/header.php');
include_once($docRoot.'/_includes/cookie_consent.php');

$id = $page->getPathwayId();
$firstPath = '';
$first = $page->getFirstPathwayPanelModule();
if (isset($first)) {
    $firstPath = $first['path'];
}
$pathwayTitle = $page->getPathwayTitle();
$pathwayIntroText = $page->getPathwayIntroText();

?>

    <main role="main">

        <div class="intro intro--<?= $id ?>">

            <div class="bg-container">
                <img alt="" src="/_assets/img/spacer.png">
            </div>

            <div class="logo logo-top"><a href="http://www.wellcomecollection.org/"><img alt="Wellcome Collection" title="Wellcome Collection" src="/_assets/img/logo.png" /></a></div>

            <div class="inner">
                <header class="intro-header">
                    <h1><?= $pathwayTitle ?></h1>
                </header>

                <p class="intro-body"><?= $pathwayIntroText ?></p>

                <a href="<?= $firstPath ?>" class="intro-button">
                    Start your journey
                    <span></span>
                </a>
            </div>

        <?php
            /* Navigation */
            include_once($page->getPatternPath('intro-navigation'));
        ?>

        </div>

    </main>

<?php include_once($docRoot.'/_includes/footer.php') ?>
