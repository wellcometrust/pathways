
<?php include('../_includes/header.php') ?>

    <main role="main">

        <div class="start">

            <div class="bg-container fixed">
                <img src="../_assets/img/mesmer/mesmer-1.jpg">
            </div>
            
            <div class="content">
                <p class="scene-set">
                    <span class="location">Paris</span>
                    <span class="date">1778</span>
                </p>

                <header>
                    <h1>Can the mind heal the body?</h1>
                </header>

                <p class="intro-text">Franz Anton Mesmer arrives in Paris in 1778. He has a dramatic new theory: he believes that he can cure people by using the power of his mind to control the forces of the physical universe. He starts practising this ‘magnetic therapy’ on patients and it is a sensation.</p>

            </div>

        </div>

        <div class="sequence" data-sequence="cross-fade">
            
            <div class="panel mesmers-salon">

                <div class="bg-container">
                    <img src="../_assets/img/mesmer/mesmer-2-black.jpg">
                </div>
                
                <div class="scroll-content position-center text-left">

                    <div class="inner">
                        <header>
                            <h1>In Mesmer’s Salon</h1>
                        </header>

                        <p>Hundreds of patients came to be treated for all sorts of afflictions. Patients would twitch, writhe, speak in tongues, and collapse in violent convulsions. When they revived, they were cured of all manners of illness: toothaches, cramps, paralysis and even blindness.</p>
                    </div>                    

                </div>

            </div>

            <div class="panel tap-block" data-component="crop-zoom">

                <div class="bg-container">
                    <img src="../_assets/img/mesmer/mesmer-2.jpg">
                </div>

                <div class="crop-zoom">
                    <div class="tap-target rod"     data-crop="rod"><div></div></div>
                    <div class="tap-target woman"   data-crop="woman"><div></div></div>
                    <div class="tap-target mesmer"  data-crop="mesmer"><div></div></div>
                </div>

            </div>

            <div class="panel animal-magnetism">

                <div class="bg-container">
                    <img src="../_assets/img/mesmer/mesmer-3.jpg">
                </div>

                <div class="library-panel" data-component="library-panel">
                    <div class="handle">i</div>
                    <div class="body">
                        stuff
                    </div>
                </div>
                
                <div class="scroll-content position-center text-left">
                    
                    <div class="inner">
                        <header>
                            <h1>Animal Magnetism</h1>
                        </header>

                        <p>Mesmer claimed that he had discovered a new force in nature, which he named ‘animal magnetism’.  Animal magnetism was the superfine fluids and energy that permeated all living things. Mesmer manipulated it by the power of his mind. He had learned to do this by passing his hands over the bodies of his patients, to remove the blockages in the magnetic fluid that were causing their illnesses.</p>
                    </div>

                </div>

            </div>


            <div class="panel tree">

                <div class="bg-container">
                    <img src="../_assets/img/mesmer/mesmer-4.jpg">
                </div>

                <div class="black-strip" style="position: fixed; top: 0; left: 45px; width: 350px; background-color: rgba(0,0,0,0.8)"></div>
                
                <div class="scroll-content left">                    
                    <p>Mesmer’s reputation spread, and his salons became overwhelmed with patients. To accommodate the masses, he came up with novel ways and locations to treat them. </p>
                    <p>In one famous example, Mesmer magnetised trees and connected his patients to the trees with rods.</p>
                </div>                    

            </div>

            <div class="panel news">

                <div class="bg-container">
                    <img src="../_assets/img/mesmer/mesmer-5.jpg">
                    <!-- <video class="news-video" src="../_assets/video/Pathways.mp4" loop></video> -->
                </div>
                
                <div class="scroll-content left">
                    <p>Mesmer’s treatment was incredibly popular, and seemed to work.</p>
                    <p>However mesmerism, as it became known, provoked much scepticism and was widely satirised.</p>
                    <p>In this febrile atmosphere, the question of the whether Mesmer’s animal magnetism was real science - as he hoped to prove - had to be answered…</p>
                </div>
                
            </div>

            <div class="panel audio sciences-committee">

                <div class="bg-container">
                    <img src="../_assets/img/mesmer/mesmer-6.jpg">
                </div>

                <div class="scroll-content position-center">
                    <div class="inner">
                        <header>
                            <h1>A French Royal Academy of Sciences Committee was convened.</h1>
                        </header>

                        <div class="audio-player" data-src="../_assets/audio/Riding.mp3" data-component="audio-player">
                            <div class="time-left">Time left: <span>0.00</span></div>
                            <div class="progress-bar">
                                <div class="progressed"></div>
                            </div>
                            <div class="controls play"></div>
                        </div>
                    </div>
                </div>

                <!-- <audio class="audio-player" src="../_assets/audio/crystal.mp3"></audio>
                <div class="audio-icon"><div class="circles"></div></div> -->

            </div>

        </div>

        <?php include('../patterns/library_layer.php') ?>

        <div class="teaser" style="position: relative; height: 100px; background-color: #ccc; z-index: 10;"></div>

        <?php include('../patterns/global_navigation.php') ?>
        
    </main>

<?php include('../_includes/footer.php') ?>
