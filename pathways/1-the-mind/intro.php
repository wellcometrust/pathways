
<?php
$path = '';

if( $_SERVER['SERVER_NAME'] == 'wellcome-pathways.clearleft.com' )
    $docRoot = '/home/clearleft/subdomains/wellcome-pathways';
else
    $docRoot = $_SERVER['DOCUMENT_ROOT'];

include($docRoot.'/_includes/header.php');
?>

    <main role="main">

        <div class="intro">

            <div class="bg-container">
                <img src="<?php echo asset('img/intro/intro.jpg') ?>">
            </div>

            <div class="logo"></div>

            <div class="inner">
                <header class="intro-header">
                    <h1>Mindcraft</h1>
                </header>

                <p class="intro-body">A century of madness, murder and mental healing.</p>

                <a href="1-mesmer" class="intro-button">Start your journey</a>
            </div>

            <div class="intro-navigation">
                <div class="container clearfix">
                    <nav>
                        <ul class="clearfix">
                            <li>
                                <a class="section-link" href="1-mesmer">
                                    <span>A new force in nature</span>
                                    <img src="/_assets/img/navigation/mesmer.jpg">
                                </a>
                            </li>
                            <li>
                                <a class="section-link" href="2-airloom">
                                    <span>A machine to control the mind</span>
                                    <img src="/_assets/img/navigation/airloom.jpg">
                                </a>
                            </li>
                            <li>
                                <a class="section-link" href="3-elliotson">
                                    <span>Who controls who?</span>
                                    <img src="/_assets/img/navigation/elliotson.jpg">
                                </a>
                            </li>
                            <li>
                                <a class="section-link" href="4-esdaile">
                                    <span>Mind over matter</span>
                                    <img src="/_assets/img/navigation/esdaile.jpg">
                                </a>
                            </li>
                            <li>
                                <a class="section-link" href="5-svengali">
                                    <span>Dark forces</span>
                                    <img src="/_assets/img/navigation/svengali.jpg">
                                </a>
                            </li>
                            <li>
                                <a class="section-link" href="6-freud">
                                    <span>Secrets of the mind revealed</span>
                                    <img src="/_assets/img/navigation/freud.jpg">
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

        </div>

    </main>

<?php include($docRoot.'/_includes/footer.php') ?>
