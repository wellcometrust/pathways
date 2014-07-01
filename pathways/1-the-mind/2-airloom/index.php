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
            
            <div id="airloom-intro" class="panel air-loom">

                <div class="bg-container"></div>

                <div class="scroll-content position-center align-left">
                    <div class="inner">
                        <p>The Air Loom is powered by Mesmer’s invisible fluids, which it concentrates and focuses on the minds of its unsuspecting victims. Many of Britain’s leading politicians, including the Prime Minister, are under its influence&hellip;</p> 
                    </div>
                </div>
            </div>

            <div id="airloom" class="panel air-loom-content">

                <div class="bg-container video" data-src="/_assets/video/airloom.mp4"></div>
                
                <div class="mute"></div>

                <div class="scroll-content position-center align-center"></div>

            </div>

            <div id="where-will-this-technology-lead" class="panel">

                <div class="bg-container">
                    <img src="/_assets/img/airloom/airloom-2.jpg">
                </div>

                <?php
                    $panel = array(
                        'links' => array(
                            array(
                                'title'         => 'The Hospital of Bethlem [Bedlam] at Moorfields, London, seen from the north.',
                                'catalogue_url' => 'http://catalogue.wellcomelibrary.org/record=b1183474',
                                'download_url'  => '',
                                'images_url'    => 'http://wellcomeimages.org/indexplus/image/L0012307.html'
                            )
                        )
                    );
                ?>

                <?php pattern('library_panel'); ?>

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

            <div id="grisly-experiments" class="panel">

                <div class="bg-container">
                    <img src="/_assets/img/airloom/airloom-2.jpg">
                </div>

                <div class="info-box with-text" data-component="gallery">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" >
                        <circle class="outer" cx="50%" cy="50%" r="40" fill="rgba(92,184,178,1)"/>
                        <circle class="inner" cx="50%" cy="50%" r="25" fill="#fff"/>
                        <g stroke="none" stroke-width="1" fill-rule="evenodd" fill="#231F20" transform="translate(34, 37) scale(0.2, 0.2)">
                            <path d="M104.2,7.8 L104.2,72 L8,72 L8,7.8 L104.2,7.8 L104.2,7.8 Z M112.3,-0.3 L-0.1,-0.3 L-0.1,80 L112.2,80 L112.2,-0.3 L112.3,-0.3 L112.3,-0.3 Z" id="Shape"></path>
                            <path d="M40,23.8 C40,28.2 36.4,31.8 32,31.8 C27.6,31.8 24,28.2 24,23.8 C24,19.4 27.6,15.8 32,15.8 C36.4,15.8 40,19.4 40,23.8 L40,23.8 Z" id="Shape"></path>
                            <path d="M32,47.9 L16,63.9 L48.1,63.9 L32,47.9 Z" id="Shape"></path>
                            <path d="M53.7,63.9 L96.2,63.9 L64.1,23.8 L42.9,53.1 L50.9,61.1 L53.7,63.9 Z" id="Shape"></path>
                        </g>
                    </svg>

                    <div class="text">
                        <span class="info-type">Gallery:</span>
                        <span class="info-title">Aldini’s experiments</span>
                    </div>
                </div>

                <script>
                    var imageDB = {
                        location: 'airloom/gallery/',
                        images: [
                            {
                                image: 'L0001964',
                                text: 'Here is some test text. Lorem ipsum is for suckers!'
                            },
                            {
                                image: 'L0011096',
                            },
                            {
                                image: 'L0023892',
                                text: 'Here is some test text. Lorem ipsum is for suckers!'
                            },
                            {
                                image: 'L0023893',
                                text: 'Here is some test text. Lorem ipsum is for suckers!'
                            },
                            {
                                image: 'L0023894',
                                text: 'Here is some test text. Lorem ipsum is for suckers!'
                            },
                            {
                                image: 'L0023895',
                                text: 'Here is some test text. Lorem ipsum is for suckers!'
                            },
                            {
                                image: 'L0023897',
                                text: 'Here is some test text. Lorem ipsum is for suckers!'
                            },
                            {
                                image: 'L0023898',
                                text: 'Here is some test text. Lorem ipsum is for suckers!'
                            },
                            {
                                image: 'L0023899',
                                text: 'Here is some test text. Lorem ipsum is for suckers!'
                            },
                            {
                                image: 'L0029687',
                                text: 'Here is some test text. Lorem ipsum is for suckers!'
                            },
                            {
                                image: 'L0029689',
                                text: 'Here is some test text. Lorem ipsum is for suckers!'
                            },
                        ]
                    }
                </script>
                
                <div class="scroll-content position-center">
                    <div class="inner">
                        <p>In 1803 the Italian physicist Giovanni Aldini performed a grisly experiment in London, applying an electric battery to the corpse of an executed criminal. It began to twitch, its facial muscles grimaced and the eye opened in a terrifying stare…</p>
                        <p>The Air Loom posed the question: will these new technologies one day be able to control the mind as well as the body?</p>
                    </div>
                </div>
            </div>

        </div>

        <?php
            $library_content = array(
                'in the player' => array(
                    array(
                        'type'      => 'book',
                        'title'     => 'Illustrations of madness [by the patient, James Tilly Matthews, in hallucinations]',
                        'author'    => 'John Haslam',
                        'date'      => '1810',
                        'link'      => 'http://wellcomelibrary.org/package/b20458265'
                    ),
                    array(
                        'type'      => 'book',
                        'title'     => 'Aldini’s Experiments (with images)',
                        'author'    => 'Giovanni Aldini',
                        'date'      => '1803',
                        'link'      => 'http://wellcomelibrary.org/package/b20595256'
                    )
                ),

                'related resources' => array(
                    array(
                        'type'      => 'book',
                        'title'     => 'The influencing machine : James Tilly Matthews and the air loom',
                        'author'    => 'Mike Jay',
                        'date'      => '2012',
                        'link'      => ''
                    ),
                    array(
                        'type'      => 'book',
                        'title'     => 'The Air Loom and Other Dangerous Influencing Machines',
                        'author'    => 'Roske and Brand-Claussen',
                        'date'      => '2006',
                        'link'      => ''
                    ),
                    array(
                        'type'      => 'book',
                        'title'     => 'Shocking Bodies: Life, Death & Electricity in Victorian England',
                        'author'    => 'Iwan Rhys Morus',
                        'date'      => '2011',
                        'link'      => ''
                    ),
                ),
                
            );

            pattern('library_layer', $library_content);
        ?>

        <div class="teaser" style="background-image: url(/_assets/img/teaser/teaser-oakey.jpg)">
            <a href="/pathways/1-the-mind/3-elliotson">
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

