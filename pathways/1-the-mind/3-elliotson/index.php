<?php
    $module = 'elliotson';

    if( $_SERVER['SERVER_NAME'] == 'wellcome-pathways.clearleft.com' )
        $docRoot = '/home/clearleft/subdomains/wellcome-pathways';
    else
        $docRoot = $_SERVER['DOCUMENT_ROOT'];

    include($docRoot.'/_includes/header.php');
?>

    <main role="main">

        <div class="start">

            <div class="bg-container">
                <img src="/_assets/img/elliotson/elliotson-1.jpg">
            </div>
            
            <div class="content">

                <div class="scene-set">
                    <span class="location">London 1838</span>
                    <!-- <span class="date">1838</span> -->
                </div>

                <header>
                    <h1>Who controls who?</h1>
                </header>

                <p class="intro-text">Mesmerism is still being spread by a network of believers. Its most prominent champion in Britain is Dr John Elliotson, professor at University College Hospital.</p>
                <p class="intro-text">His dramatic demonstrations of mesmeric powers draw the likes of Charles Dickens and Michael Faraday. His prize subjects are Elizabeth and Jane Okey, two young servant girls who he has been treating for epileptic seizures.</p>
            </div>

        </div>

        <div class="sequence">
            
            <div class="panel okey-sisters" data-offset-height="1200">

                <div class="bg-container">
                    <img src="/_assets/img/elliotson/elliotson-2.jpg">
                </div>

                <?php pattern('library_panel'); ?>

                <div class="black-strip" ></div>

                <div class="info-box" data-component="gallery">
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
                </div>

                <script>
                    var imageDB = {
                        location: 'elliotson/gallery/',
                        images: [
                            {
                                image: 'L0000476',
                                text: 'Here is some test text. Lorem ipsum is for suckers!'
                            },
                            {
                                image: 'L0034228',
                            },
                            {
                                image: 'L0034922',
                                text: 'Here is some test text. Lorem ipsum is for suckers!'
                            },
                            {
                                image: 'V0006760',
                                text: 'Here is some test text. Lorem ipsum is for suckers!'
                            },
                            {
                                image: 'V0011793',
                                text: 'Here is some test text. Lorem ipsum is for suckers!'
                            },
                            {
                                image: 'V0016621'
                            },
                        ]
                    }
                </script>
                
                <div class="scroll-content left">  

                    <p>The Okey sisters were extraordinarily susceptible, slipping rapidly into trance states where they manifested quite different personalities. Elliotson could make them fall into stupor merely by waving a finger.</p>
                    <p>Touching magnetised metals or even water sent them into a trance in which they spontaneously mirrored each other’s actions.</p>
                   
                    <p>Elliotson’s demonstrations were crowded with doctors and dignitaries. The Okey sisters seemed to enjoy the attention, especially in their disinhibited trance states, when they teased the gentlemen and sat in their laps.</p>
                    <p>The medical journal The Lancet had been reporting the demonstrations with interest. But its editor, Thomas Wakley, suspected deception. He requested a private demonstration at his house, where he took control.</p>
                </div>

                <div class="scroll-content right" style="float: right; width: 40%; max-width: 500px; bottom: auto; top: 36%">
                    <img src="/_assets/img/elliotson/demonstration1.jpg" style="display: block; margin-bottom: 40px; margin-left: -100px">
                    <img src="/_assets/img/elliotson/demonstration2.jpg" style="display: block; margin-bottom: 40px">
                    <img src="/_assets/img/elliotson/demonstration1.jpg" style="display: block; margin-bottom: 40px; margin-left: -100px">
                </div>

            </div>

            <div class="panel thomas-wakley" data-offset-height="2800">
                <div class="bg-container">
                    <img src="/_assets/img/elliotson/elliotson-3.jpg">
                </div>

                <div class="scroll-content fixed position-center">
                    <header>
                        <h1>Wakley’s experiments produced very different results</h1>
                    </header>

                    <div class="inner">

                        <div class="past-twitter clearfix">
                            
                            <div class="tweet wakley">
                                <div class="avatar"></div>
                                <div class="header">
                                    <span class="time">12 July 1838</span>
                                    <div class="username">Thomas Wakley <span>@wako_lancet</span></div>
                                </div>
                                <div class="body">
                                    “Careful investigation and a consideration of all experiments have convinced us that the phenomena are not real, and that animal magnetism is a delusion”
                                </div>
                            </div>

                            <div class="tweet elliotson">
                                <div class="avatar"></div>
                                <div class="header">
                                    <span class="time">12 July 1838</span>
                                    <div class="username">John Elliotson <span>@im4mesmerism</span></div>
                                </div>
                                <div class="body">
                                    “Mr. Wakley fulminated forth what he called experiments on a subject of which he is as ignorant as of Latin, French or mathematics”
                                </div>
                            </div>

                            <div class="tweet wakley">
                                <div class="avatar"></div>
                                <div class="header">
                                    <span class="time">12 July 1838</span>
                                    <div class="username">Thomas Wakley <span>@wako_lancet</span></div>
                                </div>
                                <div class="body">
                                    “Animal magnetism is one of the completest delusions the human mind ever entertained”
                                </div>
                            </div>

                            <div class="tweet elliotson">
                                <div class="avatar"></div>
                                <div class="header">
                                    <span class="time">12 July 1838</span>
                                    <div class="username">John Elliotson <span>@im4mesmerism</span></div>
                                </div>
                                <div class="body">
                                    “These phenomena, I know to be real, to be independent of imagination or any other cause to which other persons are pleased to ascribe them”
                                </div>
                            </div>

                            <div class="tweet wakley">
                                <div class="avatar"></div>
                                <div class="header">
                                    <span class="time">12 July 1838</span>
                                    <div class="username">Thomas Wakley <span>@wako_lancet</span></div>
                                </div>
                                <div class="body">
                                    “The medical schools with which mesmerism is connected must be speedily and irreparably ruined, unless the moral quackery is at once put down by the governors”
                                </div>
                            </div>

                            <div class="tweet elliotson">
                                <div class="avatar"></div>
                                <div class="header">
                                    <span class="time">12 July 1838</span>
                                    <div class="username">John Elliotson <span>@im4mesmerism</span></div>
                                </div>
                                <div class="body">
                                    “As a gentleman in the first place, and a physician in the next, I feel myself compelled at once to resign my office of Professor of the Principles and Practice of Medicine”
                                </div>
                            </div>

                            <div class="tweet dickens">
                                <div class="avatar"></div>
                                <div class="header">
                                    <span class="time">12 July 1838</span>
                                    <div class="username">Charles Dickens <span>@cdickens</span></div>
                                </div>
                                <div class="body">
                                    “With regard to my opinion on the subject of mesmerism, I have no hesitation in saying that I have watched Dr Elliotson’s experiments from the first… and that after what I have seen with my own senses, I should be untrue both to him and to myself, if I should shrink for a moment from saying that I am a believer”
                                </div>
                            </div>

                            <div class="tweet martineau">
                                <div class="avatar"></div>
                                <div class="header">
                                    <span class="time">12 July 1838</span>
                                    <div class="username">Harriet Martineau<span>@hmartineau</span></div>
                                </div>
                                <div class="body">
                                    “Those who know mesmerism to be true from their own experience are now a very large number…the great majority who know nothing of the matter laugh at it as a nonsense or a cheat”
                                </div>
                            </div>

                        </div>
                    </div>

                    <div class="wibble">&nbsp;</div>
                </div>
            </div>

            <div class="panel verdict">
                <div class="bg-container">
                    <img src="/_assets/img/elliotson/elliotson-4.jpg">
                </div>

                <?php pattern('library_panel'); ?>

                <div class="scroll-content">
                    
                    <div class="inner">
                        <p class="verdict-text">Wakley’s verdict</p>

                        <blockquote>
                            <p>“The ‘science’ of mesmerism, like the ‘science’ of fortune-telling, will always carry on a precarious existence wherever there are clever girls, philosophic bohemians, weak women and weaker men, but it can no longer affront the common sense of the medical profession.”</p>
                        </blockquote>

                        <p class="outro">Mesmerism was banished to the margins. Elliotson started his own journal, The Zoist, to publish new evidence for it.</p>
                    </div>

                </div>
            </div>

        </div>

        
        <?php pattern('library_layer') ?>

        <div class="teaser" style="position: relative; height: 100px; background-color: #ccc; z-index: 10;">
            <a href="/pathways/1-the-mind/4-esdaile">
                <img class="teaser-bkg" src="/_assets/img/teaser/teaser-esdaile.jpg" alt="james tilly mathews and the air loom" />
                <div class="teaser-text-container">
                    <p class="teaser-text">Continue with your journey in the <span>Mind</span></p>
                    <h1>Mind over matter</h1>
                    <img class="teaser-icon" src="/_assets/img/icons/icon-teaser.svg" alt="continue to the next section" />
                </div>
            </a>
        </div>
        
        <?php pattern('global_navigation') ?>

    </main>

<?php include($docRoot.'/_includes/footer.php') ?>

