<!DOCTYPE HTML>
<html lang="en"> 
<head>
    <meta charset="utf-8"> 
    <title>Pathways: The Mind</title>

    <meta name="viewport" content="initial-scale=1,width=device-width,height=device-height,user-scalable=no">

    <link rel="stylesheet" type="text/css" href="../_assets/build/css/main.css">

    <style type="text/css">
        body {
            background-color: #000;
        }

        .bg-container.fixed {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
        }

        .gonads img {
            -webkit-transform: scale(2.3, 2.3);
            -webkit-transform-origin: 100% 0%;
            -webkit-transition: -webkit-transform 4s ease;
        }
        .gonads.active img {
            -webkit-transform: scale(1, 1);
        }

        .india .scroll-content {
            color: #333;
        }

    </style>
</head>
<body>

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
                    <h1>What are the hidden powers of the mind?</h1>
                </header>

                <p class="intro-text">  The British surgeon James Esdaile is in India, and has conducted dozens of gruesome operations: removing tumours, cutting out parts of gums, and amputating limbs, amongst many others. However what is so remarkable is that Esdaile has made the surgery pain-free by mesmerising patients before operating.</p>
            </div>

        </div>

        <div class="sequence">
            
            <div class="panel gonads">

                <div class="bg-container">
                    <img src="../_assets/img/esdaile/esdaile-2.jpg">
                </div>

                <div class="scroll-content">

                    <div class="content">
                        <p>Esdaile’s first patient was a prisoner with a huge scrotal swelling. He removed it painlessly in xxx minutes, in front of an esteemed audience including doctors, magistrates and the local governor. </p>
                        <p>Many similar operations followed (some indication towards list) and he was given a ward in a hospital in Calcutta.</p>
                    </div>

                </div>
            </div>

            <div class="panel">
                <div class="bg-container">
                    <img src="../_assets/img/esdaile/esdaile-3.jpg">
                </div>

                <div class="scroll-content right">
                    
                    <div class="content">
                        <p>Esdaile had set himself up as a follower of Indian healers called yogis and fakirs. In reality, he didn’t really believe in their methods, and instead practised mesmerism – which he had learnt from an English pamphlet </p>
                    </div>

                </div>
            </div>

            <div class="panel india" data-height-offset="200">

                <div class="bg-container">
                    <img src="../_assets/img/esdaile/esdaile-4.jpg">
                </div>

                <div class="scroll-content">

                    <div class="content">
                        <p>Reports of Esdaile’s success spread across India, and eventually to Britain.  It seemed that despite a debunking in the medical journal The Lancet just a few years earlier, mesmerism was real...</p>
                    </div>
                    
                </div>
            </div>
            
            <div class="panel">

                <div class="bg-container">
                    <img src="../_assets/img/esdaile/esdaile-5.jpg">
                </div>

                <div class="scroll-content">

                    <div class="content">
                        <header>
                            <h1>The Scottish surgeon James Braid</h1>
                        </header>

                        <p>has a radical new theory. He investigates the practices of Indian yogis and fakirs, particularly their trance states or mental ‘hibernation’, in which some can be buried alive for days.</p>
                        <p>Experimenting on his friends, he discovers that he can induce deep trances by simple mental techniques: suggestion, controlled breathing and focused attention.</p>
                    </div>
                </div>
                
            </div>

            <div class="panel talking-head">
                
                <div class="bg-container">
                    
                </div>

                <div class="scroll-content">

                    <div class="content">
                        
                    </div>
                </div>

            </div>

        </div>

        <!-- Quiz -->
        <div class="panel quiz">

            <div class="content clearfix">

                <div class="image">
                    <img src="http://placekitten.com/250/250">
                </div>

                <div class="answers">
                    <ul>
                        <li>First</li>
                        <li>Second</li>
                        <li>Third</li>
                        <li>Fourth</li>
                    </ul>
                </div>
                
            </div>

        </div>

        
        <?php include('../includes/library_layer.php') ?>
        <?php include('../includes/global_navigation.php') ?>

    </main>

    <script src="../_assets/js/lib/jquery-2.1.0.min.js"></script>
    <script src="../_assets/js/lib/hammer.min.js"></script>
    
    <script src="../_assets/js/lib/greensock/TweenMax.min.js"></script>
    <script src="../_assets/js/lib/jquery.scrollmagic.js"></script>

    <script>
        // global nav
        var $nav_container  = document.querySelector('.global-navigation .container'),
            $nav_handle     = document.querySelector('.global-navigation .handle');

        $nav_handle.addEventListener('click', function() {
            if( $nav_container.classList.contains('active') )
                $nav_container.classList.remove('active');
            else
                $nav_container.classList.add('active');
        });
    </script>
    
    <script src="../_assets/js/main.js"></script>

</body>
</html>
