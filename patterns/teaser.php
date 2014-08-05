<?php
    global $teaser, $module;

    $teaser_bg      = isset($teaser['image']) ? $teaser['image']  : '';
    $teaser_link    = isset($teaser['link'])  ? $teaser['link']   : '';
    $teaser_title   = isset($teaser['title']) ? $teaser['title']  : '';
?>

<div class="teaser"<?php if( $teaser_bg != '' ) { echo ' style="background-image: url(/_assets/img/teaser/'.$teaser_bg.')"'; } ?>>
    <a href="<?php echo $teaser_link != '' ? $teaser_link : '#' ?>">
        <div class="teaser-text-container">
            <?php if( $module != 'freud' ): ?>
            <p class="teaser-text">Continue with your journey in the <span>Mind</span></p>
            <?php endif ?>
            <h1><?php echo $teaser_title != '' ? $teaser_title : '' ?></h1>
            <div class="teaser-icon"></div>
        </div>
    </a>
</div>