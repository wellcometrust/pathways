<?php
    $module = 'freud';

    if( $_SERVER['SERVER_NAME'] == 'wellcome-pathways.clearleft.com' )
        $docRoot = '/home/clearleft/subdomains/wellcome-pathways';
    else
        $docRoot = $_SERVER['DOCUMENT_ROOT'];

    include($docRoot.'/_includes/header.php');
?>

    <main role="main">

        <div class="start">

            <div class="bg-container">
                <img src="/_assets/img/freud/freud-1.jpg">
            </div>
            
            <div class="content">

                <div class="scene-set">
                    <span class="location">Vienna 1895</span>
                    <!-- <span class="date">1895</span> -->
                </div>

                <header>
                    <h1>Secrets of the mind revealed</h1>
                </header>

                <p class="intro-text">Hypnosis, tarnished by scandal and abuse, has fallen from medical favour. But two doctors still believe it holds the key to understanding the mind and its powers to heal.</p>

            </div>

        </div>

        <div class="sequence">
            
            <div class="panel anna-o">
                <div class="bg-container">
                    <img src="/_assets/img/freud/freud-2.jpg">

                    <img class="fragmented" src="/_assets/img/freud/freud-2.png">
                    <img class="fragmented" src="/_assets/img/freud/freud-2.png">
                    <img class="fragmented" src="/_assets/img/freud/freud-2.png">
                    <img class="fragmented" src="/_assets/img/freud/freud-2.png">
                </div>

                <?php pattern('library_panel'); ?>

                <div class="scroll-content fixed">
                    <div class="content">
                        <header>
                            <h1>The curious case of Anna&nbsp;O</h1>
                        </header>

                        <p>In 1895 Joseph Breuer and Sigmund Freud published the case of Anna O: the pseudonym of a brilliant and fragile young woman with baffling physical and mental symptoms. She suffered from chronic coughing, hallucinations, paralysis, loss of vision, and even forgot how to speak her native German.</p>

                        <p>When hypnotised, she was able to recall traumatic incidents that were beyond the reach of her normal memory. As she recalled each buried event to consciousness, the physical symptom associated with it disappeared.</p>

                        <p>Freud and Breuer concluded that the mind had the power to cause physical illnesses – and also to heal them.</p>
                    </div>
                </div>
            </div>

            <div class="panel fred-breuer">
                <div class="bg-container">
                    <img src="/_assets/img/freud/freud-3.jpg">
                </div>

                <?php pattern('library_panel'); ?>

                <div class="scroll-content text">
                    <div class="content">
                        <header>
                            <h1>The talking cure</h1>
                        </header>

                        <p>Anna O christened Freud and Breuer’s method ‘the talking cure’. Her crippling afflictions had grown from a mental distress she had been unable to confront, or even consciously recognise.</p>

                        <p>Under her real name, Bertha Pappenheim, she became a pioneering social worker, author and campaigner for education and women’s rights. Her identity as Anna O was only revealed after her death.</p>
                    </div>
                </div>
            </div>

            <div class="panel talking-head">
                
                <div class="bg-container"></div>

            </div>

            <div class="panel office">
                <div class="bg-container">
                    <img src="/_assets/img/freud/freud-6.jpg">
                </div>

                <div class="black-strip" ></div>

                <?php pattern('library_panel'); ?>

                <div class="scroll-content left">  
                    <p>Freud installed a couch in his consulting room to hypnotise his patients. He soon abandoned the technique, finding that it imposed too much control. For the cure to work, patients had to solve their own riddles themselves.</p>
                    <p>He replaced hypnosis with ‘free association’, but he kept the couch.</p>
                </div>
            </div>

            <div class="panel office-2">

                <div class="bg-container">
                    <img src="/_assets/img/freud/freud-6.jpg">
                </div>

                <div class="scroll-content">
                    <header>
                        <h1>The couch came to symbolise the modern view of the mind: its secrets are deeply hidden, yet each of us has them within our grasp.</h1>
                    </header>
                </div>
            </div>


        </div>
        
        <?php pattern('library_layer') ?>
        <?php pattern('global_navigation') ?>

    </main>

<?php include($docRoot.'/_includes/footer.php') ?>

