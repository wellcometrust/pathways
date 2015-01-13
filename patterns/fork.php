<?php
    $fullpath = $page->getModulePath();
    $gaRoot =   $page->getGARoot();
?>

<div class="fork">

    <?php include($fullpath. '_panels/fork.php'); ?>

    <!-- <a class="teaser" href="<?= $teaser_link != '' ? $teaser_link : '#' ?>" <?php if( $teaser_bg != '' ) { echo ' style="background-image: url('.$path.'_assets/teaser/'.$teaser_bg.')"'; } ?>>
        <div class="teaser-text-container">
            <?php if( $moduleId != 'freud' ): ?>
            <p class="teaser-text">Next:</p>
            <?php endif ?>
            <h1><?= $teaser_title != '' ? $teaser_title : '' ?></h1>
            <?php if ( isset($teaser['text']) ): ?>
                <p><?= $teaser['text'] ?></p>
            <?php endif ?>
            <div class="teaser-icon"></div>
        </div>
    </a> -->

    <div class="further-reading" data-component="toggle-section" data-toggle-section-target=".library-layer .gap" data-toggle-section-anchor=".library-layer" data-ga="<?= $gaRoot . 'l3 open library layer' ?>">
        <div class="further-reading-container">
            <span>Further reading from</span>
            <object type="image/svg+xml" data="/_assets/img/logo-black.svg">Wellcome Library</object>
        </div>

        <div class="show-more">
            <span>Show</span>
        </div>
    </div>

</div>
