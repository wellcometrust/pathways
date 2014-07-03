<?php
    global $teaser;

    if( !isset($teaser) )
        return;

    $teaser_bg      = isset($teaser['image']) ? $teaser['image']  : '';
    $teaser_link    = isset($teaser['link'])  ? $teaser['link']   : '';
    $teaser_title   = isset($teaser['title']) ? $teaser['title']  : '';
?>

<div class="teaser"<?php if( $teaser_bg != '' ) { echo ' style="background-image: url(/_assets/img/teaser/'.$teaser_bg.')"'; } ?>>
    <a href="<?php echo $teaser_link != '' ? $teaser_link : '#' ?>">
        <div class="teaser-text-container">
            <p class="teaser-text">Continue with your journey in the <span>Mind</span></p>
            <h1><?php echo $teaser_title != '' ? $teaser_title : '' ?></h1>
            <img class="teaser-icon" src="/_assets/img/icons/icon-teaser.svg" alt="continue to the next section" />
        </div>
    </a>            
</div>