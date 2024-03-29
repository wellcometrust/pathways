<?php

if( $_SERVER['SERVER_NAME'] == 'wellcome-pathways.clearleft.com' )
    $docRoot = '/home/clearleft/subdomains/wellcome-pathways';
else
    $docRoot = $_SERVER['DOCUMENT_ROOT'];

include_once($docRoot.'/_includes/header.php');
?>

    <main role="main">

        <div class="intro">

            <div class="bg-container">
                <img alt="" src="/_assets/img/spacer.png">
            </div>

            <div class="logo logo-top"><a href="http://www.wellcomecollection.org/"><img alt="Wellcome Collection" title="Wellcome Collection" src="/_assets/img/logo.png" /></a></div>

            <div class="inner">
                <header class="intro-header">
                    <h1>Mindcraft</h1>
                </header>

                <p class="intro-body">A century of madness, murder and mental healing.</p>

                <a href="1-mesmer/index.php" class="intro-button">
                    Start your journey
                    <span></span>
                </a>
            </div>

            <div class="intro-navigation">
                <div class="container clearfix">
                    <nav>
                        <ul class="clearfix">
                            <li>
                                <a class="section-link" href="1-mesmer/index.php">
                                    <span>A new force in nature</span>
                                    <img alt="" src="/_assets/img/navigation/mesmer.jpg">
                                </a>
                            </li>
                            <li>
                                <a class="section-link" href="2-airloom/index.php">
                                    <span>A machine to control the mind</span>
                                    <img alt="" src="/_assets/img/navigation/airloom.jpg">
                                </a>
                            </li>
                            <li>
                                <a class="section-link" href="3-elliotson/index.php">
                                    <span>Who controls who?</span>
                                    <img alt="" src="/_assets/img/navigation/elliotson.jpg">
                                </a>
                            </li>
                            <li>
                                <a class="section-link" href="4-esdaile/index.php">
                                    <span>Mind over matter</span>
                                    <img alt="" src="/_assets/img/navigation/esdaile.jpg">
                                </a>
                            </li>
                            <li>
                                <a class="section-link" href="5-svengali/index.php">
                                    <span>Dark forces</span>
                                    <img alt="" src="/_assets/img/navigation/svengali.jpg">
                                </a>
                            </li>
                            <li>
                                <a class="section-link" href="6-freud/index.php">
                                    <span>Secrets of the mind revealed</span>
                                    <img alt="" src="/_assets/img/navigation/freud.jpg">
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

        </div>

    </main>

<?php include_once($docRoot.'/_includes/footer.php') ?>
