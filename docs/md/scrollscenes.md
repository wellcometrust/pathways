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

The Pathways JS engine looks for scene code added to the `Pathways.scrollScenes` object based on a panel’s id. So

    <div id="mesmers-salon" class="panel”>

Will look for a function called MesmersSalon (CamelCase + no dashes), which you can create with

    Pathways.scrollScenes.MesmersSalon = function() {}

In here is where ScrollMagic scenes are created and returned in a function which get called after the page has loaded. As an example:

    var scene1 = new ScrollScene({
            triggerElement: '#india',
            duration:       Pathways.panelHeight
        })
        .on('enter', function() {
            // enter action here
        })
        .on('leave', function() {
            // leave action
        })

    return scene1;

or
    var scenes = [];

    $(panelID + ' .subelement').each(function(index, el){
        var scene1 = new ScrollScene({
            triggerElement: el,
            duration:       Pathways.panelHeight
        })
        .on('enter', function() {
            // enter action here
        })
        .on('leave', function() {
            // leave action
        });
        scenes.push(scene);
    });

    return scenes;

Multiple scenes can be created and added in a similar fashion.
