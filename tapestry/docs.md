# Pathways - A guide

The pathways project, I like to think, is a sort of 'short-form journalism' partially inspired by the NYTimes long-form journalism pieces and other interactive ‘scroll enhanced’ sites.
A 'Pathway' is a collection of, usually, around 5 or 6 stories/modules. Each module is made up of panels, each being, in effect, a chapter or scene (the naming conventions throughout are a little flexible).

A full Pathway is defined by an Introduction page, an assumed 6 stories/modules and then a credits page

A story/module is defined by an introductory start panel, followed a sequence of 1 or more panels which ‘fix’ to the screen and cross fade between each other and trigger actions, then end with the library layer and teaser for the next module. 

This is the intended structure for all Pathways current and future and the system is built to reflect this. Any deviations may require potentially significant rewriting of parts of the code and are out of scope of the project.

##	Creating Pathways

This tool, while useful in the development of a Pathway, is in no way necessary. It is the layout and setup of the HTML which triggers the corresponding JavaScript to make up a module and that is what we shall cover first.

It should be noted that Pathway modules are very much art directed and, thus, bespoke. As such, there are only so many reusable patterns, which are mostly structural. Once the basic structure is in place and the JavaScript is able to do its thing, it’s up to you to hook into the ‘engine’ to accomplish the per-panel effects.

### Structure

#### Intro

Grab the ‘intro’ panel and switch out the background image and the navigation images.

#### Module

Within the body tags, the general structure is

	<main role=“main”>

		// Start panel here… 

		// Begin the cross fading sequence.
		<div class=“sequence”>

			// 1 or more panels…

		</div>

		// Panel Info boxes
		<div class="info-panels">
			// One or more info panel patterns
		</div>

		// Library layer/Teaser ‘fork’ pattern

		// Library Layer pattern

		// Navigation pattern

	</main>

#### Panels

A sequence panel is, at its most basic, a `<div>` with a class of 'panel' and contains another div with a class of 'bg-container', like so:

    <div class="panel">
        <div class="bg-container"></div>
    </div>

The `.bg-container` element is the most important, because that is what gets fixed during scroll to provide the cross-fading. It can either be set a background image using CSS, and/or contain multiple images or videos, or any interactive component you care to create. The element only serves to stick to the screen for the 'parallax' effect. What happens inside is pretty much up to you.

When text is involved in a panel, it uses an element with a class of `.main-content`, which sits after the bg-container, like so:

	<div class="panel">
		<div class="bg-container"></div>

		<div class="main-content"></div>
    </div>

It is typically positioned absolutely (when viewed on scroll-enabled devices), on the left and near the bottom of the panel so as to get a nice sweeping scrolling motion over the course of the panel.

Patterns exist for a basic panel and a panel with text for immediate use and editing.

#### Configuring Panels

Most importantly, a panel __must have a unique id__. This id is used not only for styling panel elements, but is used by JS to link info panels, components and effects.

There are a number of standard panel types we decided on during initial development which you can use. These are controlled by both CSS and HTML attributes which trigger certain JS actions.

__Configuring Text__

Positioning of the text is handled by modifier classes such as `.left`, `.right`, `.center`, `.title` and `.strip` depending on the type of content and where it should sit best:

	<div class=“main-content centre”></div>

These classes will suit most of the time, but when they do not, then more classes can be added, or they can be overridden in a panel's specific CSS.

If the content is longer than a panel would typically be, then use the modifier class `.fixed` on the `.main-content` element. This prevents the content being positioned absolutely, and allows the code to calculate how tall a panel actually is so that it gets scrolled completely instead of cutting off early.

__Configuring Panel Behaviour__

