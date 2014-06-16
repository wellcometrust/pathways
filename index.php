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
            position:   absolute;
            top:        0;
            left:       0;
            background: #f0f0ec;
            width:      170px;
            padding:    20px 0 0 20px;
            height:     100%;
        }

        main {
            float:              left;
            background-color:   #fff;
            width:              100%;
            height:             100%;
            padding:            20px 0 0 200px;
        }

        li {
            margin:     5px 0;
            list-style: none;
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
            font-size: 12px;
            line-height: 16px;
        }

        .project-nav li {
            color:          #444;
            font-weight:    600;
            text-shadow:    0 1px 0 #FFF;
            padding:        8px 16px 7px 8px;
            border-bottom:  1px solid rgba(204, 204, 204, 0.25);
            cursor:         pointer;
        }

        .project-nav li.selected {
            background-color: #fff;
            border-left: 4px solid #90b32f;
        }
    </style>

</head>
<body>

    <nav>
        <header class="project-name">
            <h1>Wellcome</h1>
            <h2>Project X</h2>
        </header>

        <ul class="project-nav">
            <li data-tab="pathways" class="selected">Pathways</li>
            <li data-tab="patterns">Patterns</li>
            <li data-tab="interactions">Interactions</li>
            <li data-tab="styleguide">Styleguide</li>
        </ul>
    </nav>

    <main role="main">

        <div class="tabs">
            
            <div class="tab" data-tab="pathways">
                <header>
                    <h1>Pathways</h1>
                </header>

                <ol>
                    <li>The Mind</li>
                    <li>The Collectors</li>
                    <li>Breath</li>
                </ol>

                <header>
                    <h2>The Mind</h2>
                </header>

                <ul>
                    <li><a href="pathways/1-the-mind/intro.php">Intro</a></li>
                    <li><a href="pathways/1-the-mind/1-mesmer">Mesmer</a></li>
                    <li><a href="pathways/1-the-mind/2-airloom">Airloom</a></li>
                    <li><a href="pathways/1-the-mind/3-elliotson">Elliotson</a></li>
                    <li><a href="pathways/1-the-mind/4-esdaile">Esdaile</a></li>
                    <li><a href="pathways/1-the-mind/5-svengali">Svengali</a></li>
                    <li><a href="pathways/1-the-mind/6-freud">Sigmund Freud</a></li>
                </ul>

                <header>
                    <h2>The Collectors</h2>
                </header>
            </div>

            <div class="tab" data-tab="patterns">
                <header>
                    <h1>Patterns</h1>
                </header>
            </div>

            <div class="tab" data-tab="interactions">
                <header>
                    <h1>Interactions</h1>
                </header>
            </div>

            <div class="tab" data-tab="styleguide">
                <header>
                    <h1>Styleguide</h1>
                </header>
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

</body>
</html>
    