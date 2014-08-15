Pathways
========

Wellcome's Project X

## Installation & Setup

Requirements:

    - PHP 5.3+
    - Node 0.9+
    - Grunt CLI

Once you've cloned the repo, navigate to the folder in terminal and run `npm install`

When that's finished run `grunt && grunt watch` and leave the terminal tab open to start the task runner on the project.


### Pathways - A guide

The pathways project is a sort of 'short-form journalism' partially inspired by the NYTimes long-form journalism pieces.
A 'Pathway' is a collection of, usually, around 5 or 6 stories/modules. Each module is made up of panels, each being, in effect, a chapter/scene.

Each module has an introductory starting panel, followed a sequence of 1 or more panels which cross fade between each other and perform actions, then end with the library layer and teaser for the next module.


### Creating a Pathway

In the folder, /pathways there is a folder, `x-example`. Copy this folder and then rename it by incrementing the previous pathways' number and then providing the name of the new pathway, e.g. `3-breath`


### Panels

A sequence panel is, at its most basic, a `<div>` with a class of 'panel' and contains another div with a class of 'bg-container', like so:

    <div class="panel">
        <div class="bg-container"></div>
    </div>

The `.bg-container` element is the most important, because that is what gets fixed during scroll to provide the cross-fading. It can either be set a background image using CSS, and/or contain multiple images or videos. The element only serves to stick to the screen for the 'parallax' effect. What happens inside is pretty much up to you.

When text is involved in a panel, it uses an element with a class of `.main-content`. It is typically positioned absolutely, on the left and near the bottom of the panel so as to get a nice sweeping scrolling motion over the course of the panel. Positioning of the text is handled by modifier classes such as `.left`, `.right`, `.center`, `.title` and `.strip` depending on the type of content and where it should sit best. These classes will suit most of the time, but when they do not, then more classes can be added, or they can be overridden in a panel's specific CSS.

If the content is longer than a panel would typically be, then use the modifier class `.fixed` on the `.main-content` element. This prevents the content being positioned absolutely, and allows the code to calculate how tall a panel actually is so that it gets scrolled completely instead of cutting off early.

### Scenes

The site listens for the scroll event at all times and I've chosen [ScrollMagic](http://janpaepke.github.io/ScrollMagic/) (documentation, [here](http://janpaepke.github.io/ScrollMagic/docs/index.html)) to provide the eventing backbone.

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

This makes up most of the JS for any given module's chapter. You can see get an idea of more advanced uses by perusing the code for other modules or checking out the ScrollMagic documentation.


## Components

### Galleries



### Quizes

