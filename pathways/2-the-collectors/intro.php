<?php

if( $_SERVER['SERVER_NAME'] == 'wellcome-pathways.clearleft.com' )
    $docRoot = '/home/clearleft/subdomains/wellcome-pathways';
else
    $docRoot = $_SERVER['DOCUMENT_ROOT'];

include($docRoot.'/_includes/header.php');
?>

    <main role="main">

        <div class="intro intro--the-collectors">

            <div class="bg-container">
                <img alt="" src="/_assets/img/spacer.png">
            </div>

            <div class="logo"></div>

            <div class="inner">
                <header class="intro-header">
                    <h1>The Collectors</h1>
                </header>

                <p class="intro-body">Example text</p>

                <a href="1-curious-gardener/index.php" class="intro-button">
                    Start your journey
                    <span></span>
                </a>
            </div>

            <div class="intro-navigation--the-collectors">
                <div class="container clearfix">
                    <nav>
                        <ul class="clearfix">
                            <li>
                                <a class="section-link" href="1-curious-gardener/index.php">
                                    <span>The Curious Gardener</span>
                                    <div class="image">
                                        <img alt="" src="/_assets/img/spacer.png">
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a class="section-link" href="2-merchants-of-light/index.php">
                                    <span>Merchants of Light</span>
                                    <div class="image">
                                        <img alt="" src="/_assets/img/spacer.png">
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a class="section-link" href="3-death-collector/index.php">
                                    <span>The Death Collector</span>
                                    <div class="image">
                                        <img alt="" src="/_assets/img/spacer.png">
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a class="section-link" href="4-unceasing-seeker/index.php">
                                    <span>The Unceasing Seeker</span>
                                    <div class="image">
                                        <img alt="" src="/_assets/img/spacer.png">
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a class="section-link" href="5-obscene-doctor/index.php">
                                    <span>The Obscene Doctor</span>
                                    <div class="image">
                                        <img alt="" src="/_assets/img/spacer.png">
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a class="section-link" href="6-ignorant-bride/index.php">
                                    <span>The Ignorant Bride</span>
                                    <div class="image">
                                        <img alt="" src="/_assets/img/spacer.png">
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

        </div>

    </main>

<?php include($docRoot.'/_includes/footer.php') ?>
