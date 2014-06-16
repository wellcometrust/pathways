
<?php
echo $_SERVER['DOCUMENT_ROOT'];

include($_SERVER['DOCUMENT_ROOT'].'/_includes/header.php');
?>

    <main role="main">

        <div class="intro">

            <div class="bg-container">
                <img src="<?php echo asset('img/esdaile/esdaile-3.jpg') ?>">
            </div>

            <div class="inner">
                <header class="intro-header">
                    <h1>Is it all in your <span>Mind</span>?</h1>
                </header>

                <p class="intro-body">A journey in <span>six parts</span> into the discovery of our modern understanding of the mind.</p>

                <a href="mesmer.php" class="intro-button">Start your journey</a>
            </div>

            <div class="intro-navigation">
                <div class="container clearfix">
                    <nav>
                        <ul class="clearfix">
                            <li>
                                <a href="1-mesmer">
                                    <span>A new force in nature</span>
                                    <img src="/_assets/img/navigation/mesmer.jpg">
                                </a>
                            </li>
                            <li>
                                <a href="2-airloom">
                                    <span>A machine to control the mind</span>
                                    <img src="/_assets/img/navigation/airloom.jpg">
                                </a>
                            </li>
                            <li>
                                <a href="3-elliotson">
                                    <span>Mesmerism on trial</span>
                                    <img src="/_assets/img/navigation/elliotson.jpg">
                                </a>
                            </li>
                            <li>
                                <a href="4-esdaile">
                                    <span>Mind over matter</span>
                                    <img src="/_assets/img/navigation/esdaile.jpg">
                                </a>
                            </li>
                            <li>
                                <a href="5-svengali">
                                    <span>Dark forces</span>
                                    <img src="/_assets/img/navigation/svengali.jpg">
                                </a>
                            </li>
                            <li>
                                <a href="6-freud">
                                    <span>Can the mind really cure the body?</span>
                                    <img src="/_assets/img/navigation/freud.jpg">
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

        </div>

    </main>

<?php include($_SERVER['DOCUMENT_ROOT'].'/_includes/footer.php') ?>
