<?php
    $module = 'esdaile';

    if( $_SERVER['SERVER_NAME'] == 'wellcome-pathways.clearleft.com' )
        $docRoot = '/home/clearleft/subdomains/wellcome-pathways';
    else
        $docRoot = $_SERVER['DOCUMENT_ROOT'];

    include($docRoot.'/_includes/header.php');
?>

    <main role="main">

        <div class="start">

            <div class="bg-container">
                <img src="/_assets/img/esdaile/esdaile-1.jpg">
            </div>
            
            <div class="content">

                <div class="scene-set">
                    <span class="location">Bengal 1845</span>
                    <!-- <span class="date">1845</span> -->
                </div>

                <header>
                    <h1>Mind over matter</h1>
                </header>

                <p class="intro-text">  The Zoist receives news that a British surgeon in India, James Esdaile, has performed dozens of pain-free operations by mesmerising his patients.</p>
            </div>

        </div>

        <div class="sequence">
            
            <div class="panel gonads" data-offset-height="550">

                <div class="bg-container">
                    <img src="/_assets/img/esdaile/esdaile-2.jpg">
                </div>


                <div class="info-box" data-component="quiz">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" >
                        <circle class="outer" cx="50%" cy="50%" r="40" fill="rgba(92,184,178,1)"/>
                        <circle class="inner" cx="50%" cy="50%" r="25" fill="#fff"/>
                        <path transform="translate(28, 28) scale(1, 1)" fill="#333" d="M32 22.1l-.7-5.7c-.4-2.8-.7-5.6-1.1-8.5-.2-1.9-1-2.3-2.4-2.1-.9.1-12 1.7-13.8 1.9-.9.1-1.7.4-1.3 2.5-1-.2-2-.3-3.1-.5l-5.9-.9c-.7-.1-2.1 0-2.1 1.8l-.7 4.9c-.3 2-.6 4.1-.8 6.1-.1.7 0 2.1 1.8 2.1 1.5.3 3.1.6 4.6.8l6 .9c1.6.2 1.5-.7 1.9-1.4v.2c.3 2.2.9 2.4 2.4 2.2.4 0 11.7-1.5 13.9-1.8 1.3-.1 1.4-1.6 1.3-2.5zm-18.6-2.7c-.2 1.3-.4 2.6-.5 3.9 0 .4-.1.4-.4.3l-5.5-.8-4.9-.7c-.3 0-.3-.1-.3-.4l.9-6.3.6-4.5c0-.2.1-.3.3-.2l7.2 1.1 1.9.3c.1 0 .2.1.2.2l.7 5.7v.1c0 .3-.1.8-.2 1.3zm16.3 3.2c-.9.1-1.8.2-2.7.4l-4 .6s-2.7.4-4 .6c-1 .1-2 .3-2.9.4-.3 0-.4 0-.4-.3-.2-1.4-.4-2.7-.5-4.1-.2-1.5-.4-3-.6-4.4-.2-1.4-.4-2.8-.5-4.2-.1-.5-.1-1-.2-1.4 0-.2.1-.3.2-.3l2.7-.4 4.3-.6 4.3-.6c.8-.2 1.6-.3 2.4-.4.3 0 .3 0 .4.3l.6 4.5c.2 1.6.4 3.2.6 4.7.2 1.5.4 3 .6 4.4 0 .2 0 .3.1.5-.1.2-.2.3-.4.3zm-5.8-11.1c-.6-.5-1.4-.6-2.1-.6-.7 0-1.3.1-1.9.4-.8.4-1.4 1-1.7 1.9-.1.3-.1.6-.1.9 0 .4.3.7.7.8.4.1.9-.1 1.1-.5l.3-.8c.2-.5.5-.8.9-.8h.6c.4 0 .8.3.9.8.1.3 0 .6-.2.9l-.5.6-.9 1.1c-.2.3-.3.7-.3 1.1 0 .5.3.9.7 1 .6.1 1.1-.1 1.2-.7.1-.5.3-.8.7-1.2.4-.4.8-.8 1.1-1.2.8-1.4.5-2.9-.5-3.7zm-1.8 7.3c-.7 0-1.2.6-1.2 1.3 0 .7.6 1.2 1.2 1.2.7 0 1.2-.6 1.2-1.2 0-.7-.5-1.3-1.2-1.3zm-13.7-5.8c-.6 0-1 .1-1.3.3-.5.3-1 .7-1.1 1.3-.1.4 0 .6.2.8.4.3.8.2 1.1-.2l.2-.3c.3-.5.7-.6 1.3-.5.6.2.8.9.3 1.4l-.6.5c-.3.2-.6.3-.8.5-.3.2-.4.5-.5.8-.1.4.1.8.4.9.4.2.8 0 1-.4.2-.3.4-.5.7-.7.3-.2.6-.3.9-.6 1.1-.8 1.1-2.3.1-3.2-.6-.4-1.3-.6-1.9-.6zm-.8 6.1c-.5 0-.9.4-.9 1 0 .5.4 1 .9 1s.9-.4.9-1c0-.5-.4-1-.9-1z"/>
                    </svg>

                    <div class="text">
                        <span class="info-type">Quiz:</span>
                        <span class="info-title">Spot the tumour</span>
                    </div>
                </div>

                <?php pattern('library_panel'); ?>

                <!-- scroll content -->
                <div class="scroll-content">

                    <div class="content">
                        <header>
                            <h1>Esdaile's first patient</h1>
                        </header>
                        
                        <p>was a prisoner with a huge scrotal swelling. In front of a distinguished audience including doctors, magistrates and the local governor, he removed it painlessly in minutes.</p>
                        <p>Many more operations followed, from tooth extractions to amputations. Esdaile was given a hospital ward in Calcutta to develop his new technique.</p>
                    </div>

                </div>
            </div>

            <div class="panel" data-offset-height="350">
                <div class="bg-container">
                    <img src="/_assets/img/esdaile/esdaile-3.jpg">
                </div>

                <?php pattern('library_panel'); ?>

                <div class="scroll-content right">
                    
                    <div class="content">
                        <p>Esdaile had observed Indian yogis and fakirs putting themselves into trances. He presented himself to local healers as a fellow magician, though in private he didn’t share their mystical beliefs. He had learned his mesmeric techniques from an English pamphlet.</p>
                    </div>

                </div>
            </div>

            <div class="panel india" data-height-offset="200">

                <div class="bg-container">
                    <img src="/_assets/img/esdaile/esdaile-4.jpg">
                    <div class="boats"></div>
                </div>

                <?php pattern('library_panel'); ?>

                <div class="scroll-content">

                    <div class="content">
                        <p>The Lancet had pronounced mesmerism a fraud - but now Esdaile had proved its powers beyond doubt.</p>
                    </div>
                    
                </div>
            </div>

            <div id="surgery-under-hypnosis-intro" class="panel" data-offset-height="250">

                <div class="scroll-content">
                    <header>
                        <h1>These techniques still work today</h1>
                    </header>
                </div>
                
            </div>

            <div id="surgery-under-hypnosis" class="panel talking-head" data-offset-height="250">

                <div class="bg-container"></div>
                
            </div>
            
            <div id="james-braid" class="panel" data-offset-height="450">

                <div class="bg-container">
                    <img src="/_assets/img/esdaile/esdaile-5.jpg">
                </div>

                <?php pattern('library_panel'); ?>

                <div class="scroll-content">

                    <div class="content">
                        <header>
                            <h1>How could these powers be explained?</h1>
                        </header>

                        <p>The Scottish surgeon James Braid developed a radical new theory. He investigated the trance states of Indian yogis and fakirs, particularly their state of mental 'hybernation', in which some could be buried alive for days.</p>
                        <p>Experimenting on his friends, Braid discovered that he could induce deep trances by simple mental techniques: suggestion, controlled breathing and focussed attention.</p>
                        <p>Braid announced that there was no need to believe in animal magnetism, occult powers or vital energies. Trance states, and all the mysterious phenomena they generated, could be produced by the mind alone.</p>
                        <p>He coined a new term for the process: hypnotism.</p>
                    </div>
                </div>
                
            </div>

            <div id="self-hypnosis" class="panel talking-head">
                
                <div class="bg-container"></div>

            </div>

        </div>

        <!-- Quiz -->
        
        <script type="text/html" id="template-quiz">
            <div class="quiz-container">

                <div class="quiz-icon">
                    <i></i>
                    <span>Quiz</span>
                </div>

                <div class="quiz-start">
                    <div class="quiz-header-image">
                        <img src="http://placekitten.com/250/250">
                    </div>

                    <header class="quiz-start--header">
                        <h1>The Esdaile Game</h1>
                    </header>

                    <div class="quiz-start--text">
                        <p>The surgeon performed dozens of operations, many of which were documented.</p>
                        <p>See if you can work out what went on in each picture - but be quick, you’ve only got 10 seconds each!</p>
                    </div>

                    <span class="button">Start</span>
                </div>

                <div class="status-bar clearfix">
                    <div class="remaining">
                        <em>1</em> of <span>10</span>
                    </div>

                    <div class="score">
                        Your Score: <span>0</span>
                    </div>
                </div>

                <div class="quiz-playground">

                    <div class="question"></div>

                    <div class="image">
                        <img src="http://placekitten.com/500/295">
                    </div>

                    <div class="answers"></div>
                </div>

                <div class="quiz-finish">

                    <header class="quiz-finish--header">
                        <h1>Not bad muchacho, you got</h1>
                    </header>

                    <div class="quiz-finish--score"></div>

                    <footer class="quiz-finish--footer clearfix">
                        <div class="button play-again">Play Again?</div>

                        <div class="sm-links">
                            <a href="#" class="facebook"></a>
                            <a href="#" class="twitter"></a>
                        </div>
                    </footer>
                </div>

            </div>
        </script>

        
        <?php pattern('library_layer') ?>

        <div class="teaser" style="position: relative; height: 100px; background-color: #ccc; z-index: 10;">
            <a href="/pathways/1-the-mind/5-svengali">
                <img class="teaser-bkg" src="/_assets/img/teaser/teaser-svengali.jpg" alt="james tilly mathews and the air loom" />
                <div class="teaser-text-container">
                    <p class="teaser-text">Continue with your journey in the <span>Mind</span></p>
                    <h1>Dark forces</h1>
                    <img class="teaser-icon" src="/_assets/img/icons/icon-teaser.svg" alt="continue to the next section" />
                </div>
            </a>            
        </div>

        <?php pattern('global_navigation') ?>

    </main>

<?php include($docRoot.'/_includes/footer.php') ?>

