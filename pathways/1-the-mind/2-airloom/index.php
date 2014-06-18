<?php
    $module = 'airloom';

    if( $_SERVER['SERVER_NAME'] == 'wellcome-pathways.clearleft.com' )
        $docRoot = '/home/clearleft/subdomains/wellcome-pathways';
    else
        $docRoot = $_SERVER['DOCUMENT_ROOT'];

    include($docRoot.'/_includes/header.php');
?>

    <main role="main">

        <div class="start">

            <div class="bg-container">
                <img src="/_assets/img/airloom/airloom-1.jpg">
            </div>
            
            <div class="content">
                <p class="scene-set">
                    <span class="location">London 1810</span>
                    <!-- <span class="date">1810</span> -->
                </p>

                <header>
                    <h1>A machine to control the mind</h1>
                </header>

                <p class="intro-text">A Welsh tea merchant, James Tilly Matthews, reveals that his mind is being controlled by a gang of “magnetic spies” and their secret machine, the Air Loom.</p>

            </div>

        </div>

        <div class="sequence">
            
            <div class="panel air-loom">

                <div class="bg-container"></div>

                <?php pattern('library_panel'); ?>

                <div class="scroll-content position-center align-left">
                    <div class="inner">
                        <p>The Air Loom is powered by Mesmer’s invisible fluids, which it concentrates and focuses on the minds of its unsuspecting victims. Many of Britain’s leading politicians, including the Prime Minister, are under its influence&hellip;</p> 
                    </div>
                </div>
            </div>

            <div class="panel air-loom-content">

                <div class="bg-container video" data-src="/_assets/video/airloom.mp4">
                    
                </div>

                <div class="scroll-content position-center align-center"></div>

                <div class="mute"></div>
            </div>

            <div class="panel">
                <div class="bg-container">
                    <img src="/_assets/img/airloom/airloom-2.jpg">
                </div>

                <div class="scroll-content position-center align-left light">

                    <div class="inner">
                        <header>
                            <h1>Where will this technology lead?</h1>
                        </header>

                        <p>Matthews was confined in Bedlam as an incurable lunatic. But his delusions captured the disturbing power of the latest discoveries in electricity and chemistry.</p>
                        <p>Recent experiments on animals and humans had shown that electric currents could animate living tissue, and even dead bodies.</p>
                    </div>
                    
                </div>
            </div>

        </div>


        <?php pattern('library_layer') ?>

        <div class="teaser" style="position: relative; height: 100px; background-color: #ccc; z-index: 10;">
            <a href="/pathways/1-the-mind/3-elliotson">
                <img class="teaser-bkg" src="/_assets/img/teaser/teaser-oakey.jpg" alt="james tilly mathews and the air loom" />
                <div class="teaser-text-container">
                    <p class="teaser-text">Continue with your journey in the <span>Mind</span></p>
                    <h1>Who controls who?</h1>
                    <img class="teaser-icon" src="/_assets/img/icons/icon-teaser.svg" alt="continue to the next section" />
                </div>
            </a>            
        </div>

        <?php pattern('global_navigation') ?>

    </main>


<?php include($docRoot.'/_includes/footer.php') ?>

