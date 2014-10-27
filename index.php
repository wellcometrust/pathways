<?php
    // Settings & Includes
    if( $_SERVER['SERVER_NAME'] == 'wellcome-pathways.clearleft.com' )
        $docRoot = '/home/clearleft/subdomains/wellcome-pathways';
    else
        $docRoot = $_SERVER['DOCUMENT_ROOT'];

    include_once($docRoot.'/_includes/Spyc.php');
    include_once($docRoot.'/_includes/parsedown.php');

    $docs = file_get_contents($docRoot.'/tapestry/docs.md');
    
    $parsedown = new Parsedown();

    $config_yml = spyc_load_file($docRoot.'/_includes/config.yaml');

    $path   = $config_yml['site']['pathways']['mindcraft']['path'];
    $path2  = $config_yml['site']['pathways']['the-collectors']['path'];
    $path3  = $config_yml['site']['pathways']['breath']['path'];
?>
<!DOCTYPE HTML>
<html lang="en"> 
<head>
    <meta charset="utf-8">
    <title>Pathways: The Mind</title>

    <meta name="viewport" content="width=device-width, initial-scale=1">

    <style type="text/css">
        * { margin: 0; padding: 0; box-sizing: border-box; }

        html {
            height: 100%;
        }

        body {
            color:      #666;
            font:       16px 'Helvetica Neue', Arial, sans-serif;
            background: #f0f0ec;
            height:     100%;
        }

        nav {
            position:   fixed;
            top:        0;
            bottom:     0;
            left:       0;
            background: #f0f0ec;
            width:      170px;
            padding:    20px 0 0 20px;
        }

        main {
            float:              left;
            background-color:   #fff;
            width:              100%;
            min-height:         100%;
            padding:            0 0 0 170px;
        }

        li {
            margin:     5px 0;
            list-style: none;
        }

        a {
            color:              #17B;
            text-decoration:    none;
            font-size:          0.9rem;
        }

        a:hover {
            color:              #39e;
            text-decoration:    underline;
        }

        .project-name h1 {
            color:          #888;
            font-size:      11px;
            font-weight:    normal;
            letter-spacing: 1px;
            line-height:    16px;
            text-transform: uppercase;
            text-shadow:    0 1px 0 #FFF;
        }

        .project-name h2 {
            color:          #70930f;
            font-size:      24px;
            font-weight:    bold;
            letter-spacing: -1px;
            line-height:    24px;
            text-shadow:    0 1px 0 #FFF;
            text-rendering: optimizeLegibility;
            margin-bottom:  48px;
        }

        .project-nav {
            font-size:      12px;
            line-height:    16px;
        }

        .project-nav li {
            color:          #444;
            font-weight:    600;
            text-shadow:    0 1px 0 #FFF;
            margin:         0;
            padding:        9px 16px 8px 8px;
            border-bottom:  1px solid rgba(204, 204, 204, 0.25);
            cursor:         pointer;
            transition:     background-color 0.2s ease;
        }

        .project-nav li.selected {
            background-color:   #fff;
            border-left:        4px solid #90b32f;
        }

        .tab header {
            background-color:   #7f837a;
            padding:            20px 0 10px 20px;
        }

        .tab header h1 {
            color:          #fff;
            font-weight:    400;
        }

        .tab .content {
            padding: 20px;
        }

        .tab h2 {
            font-weight: 200;
        }

        .block {
            margin-bottom: 20px;
        }

        .markdown h1, .markdown h2, .markdown h3, .markdown h4, .markdown h5 {
            font-weight: 600;
            margin-bottom: 10px;
        }

        .markdown h1 { font-size: 28px; }
        .markdown h2 { font-size: 24px; }
        .markdown h3 { font-size: 20px; }
        .markdown h4 { font-size: 18px; }
        .markdown h5 { font-size: 16px; }

        .markdown p {
            margin-bottom: 15px;
            line-height: 1.4;
        }
        .markdown pre {
            background-color: #f5f2f0;
            margin-bottom: 15px;
            padding: 1em;
        }
        :not(pre) > code {
            background: #f5f2f0;
        }
    </style>

    <link rel="stylesheet" href="tapestry/css/prism.css">

