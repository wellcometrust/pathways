
<?php include('../_includes/header.php') ?>

    <main role="main">

        <div class="start">

            <div class="bg-container fixed">
                <img src="../_assets/img/esdaile/esdaile-1.jpg">
            </div>
            
            <div class="content">

                <div class="scene-set">
                    <span class="location">Bengal</span>
                    <span class="date">1845</span>
                </div>

                <header>
                    <h1>Mind over matter</h1>
                </header>

                <p class="intro-text">  The British surgeon James Esdaile is in India, conducting dozens of gruesome operations. Remarkably Esdaile has made the surgery pain-free by mesmerising patients before operating.</p>
            </div>

        </div>

        <div class="sequence">
            
            <div class="panel gonads" data-offset-height="550">

                <div class="bg-container">
                    <img src="../_assets/img/esdaile/esdaile-2.jpg">
                </div>

                <svg class="info-box" data-component="quiz" version="1.1" xmlns="http://www.w3.org/2000/svg" >
                    <circle class="outer" cx="50%" cy="50%" r="40" fill="rgba(92,184,178,1)"/>
                    <circle class="inner" cx="50%" cy="50%" r="25" fill="#fff"/>
                    <g stroke="none" stroke-width="1" fill-rule="evenodd" fill="#231F20" transform="translate(34, 37) scale(0.2, 0.2)">
                        <path d="M104.2,7.8 L104.2,72 L8,72 L8,7.8 L104.2,7.8 L104.2,7.8 Z M112.3,-0.3 L-0.1,-0.3 L-0.1,80 L112.2,80 L112.2,-0.3 L112.3,-0.3 L112.3,-0.3 Z" id="Shape"></path>
                        <path d="M40,23.8 C40,28.2 36.4,31.8 32,31.8 C27.6,31.8 24,28.2 24,23.8 C24,19.4 27.6,15.8 32,15.8 C36.4,15.8 40,19.4 40,23.8 L40,23.8 Z" id="Shape"></path>
                        <path d="M32,47.9 L16,63.9 L48.1,63.9 L32,47.9 Z" id="Shape"></path>
                        <path d="M53.7,63.9 L96.2,63.9 L64.1,23.8 L42.9,53.1 L50.9,61.1 L53.7,63.9 Z" id="Shape"></path>
                    </g>
                </svg>

                <!-- scroll content -->
                <div class="scroll-content">

                    <div class="content">
                    <header>
                        <h1>Esdaile's first patient</h1>
                    </header>
                        <p>was a prisoner with a huge scrotal swelling. In front of an esteemed audience including doctors, magistrates and the local governor, he removed it painlessly in minutes, .</p>
                        <p>Many similar operations followed, including tooth extractions and amputation of limbs, and Esdaile was given a hospital ward in Calcutta.</p>
                    </div>

                </div>
            </div>

            <div class="panel" data-offset-height="350">
                <div class="bg-container">
                    <img src="../_assets/img/esdaile/esdaile-3.jpg">
                </div>

                <div class="scroll-content right">
                    
                    <div class="content">
                        <p>Esdaile set himself up as a follower of Indian healers called yogis and fakirs. In reality, he didn’t really believe in their methods, and instead practised mesmerism – which he had actually learnt from an English pamphlet.</p>
                    </div>

                </div>
            </div>

            <div class="panel india" data-height-offset="200">

                <div class="bg-container">
                    <img src="../_assets/img/esdaile/esdaile-4.jpg">
                    <div class="boats"></div>
                </div>

                <div class="scroll-content">

                    <div class="content">
                        <p>Reports of Esdaile’s success spread across India, and eventually to Britain.</p>
                        <p>It seemed that despite a debunking in the medical journal The Lancet just a few years earlier, mesmerism was real...</p>
                    </div>
                    
                </div>
            </div>
            
            <div class="panel" data-offset-height="450">

                <div class="bg-container">
                    <img src="../_assets/img/esdaile/esdaile-5.jpg">
                </div>

                <div class="scroll-content">

                    <div class="content">
                        <header>
                            <h1>The surgeon James Braid decided to investigate</h1>
                        </header>

                        <p>Braid has a radical new theory. He investigates the practices of Indian yogis and fakirs, particularly their trance states or mental 'hibernation', in which some can be buried alive for days.</p>
                        <p>Experimenting on his friends, Braid discovers that he can induce deep trances by simple mental techniques: suggestion, controlled breathing and focussed attention.</p>
                        <p>Braid announces that there is no longer any need to believe in animal magnetism, occult powers or vital energies. Trance states, and all the mysterious phenomena they generate, can be produced by the mind alone. </p>
                        <p>He coins a new term for the process: hypnotism.</p>
                    </div>
                </div>
                
            </div>

            <div class="panel talking-head">
                
                <div class="bg-container">
                    
                </div>

                <div class="scroll-content">

                    <div class="content">
                        <header>
                            <h1>These techniques still work today</h1>
                        </header>
                        <p>Dr Mike Gow is a dental hypnotist. He uses hypnosis to help people over their fear of dentistry, but also to perform surgery, including extractions, without anaesthetic.</p>
                    </div>
                </div>

            </div>

        </div>

        <script type="text/html" id="template-quiz">
            <div class="quiz-container">

                <div class="quiz-start">
                    <header class="quiz-start--header">
                        <h1>The Esdaile Game</h1>
                    </header>

                    <div class="quiz-start--text">
                        <p>The surgeon performed dozens of operations, many of which were documented.</p>
                    </div>

                    <span class="button">Start</span>
                </div>

                <div class="quiz-playground clearfix">
                    <div class="image">
                        <div class="remaining"></div>
                    </div>

                    <div class="answers">
                        <div class="question"></div>
                        <ul></ul>

                        <div class="score">
                            Your Score
                            <span></span>
                        </div>
                    </div>
                </div>

                <div class="quiz-finish">
                    <header class="quiz-finish--header">
                        <h1>Congratulations!</h1>
                    </header>

                    <div class="quiz-finish--body">
                        <div class="quiz-finish--score">
                            You scored
                            <span></span>
                        </div>
                    </div>

                    <footer class="quiz-finish--footer">
                        
                    </footer>
                </div>

            </div>
        </script>

        
        <?php include('../patterns/library_layer.php') ?>
        <?php include('../patterns/global_navigation.php') ?>

    </main>

<?php include('../_includes/footer.php') ?>
