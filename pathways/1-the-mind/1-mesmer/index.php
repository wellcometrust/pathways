<?php
    $module = 'mesmer';

    if( $_SERVER['SERVER_NAME'] == 'wellcome-pathways.clearleft.com' )
        $docRoot = '/home/clearleft/subdomains/wellcome-pathways';
    else
        $docRoot = $_SERVER['DOCUMENT_ROOT'];

    include($docRoot.'/_includes/header.php');
?>

    <main role="main" class="mesmer-section">

        <div class="start">

            <div class="bg-container">
                <img src="/_assets/img/mesmer/mesmer-1.jpg">
            </div>
            
            <div class="content">
                <p class="scene-set">
                    <span class="location">Paris 1778</span>
                    <!-- <span class="date">Paris 1778</span> -->
                </p>

                <header>
                    <h1>A new force in nature</h1>
                </header>

                <p class="intro-text">Franz Anton Mesmer arrives in Paris to present a revolutionary theory to the French Academy of Sciences. He claims he has harnessed a universal life-force called ‘animal magnetism’ that can cure all disease.</p>
                <p class="intro-text">His therapy is an immediate sensation. It becomes known as ‘mesmerism’.</p>

            </div>

        </div>

        <!-- Sequence -->

        <div class="sequence" data-sequence="cross-fade">


            <div id="mesmers-salon-intro" class="panel mesmers-salon" data-offset-height="550">

                <div class="bg-container">
                    <img class="small-screen" src="/_assets/img/mesmer/mesmer-2.jpg">
                    <img class="large-screen" src="/_assets/img/mesmer/mesmer-2-black.jpg">
                </div>
                
                <div class="scroll-content position-center text-left">

                    <div class="inner">
                        <header>
                            <h1>In Mesmer’s Salon</h1>
                        </header>

                        <p>In his salons, or séances, a mysterious ‘magnetic fluid’ flowed invisibly round the participants. They convulsed, spoke in tongues and collapsed in violent fits. When they revived they found themselves cured of all manner of illnesses, from toothache to paralysis and even blindness.</p>
                    </div>                    

                </div>

            </div>


            <div id="mesmers-salon" class="panel mesmers-salon" data-component="crop-zoom">

                <div class="bg-container">
                    <img src="/_assets/img/mesmer/mesmer-2.jpg">
                </div>

                <?php
                    $panel = array(
                        'links' => array(
                            array(
                                'title'         => 'Mesmeric therapy',
                                'catalogue_url' => 'http://catalogue.wellcomelibrary.org/record=b1202566~S13',
                                'download_url'  => '',
                                'images_url'    => 'http://wellcomeimages.org/indexplus/image/L0014796.html'
                            )
                        )
                    );
                ?>

                <?php pattern('library_panel'); ?>

                <div class="crop-zoom">
                    <svg class="info-box tap-target rod" data-crop="rod" version="1.1" xmlns="http://www.w3.org/2000/svg" style="width: 70px; height: 70px;">
                        <circle class="outer" cx="50%" cy="50%" r="30" fill="rgb(92,184,178)"/>
                        <circle class="inner" cx="50%" cy="50%" r="20" fill="#fff"/>
                    </svg>

                    <svg class="info-box tap-target woman" data-crop="woman" version="1.1" xmlns="http://www.w3.org/2000/svg" style="width: 70px; height: 70px;">
                        <circle class="outer" cx="50%" cy="50%" r="30" fill="rgb(92,184,178)"/>
                        <circle class="inner" cx="50%" cy="50%" r="20" fill="#fff"/>
                    </svg>

                    <svg class="info-box tap-target mesmer" data-crop="mesmer" version="1.1" xmlns="http://www.w3.org/2000/svg" style="width: 70px; height: 70px;">
                        <circle class="outer" cx="50%" cy="50%" r="30" fill="rgb(92,184,178)"/>
                        <circle class="inner" cx="50%" cy="50%" r="20" fill="#fff"/>
                    </svg>
                </div>

                <script>
                    var db = {
                        'rod': {
                            'image':    'rod-crop.jpg',
                            'title':    '',
                            'text':     'Mesmer ‘magnetised’ rods or wands that could be used to direct the fluid to the afflicted part of the body. He would often play music on a glass harmonica that sent shivers through the patients’ nerves.',
                            'position': 'right'
                        },
                        'woman': {
                            'image':    'woman-crop.jpg',
                            'text':     'Patients would form circles, holding hands or grasping cords, to transfer the healing energies between them. Sometimes these healing circles would climax in mass convulsions.',
                            'position': 'left'
                        },
                        'mesmer': {
                            'image':    'mesmer-crop.jpg',
                            'text':     'Mesmer, depicted here with his wand, taught his healing skills to initiates. They were obliged to take a strict vow of secrecy and pay the large sum of 100 livres. Many French aristocrats signed up.',
                            'position': 'left'    
                        }
                    }
                </script>

            </div>


            <div id="animal-magnetism" class="panel animal-magnetism" data-offset-height="350">

                <div class="bg-container">
                    <img src="/_assets/img/mesmer/mesmer-3.jpg">
                </div>

                <?php
                    $panel = array(
                        'links' => array(
                            array(
                                'title'         => 'A goat-headed man caresses a sleeping ewe-headed woman; satirizing the notion of animal magnetism and its application by physicians',
                                'catalogue_url' => 'http://catalogue.wellcomelibrary.org/record=b1175728',
                                'download_url'  => '',
                                'images_url'    => 'http://wellcomeimages.org/indexplus/image/V0011934.html'
                            )
                        )
                    );
                ?>

                <?php pattern('library_panel'); ?>

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
                        <span class="info-title">The tools of mesmerism</span>
                    </div>
                </div>

                <script>
                    var imageDB = {
                        location: 'mesmer/gallery/',
                        images: [
                            {
                                image: 'L0023349',
                            },
                            {
                                image: 'L0023350',
                            },
                            {
                                image: 'L0023351',
                            },
                            {
                                image: 'L0023352',
                            },
                            {
                                image: 'M0006352',
                            },
                            {
                                image: 'V0011096',
                            },
                            {
                                image: 'V0016530',
                            },
                        ]
                    }
                </script>
                
                <div class="scroll-content position-center text-left">
                    
                    <div class="inner">
                        <header>
                            <h1>Animal Magnetism</h1>
                        </header>

                        <p>Mesmer claimed that animal magnetism was a superfine fluid that permeated all living things. He had learned how to control and direct it by the power of his mind. By making stroking movements, or ‘passes’, over the bodies of his patients he could remove the blockages in the magnetic fluid that were causing their illnesses.</p>                        
                    </div>

                </div>

            </div>


            <div id="magnetised-trees" class="panel tree" data-offset-height="350">

                <div class="bg-container video" data-src="/_assets/video/tree-animation.m4v">
                    <img src="/_assets/img/mesmer/mesmer-4.jpg">
                </div>

                <div class="black-strip" ></div>
                
                <div class="scroll-content left">                    
                    <p>Mesmer’s salons became overwhelmed with patients. When he could no longer accommodate them he magnetised a tree in the street outside, to which crowds of people connected themselves with cords.</p>
                </div>

                <?php
                    $panel = array(
                        'links' => array(
                            array(
                                'title'         => 'Patients mesmerised by rods linked to the tree',
                                'catalogue_url' => 'http://catalogue.wellcomelibrary.org/record=b1070780',
                                'download_url'  => '',
                                'images_url'    => 'http://wellcomeimages.org/indexplus/image/L0016301.html'
                            )
                        )
                    );
                ?>

                <?php pattern('library_panel'); ?>

            </div>


            <div id="satirised" class="panel news" data-offset-height="350">

                <div class="bg-container video" data-src="/_assets/video/hysteria.webm">
                    <img src="/_assets/img/mesmer/mesmer-5.jpg">
                </div>
                
                <div class="scroll-content left">
                    <p>Mesmer’s therapy, and the mass hysteria it provoked, were widely satirised.</p>
                    <p>But Mesmer insisted that his theory should be assessed by the highest scientific authorities.</p>
                </div>

                <?php
                    $panel = array(
                        'links' => array(
                            array(
                                'title'         => '18th century marbling studio',
                                'catalogue_url' => '',
                                'download_url'  => '',
                                'images_url'    => '',
                                'external_url'  => 'http://thecambridgeroom.files.wordpress.com/2011/12/18th.jpg'
                            ),
                            array(
                                'title' => 'Caricature: A goat-headed man caresses a sleeping ewe-headed woman',
                                'catalogue_url' => 'http://catalogue.wellcomelibrary.org/record=b1175728',
                                'download_url'  => '',
                                'images_url'    => 'http://wellcomeimages.org/indexplus/image/V0011934.html'
                            ),
                            array(
                                'title' => 'Caricature: Animal magnetism, ‘Our faculties are related’',
                                'catalogue_url' => 'http://catalogue.wellcomelibrary.org/record=b1059930',
                                'download_url'  => '',
                                'images_url'    => 'http://wellcomeimages.org/indexplus/image/L0000477.html',
                            ),
                            array(
                                'title' => 'Caricature: The doctor hypnotises the woman in the guise of Bottom from ‘Midsummer Night’s Dream’',
                                'catalogue_url' => 'http://catalogue.wellcomelibrary.org/record=b1059930',
                                'download_url'  => '',
                                'images_url'    => 'http://wellcomeimages.org/indexplus/image/L0000477EA.html',
                            ),
                            array(
                                'title' => 'Caricature: The effects of magnetism&hellip; animal',
                                'catalogue_url' => 'http://catalogue.wellcomelibrary.org/record=b1291063',
                                'download_url'  => '',
                                'images_url'    => 'http://wellcomeimages.org/indexplus/image/L0000475.html',
                            )
                        )
                    );
                ?>

                <?php pattern('library_panel'); ?>
                
            </div>

            <div id="committee-investigates-intro" class="panel">

                <div class="bg-container"></div>

                <div class="scroll-content position-center">
                    <div class="inner">
                        <header>
                            <h1>The committee investigates&hellip;</h1>
                        </header>
                    </div>
                </div>

            </div>

            <div id="committee-investigates" class="panel talking-head">

                <div class="bg-container video" data-src="/_assets/video/committee-investigates.webm"></div>

                <div class="mute"></div>

                <div class="controls"></div>


                <?php
                    $panel = array(
                        'links' => array(
                            array(
                                'title'         => 'Title page of the Report of Benjamin Franklin Commission on animal magnetism',
                                'catalogue_url' => 'http://catalogue.wellcomelibrary.org/record=b1502897~S12',
                                'download_url'  => 'http://wellcomelibrary.org/actual/b20595244/0/0a982e34-0666-425c-a810-4f11b27d58ac/jp2',
                                'images_url'    => 'http://wellcomeimages.org/indexplus/image/L0016301.html'
                            )
                        )
                    );
                ?>

                <?php pattern('library_panel'); ?>
            </div>

        </div>

        <?php
            $library_content = array(
                'in the player' => array(
                    array(
                        'type'      => 'book',
                        'title'     => 'The Commission’s report on Animal Magnetism',
                        'author'    => 'Benjamin Franklin',
                        'date'      => '1785',
                        'link'      => 'http://wellcomelibrary.org/package/b20595244'
                    ),
                    array(
                        'type'      => 'book',
                        'title'     => 'A guide to Mesmer',
                        'author'    => 'M. Caullet de Veaumore',
                        'date'      => '1785',
                        'link'      => 'http://wellcomelibrary.org/package/b20595207'
                    ),
                    array(
                        'type'      => 'book',
                        'title'     => 'Animal Magnetism explained by its professors',
                        'author'    => 'George Toynbee',
                        'date'      => '1839',
                        'link'      => ''
                    ),
                    array(
                        'type'      => 'document',
                        'title'     => 'Franz Anton Mesmer',
                        'author'    => 'Mesmer’s deeds agreeing to teach animal magnetism',
                        'date'      => '1783',
                        'link'      => ''
                    ),
                ),

                'related resources' => array(
                    array(
                        'type'      => 'book',
                        'title'     => 'Mesmer and animal magnetism : a chapter in the history of medicine',
                        'author'    => 'Frank A. Pattie',
                        'date'      => '1994',
                        'link'      => ''
                    ),
                    array(
                        'type'      => 'book',
                        'title'     => 'Mesmerism and the End of the Enlightenment in France',
                        'author'    => 'Robert Darnton',
                        'date'      => '2009',
                        'link'      => ''
                    ),
                    array(
                        'type'      => 'book',
                        'title'     => 'Mental Healers: Mesmer, Eddy, Freud',
                        'author'    => 'Stefan Zweig',
                        'date'      => '2012',
                        'link'      => ''
                    ),
                ),
                
            );

            pattern('library_layer', $library_content);
        ?>

        <div class="teaser" style="background-image: url(/_assets/img/teaser/teaser-jtm.jpg)">
            <a href="/pathways/1-the-mind/2-airloom">
                <div class="teaser-text-container">
                    <p class="teaser-text">Continue with your journey in the <span>Mind</span></p>
                    <h1>A machine to control the mind</h1>
                    <img class="teaser-icon" src="/_assets/img/icons/icon-teaser.svg" alt="continue to the next section" />
                </div>
            </a>            
        </div>

        <?php pattern('global_navigation'); ?>
        
    </main>

<?php include($docRoot.'/_includes/footer.php') ?>

