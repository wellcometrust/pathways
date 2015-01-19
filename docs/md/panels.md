#### Configuring Panels

Most importantly, a panel __must have a unique id__. This id is used not only for styling panel elements, but is used by JS to link info panels, components and effects.

There are a number of standard panel types we decided on during initial development which you can use. These are controlled by both CSS and HTML attributes which trigger certain JS actions.

__Configuring Text__

Positioning of the text is handled by modifier classes such as `.left`, `.right`, `.center`, `.title` and `.strip` depending on the type of content and where it should sit best:

    <div class=“main-content centre”></div>

`.left` : Positions the content 48px from the left, with a maximum width of 500px
`.right` : Positions the content 48px from the right, with a maximum width of 500px
`.center` : Explicitly sets the width to 100% of the viewport and removes any left positioning. Requires a child div with the class `.inner` to set auto-margins and a max-width of 500px on the content.
`.title` : Like `.center`, but sets a max-width of 1024px.
`.strip` : This is used in combination with the `.black-strip` class to set the max width of the content to the same size as the strip (320px).

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

    <div class="panel" data-config='{ "offset_height": 200 }'>

`offset_height` takes a value of 0 or more. Used when a panel needs to stay onscreen for a longer scroll period.