The one other native panel type which is handled by the current code is the ‘talking head’. Placing the a video using the HTML `<video>` element into `.bg-container` and applying a class to the panel of ‘talking-head’ allows the video to preload and play when the panel comes into view:

    <div class="panel talking-head">

        <div class="bg-container">
            <video controls="true" preload="none">
                <source src="http://wellcome-pathways.s3.amazonaws.com/MikeJay_Mesmer.mp4">
                <source src="http://wellcome-pathways.s3.amazonaws.com/MikeJay_Mesmer.webm">
                <track src="/_assets/video/MikeJay_Mesmer.vtt" kind="captions" srclang="en" label="English" />
            </video>
            <img alt="" src="/_assets/img/spacer.png">
        </div>

    </div>

Panels can also be configured using the data-config attribute

	<div class="panel" data-config='{ "offset_height": 200, "background": { "type": "video", "preserve_ratio": false } }'>

`offset_height` takes a value of 0 or more. Used when a panel needs to stay onscreen for a longer scroll period.

`background { preserve_ratio }` is a boolean. Use if a background container should always keep it’s aspect ratio, adding black strips to top and bottom is necessary, regardless of the user’s viewport ratio.

`background { type }` is currently unused.

### Scenes

The site listens for the scroll event at all times and I've chosen [ScrollMagic](http://janpaepke.github.io/ScrollMagic/) (documentation [here](http://janpaepke.github.io/ScrollMagic/docs/index.html)) to provide the eventing backbone.

ScrollMagic uses the concept of 'scenes', which are created like so:

    var scene = new ScrollScene({
            triggerElement: '#my-element',
            triggerHook:    'top',
            duration:       duration_number,
            offset:         offset_number
        })
        .on('enter', function(e) {
            // Do something
        })
        .on('leave', function(e) {
            // Do something
        })

They provide the necessary 'trigger' to then either animate properties or run further logic. You must supply a triggerElement which is what is listened for during scroll. Then you can optionally provide a triggerHook, which is where the element should be in relation to the viewport for it to trigger. By default you it it set to the vertical center of the viewport, but you can use 'top' for when the element reaches the top of the screen or 'bottom' for when it just enters the viewport from the bottom (I added those myself as it typically uses 'onEnter' and 'onLeave' which confused me as they seemed opposite to how it actually worked).

Duration is the length of scroll a scene lasts for, and offset lets you offset the trigger point on both enter and exit equally.

Tweening uses [Greensock's](http://www.greensock.com/) TweenMax, and it can be used to animate an element's properties over the duration of the scene or be run arbitrarily and animate according to its own duration:

    // Tweening over a scene duration.
    // Arguments are: Element to scroll, duration (which is ignored if tweening for a scene's length), and the properties to change
    TweenMax.to('.my-element', 1, { y: 0 }); // Scroll up

    // Simply animating an element for 0.4 seconds.
    TweenMax.to('.my-element', 0.4, { y: 0 }); // Scroll up

To run an animation over a scene's duration, it must be added to the scene:

    var tween = TweenMax.to('.my-element', 1, { y: 0 });
    scene.setTween(tween);

To run an abitrary animation, just add the code to a scene event:

    .on('enter', function(e) {
        TweenMax.to('.my-element', 0.4, { y: 0 }); // Scroll up
    })


### Adding Scenes

The Pathways JS engine looks for scene code added to the `Pathways.Scene` object based on a panel’s id. So

	<div id="mesmers-salon" class="panel”>

Will look for a function called MesmersSalon (CamelCase + no dashes), which you can create with

	Pathways.Scene.MesmersSalon = function() {}

In here is where ScrollMagic scenes are created and added to a global `Pathways.Scenes` array which get called after the page has loaded. As an example:

	var scene1 = new ScrollScene({
            triggerElement: '#india',
            duration:       Pathways.panel_height
        })
        .on('enter', function() {
            // enter action here
        })
        .on('leave', function() {
            // leave action
        })

    Pathways.Scenes.push(scene1);

Multiple scenes can be created and added in a similar fashion.

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

## The Tool

### Creating a new Pathway

In the folder, /pathways there is a folder, `x-example`. Copy this folder and then rename it by incrementing the previous pathways' number and then providing the name of the new pathway, e.g. `3-breath`
