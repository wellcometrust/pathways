## Components

Components are bundles of logic, kind of like a plugin. Add them straight to the `Pathway` object:

    Pathways.CropZoom = function() {}

To call them, add the data-component attribute somewhere in a module. Usually in a panel and usually on the element it acts on. But that’s not necessary:

    <div id="mesmers-salon" class="panel" data-component="crop-zoom”>

Then insert any relevant HTML/Scripts into the panel, typically after `.main-content`, if it exists otherwise, after `.bg-container`.

### Galleries

Galleries are an oft-repeated component. The consist of a button, which triggers the gallery, and a JS variable containing the images to show. Toward the end of a panel, add:

    <div class="info-box with-text" data-component="gallery">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" >
            <circle class="outer" cx="50%" cy="50%" r="40" fill="rgba(92,184,178,1)"/>
            <circle class="inner" cx="50%" cy="50%" r="25" fill="#fff"/>
            <g stroke="none" stroke-width="1" fill="#231F20" transform="translate(34, 37) scale(0.2, 0.2)">
                <path d="M104.2,7.8 L104.2,72 L8,72 L8,7.8 L104.2,7.8 L104.2,7.8 Z M112.3,-0.3 L-0.1,-0.3 L-0.1,80 L112.2,80 L112.2,-0.3 L112.3,-0.3 L112.3,-0.3 Z"></path>
                <path d="M40,23.8 C40,28.2 36.4,31.8 32,31.8 C27.6,31.8 24,28.2 24,23.8 C24,19.4 27.6,15.8 32,15.8 C36.4,15.8 40,19.4 40,23.8 L40,23.8 Z"></path>
                <path d="M32,47.9 L16,63.9 L48.1,63.9 L32,47.9 Z"></path>
                <path d="M53.7,63.9 L96.2,63.9 L64.1,23.8 L42.9,53.1 L50.9,61.1 L53.7,63.9 Z"></path>
            </g>
        </svg>

        <div class="text">
            <span class="info-type">Gallery:</span>
            <span class="info-title">The tools of mesmerism</span>
        </div>
    </div>

    <script>
        var imageDB = {
            location: 'galleries/tools-of-mesmerism/',
            images: [
                {
                    image: 'V0016530',
                    text: '1/7: The tub, or baquet, was central to Mesmer’s treatments.'
                },
                {
                    image: 'L0023349',
                    text: '2/7: Mesmer magnetised objects such as these to treat his patients.'
                },
                {
                    image: 'L0023350',
                    text: '3/7: The different shaped items conducted the superfine fluid he saw as present in all living things.'
                },
                {
                    image: 'L0023351',
                    text: '4/7: By controlling the fluid to bring a patient to a crisis point, Mesmer would ‘cure’ them.'
                },
                {
                    image: 'L0023352',
                    text: '5/7: Magnetised objects showing their magnetic fields.'
                },
                {
                    image: 'M0006352',
                    text: '6/7: Mesmer’s assistants blew a whistle to indicate which social class of baquet they should go to.'
                },
                {
                    image: 'V0011096',
                    text: '7/7: Another baquet and a description of how Animal Magnetism works.'
                },
            ]
        }
    </script>

Switch out the images and you’re good to go.

### Quizzes

