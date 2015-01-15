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

    <div class="logo logo-top"><a href="http://www.wellcomecollection.org/"><img alt="Wellcome Collection" title="Wellcome Collection" src="/_assets/img/logo.png" /></a></div>

    <header>
        <h1>Wellcome</h1>
        <h2>Pathways</h2>
    </header>

    <main role="main">

    </main>

    <nav>
        <ul class="pathway-links">
            <li><a href="<?= $path1 ?>">Mindcraft</a></li>
            <li><a href="<?= $path2 ?>">The Collectors</a></li>
        </ul>
    </nav>


<?php include_once($docRoot.'/_includes/footer.php') ?>

