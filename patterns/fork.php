<?php
    
    $teaser =   $page->getTeaserData();
    $module =   $page->getModuleId();
    $path =     $page->getPathwayPath();
    $gaRoot =   $page->getGARoot();

    $teaser_bg      = isset($teaser['image']) ? $teaser['image']  : '';
    $teaser_link    = $path.(isset($teaser['link'])  ? $teaser['link']   : '');
    $teaser_title   = isset($teaser['title']) ? $teaser['title']  : '';

    

?>  

<div class="fork">

    <a class="teaser" href="<?= $teaser_link != '' ? $teaser_link : '#' ?>" <?php if( $teaser_bg != '' ) { echo ' style="background-image: url('.$path.'/_assets/teaser/'.$teaser_bg.')"'; } ?>>
        <div class="teaser-text-container">
            <?php if( $module != 'freud' ): ?>
            <p class="teaser-text">Next:</p>
            <?php endif ?>
            <h1><?= $teaser_title != '' ? $teaser_title : '' ?></h1>
            <?php if ( isset($teaser['text']) ): ?>
                <p><?= $teaser['text'] ?></p>
            <?php endif ?>
            <div class="teaser-icon"></div>
        </div>
    </a>

    <div class="further-reading" data-component="toggle-section" data-toggle-section-target=".library-layer .gap" data-toggle-section-anchor=".library-layer" data-ga="<?= $gaRoot . 'l3 show library layer' ?>">
        <div class="further-reading-container">
            <span>Further reading from</span>
            <img src="/_assets/img/logo-black.svg" alt="wellcome library">
        </div>

        <div class="show-more">
            <span>Show</span>
        </div>
    </div>

</div>