Also a standardised repeatable component, like galleries, but require a bit more configuration.

    <div class="info-box with-text" data-component="quiz">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" >
            <circle class="outer" cx="50%" cy="50%" r="40" fill="rgba(92,184,178,1)"/>
            <circle class="inner" cx="50%" cy="50%" r="25" fill="#fff"/>
            <path transform="translate(28, 28) scale(1, 1)" fill="#333" d="M32 22.1l-.7-5.7c-.4-2.8-.7-5.6-1.1-8.5-.2-1.9-1-2.3-2.4-2.1-.9.1-12 1.7-13.8 1.9-.9.1-1.7.4-1.3 2.5-1-.2-2-.3-3.1-.5l-5.9-.9c-.7-.1-2.1 0-2.1 1.8l-.7 4.9c-.3 2-.6 4.1-.8 6.1-.1.7 0 2.1 1.8 2.1 1.5.3 3.1.6 4.6.8l6 .9c1.6.2 1.5-.7 1.9-1.4v.2c.3 2.2.9 2.4 2.4 2.2.4 0 11.7-1.5 13.9-1.8 1.3-.1 1.4-1.6 1.3-2.5zm-18.6-2.7c-.2 1.3-.4 2.6-.5 3.9 0 .4-.1.4-.4.3l-5.5-.8-4.9-.7c-.3 0-.3-.1-.3-.4l.9-6.3.6-4.5c0-.2.1-.3.3-.2l7.2 1.1 1.9.3c.1 0 .2.1.2.2l.7 5.7v.1c0 .3-.1.8-.2 1.3zm16.3 3.2c-.9.1-1.8.2-2.7.4l-4 .6s-2.7.4-4 .6c-1 .1-2 .3-2.9.4-.3 0-.4 0-.4-.3-.2-1.4-.4-2.7-.5-4.1-.2-1.5-.4-3-.6-4.4-.2-1.4-.4-2.8-.5-4.2-.1-.5-.1-1-.2-1.4 0-.2.1-.3.2-.3l2.7-.4 4.3-.6 4.3-.6c.8-.2 1.6-.3 2.4-.4.3 0 .3 0 .4.3l.6 4.5c.2 1.6.4 3.2.6 4.7.2 1.5.4 3 .6 4.4 0 .2 0 .3.1.5-.1.2-.2.3-.4.3zm-5.8-11.1c-.6-.5-1.4-.6-2.1-.6-.7 0-1.3.1-1.9.4-.8.4-1.4 1-1.7 1.9-.1.3-.1.6-.1.9 0 .4.3.7.7.8.4.1.9-.1 1.1-.5l.3-.8c.2-.5.5-.8.9-.8h.6c.4 0 .8.3.9.8.1.3 0 .6-.2.9l-.5.6-.9 1.1c-.2.3-.3.7-.3 1.1 0 .5.3.9.7 1 .6.1 1.1-.1 1.2-.7.1-.5.3-.8.7-1.2.4-.4.8-.8 1.1-1.2.8-1.4.5-2.9-.5-3.7zm-1.8 7.3c-.7 0-1.2.6-1.2 1.3 0 .7.6 1.2 1.2 1.2.7 0 1.2-.6 1.2-1.2 0-.7-.5-1.3-1.2-1.3zm-13.7-5.8c-.6 0-1 .1-1.3.3-.5.3-1 .7-1.1 1.3-.1.4 0 .6.2.8.4.3.8.2 1.1-.2l.2-.3c.3-.5.7-.6 1.3-.5.6.2.8.9.3 1.4l-.6.5c-.3.2-.6.3-.8.5-.3.2-.4.5-.5.8-.1.4.1.8.4.9.4.2.8 0 1-.4.2-.3.4-.5.7-.7.3-.2.6-.3.9-.6 1.1-.8 1.1-2.3.1-3.2-.6-.4-1.3-.6-1.9-.6zm-.8 6.1c-.5 0-.9.4-.9 1 0 .5.4 1 .9 1s.9-.4.9-1c0-.5-.4-1-.9-1z"/>
        </svg>

        <div class="text">
            <span class="info-type">Quiz:</span>
            <span class="info-title">Guess the Tumour</span>
        </div>
    </div>

    <!-- Quiz -->

    <script>
        var quiz_db = {
            'title': 'The Esdaile Game',
            'images': '/_assets/img/quizzes/guess-the-tumour',
            'questions' : [
                 {
                    'image':    'q1-300h.jpg',
                    'title':    'How much did this jaw-dropping tumour weigh?',
                    'answers':  ['2 pounds', '5 pounds', '10 pounds', '23 pounds'],
                    'correct':  2
                 },
                 {
                    'image':    'q2-300h.jpg',
                    'title':    'How long did it take Esdaile to remove this whopping 103 pound tumour?',
                    'answers':  ['10 seconds', '1 hour', '6 and a half minutes', '6 hours'],
                    'correct':  3
                 },
                 {
                    'image':    'q3-300h.jpg',
                    'title':    'What was the weight of this extremely uncomfortable-looking tumour?',
                    'answers':  ['80 pounds', '40 pounds', '400 pounds', '60 pounds'],
                    'correct':  1
                 },
                 {
                    'image':    'q4-300h.jpg',
                    'title':    'How much did this tumour weigh before Esdaile got it off the patient’s chest?',
                    'answers':  ['10 pounds', '80 pounds', '60 pounds', '40 pounds'],
                    'correct':  1
                 },
                 {
                    'image':    'q5-300h.jpg',
                    'title':    'This 90 pound tumour was removed by Esdaile without anaesthetic. But how long did it take?',
                    'answers':  ['It never was removed', '30 minutes', '9 minutes', '3 minutes'],
                    'correct':  4
                 },
            ]
        }
    </script>

    <script type="text/html" id="template-quiz">
        <div class="quiz-container">

            <div class="quiz-icon">
                <i></i>
                <span>Quiz</span>
            </div>

            <div class="quiz-start">
                <div class="quiz-header-image"></div>

                <header class="quiz-start--header">
                    <h1>Guess the Tumour</h1>
                </header>

                <div class="quiz-start--text">
                    <p>James Esdaile performed dozens of operations, many of which were documented.</p>
                    <p>See if you can work out what happened in these pictures – but be quick, you’ve only got ten seconds to guess each one!</p>
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

                <div class="image"></div>

                <div class="answers"></div>
            </div>

            <div class="quiz-finish">

                <header class="quiz-finish--header">
                    <h1>Your score</h1>
                </header>

                <div class="quiz-finish--score"></div>

                <footer class="quiz-finish--footer clearfix">
                    <div class="button play-again">Play Again?</div>

                    <!--<div class="sm-links">
                        <a href="#" class="facebook"></a>
                        <a href="#" class="twitter"></a>
                    </div>-->
                </footer>
            </div>

        </div>
    </script>
