<?php
    global $teaser, $module, $path;

    $teaser_bg      = isset($teaser['image']) ? $teaser['image']  : '';
    $teaser_link    = isset($teaser['link'])  ? $teaser['link']   : '';
    $teaser_title   = isset($teaser['title']) ? $teaser['title']  : '';
?>

<div class="fork">

    <a class="teaser" href="<?php echo $teaser_link != '' ? $teaser_link : '#' ?>" <?php if( $teaser_bg != '' ) { echo ' style="background-image: url('.$path.'/_assets/teaser/'.$teaser_bg.')"'; } ?>>
        <div class="teaser-text-container">
            <?php if( $module != 'freud' ): ?>
            <p class="teaser-text">Next:</p>
            <?php endif ?>
            <h1><?php echo $teaser_title != '' ? $teaser_title : '' ?></h1>
            <div class="teaser-icon"></div>
        </div>
    </a>

    <div class="further-reading">
        <div class="further-reading-container">
            <span>Further reading from</span>
            <img src="/_assets/img/logo-black.png" alt="wellcome library">
        </div>

        <div class="show-more">
            <span>Show</span>
        </div>
    </div>

</div>