</head>
<body>

    <nav>
        <header class="project-name">
            <h1>Wellcome</h1>
            <h2>Project X</h2>
        </header>

        <ul class="project-nav">
            <li data-tab="documentation" class="selected">Documentation</li>
            <li data-tab="pathways">Pathways</li>
            <li data-tab="patterns">Patterns</li>
        </ul>
    </nav>

    <main role="main">

        <div class="tabs">


            <div class="tab" data-tab="documentation">
                <header>
                    <h1>Documentation</h1>
                </header>
                
                <div class="content">
                    <div class="markdown">
                        <?php echo $parsedown->text($docs) ?>
                    </div>
                </div>
            </div>
            
            <div class="tab" data-tab="pathways">
                <header>
                    <h1>Pathways</h1>
                </header>

                <div class="content">
                    <div class="block">
                        <h2>Mindcraft</h2>

                        <ul>
                            <li><a href="<?php echo $path ?>index.php">Intro</a></li>
                            <li><a href="<?php echo $path ?>1-mesmer/index.php">Mesmer</a></li>
                            <li><a href="<?php echo $path ?>2-airloom/index.php">Airloom</a></li>
                            <li><a href="<?php echo $path ?>3-elliotson/index.php">Elliotson</a></li>
                            <li><a href="<?php echo $path ?>4-esdaile/index.php">Esdaile</a></li>
                            <li><a href="<?php echo $path ?>5-svengali/index.php">Svengali</a></li>
                            <li><a href="<?php echo $path ?>6-freud/index.php">Sigmund Freud</a></li>
                            <li><a href="<?php echo $path ?>credits.php">Credits</a></li>
                        </ul>

                        <div><a href="tapestry/download.php?pathway=mindcraft">Download</a></div>
                    </div>

                    <div class="block">
                        <h2>The Collectors</h2>

                        <ul>
                            <li><a href="<?php echo $path2 ?>index.php">Intro</a></li>
                            <li><a href="<?php echo $path2 ?>1-curious-gardener/index.php">The Curious Gardener</a></li>
                            <li><a href="<?php echo $path2 ?>2-merchants-of-light/index.php">Merchants of Light</a></li>
                            <li><a href="<?php echo $path2 ?>3-death-collector/index.php">The Death Collector</a></li>
                            <li><a href="<?php echo $path2 ?>4-unceasing-seeker/index.php">The Unceasing Seeker</a></li>
                            <li><a href="<?php echo $path2 ?>5-obscene-doctor/index.php">The Obscene Doctor</a></li>
                            <li><a href="<?php echo $path2 ?>6-ignorant-bride/index.php">The Ignorant Bride</a></li>
                            <li><a href="<?php echo $path2 ?>credits.php">Credits</a></li>
                        </ul>

                        <div><a href="tapestry/download.php?pathway=the-collectors">Download</a></div>
                    </div>
                </div>
            </div>

            <div class="tab" data-tab="patterns">
                <header>
                    <h1>Patterns</h1>
                </header>

                <div class="content">
                    <div class="block">
                        <h2>Panels</h2>
                        <a href="pattern-portfolio/panels.php">Panels</a>
                    </div>

                    <div class="block">
                        <h2>Patterns</h2>
                        <a href="pattern-portfolio/patterns.php">Patterns</a>
                    </div>

                </div>
            </div>
        </div>

    </main>

    <script>
        function _(elm) { return document.querySelector(elm) }
        function __(elm) { return document.querySelectorAll(elm) }

        var _nav_items  = __('.project-nav li'),
            _tabs       = __('.tab');

        function showTab(tab) {
            for (var i = 0; i < _tabs.length; i++) {
                _tabs[i].style['display'] = 'none';
            };

            tab.style['display'] = 'block';
        }

        showTab( _('.tab') );

        // Nav events
        for (var i = 0; i < _nav_items.length; i++) {
            _nav_items[i].addEventListener('click', function(e) {
                for (var j = 0; j < _nav_items.length; j++) {
                    _nav_items[j].classList.remove('selected');
                }

                var elm = e.target,
                    tab = elm.getAttribute('data-tab');

                elm.classList.add('selected');

                // Show selected tab
                showTab( _('.tab[data-tab="'+tab+'"]') );
            });
        };
    </script>

    <script src="/tapestry/js/prism.js"></script>

</body>
</html>
    