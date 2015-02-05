<?php
    // Settings & Includes
    if( $_SERVER['SERVER_NAME'] == 'wellcome-pathways.clearleft.com' )
        $docRoot = '/home/clearleft/subdomains/wellcome-pathways';
    else
        $docRoot = $_SERVER['DOCUMENT_ROOT'];

    include_once( $docRoot .'/_includes/page-data.php');

    $page1 = PageBuilder::getPage('mindcraft');
    $page2 = PageBuilder::getPage('the-collectors');
    $page3 = PageBuilder::getPage('breath');

    $path1 = $page1->getPathwayPath();
    $path2 = $page2->getPathwayPath();
    $path3 = $page3->getPathwayPath();

    $page = $page1;

    include_once($docRoot.'/_includes/header.php');
    include_once($docRoot.'/_includes/cookie_consent.php');
?>


    <main role="main">

        <div class="intro intro--digital-stories">

            <div class="bg-container">
                <img alt="" src="/_assets/img/spacer.png">
            </div>

            <div class="logo logo-top"><a href="http://www.wellcomecollection.org/"><img alt="Wellcome Collection" title="Wellcome Collection" src="/_assets/img/logo.png" /></a></div>

            <div class="inner">
                <header class="intro-header">
                    <h1>Digital Stories</h1>
                </header>
            </div>
        </div>
    </main>

<div class="intro-navigation intro-navigation--digital-stories">
    <div class="container clearfix">
    <nav>
        <ul class="pathway-links">
            <li>
                <a href="<?= $path1 ?>">
                    <span>
                    <em>Mindcraft</em>
                    A century of madness, murder and mental healing
                    </span>
                    <img src="<?= $path1 . '_assets/intro' ?>.jpg">
                </a>
            </li>
            <li>
                <a href="<?= $path2 ?>">
                    <span>
                    <em>The Collectors</em>
                    Searchers, secrets and the power of curiosity
                    </span>
                    <img src="<?= $path2 . '_assets/intro' ?>.jpg">
                </a>
            </li>
        </ul>
    </nav>
 </div>
</div>

</body>
</html>
