<?php
    global $panel;
?>

<div class="library-panel" data-panel="<?php echo isset($panel['id']) ? $panel['id'] : '' ?>" data-component="library-panel">
    <div class="handle">i</div>
    <div class="body">
        <span>Sources</span>
        
        <ul>
            <?php if( isset($panel['links']) ): ?>
            <?php foreach ($panel['links'] as $link): ?>
            <li>
                <span><?php echo $link['title'] ?></span>
                <?php if( isset( $link['catalogue_url'] ) ):    ?><a href="<?php echo $link['catalogue_url'] ?>" rel="external">catalogue</a><?php endif ?>
                <?php if( isset( $link['images_url'] ) ):       ?><a href="<?php echo $link['images_url'] ?>" rel="external">images</a><?php       endif ?>
                <?php if( isset( $link['download_url'] ) ):     ?><a href="<?php echo $link['download_url'] ?>" rel="external">download</a><?php   endif ?>
                <?php if( isset( $link['external_url'] ) ):     ?><a href="<?php echo $link['external_url'] ?>" rel="external">external</a><?php   endif ?>
            </li>
            <?php endforeach ?>
            <?php else: ?>
            <li>
                <span>title</span>
                <a href="#" rel="external">catalogue</a>
                <a href="#" rel="external">images</a>
                <a href="#" rel="external">download</a>
                <a href="#" rel="external">external</a>
            </li>
            <?php endif ?>
        </ul>

        <div class="share-me">
            <p>Share</p>
            <a href=""><img src="/_assets/img/icons/icon-twitter.svg"></a>
            <a href=""><img src="/_assets/img/icons/icon-facebook.svg"></a>
            <a href=""><img src="/_assets/img/icons/icon-pinterest.svg"></a>
            <a href=""><img src="/_assets/img/icons/icon-google.svg"></a>
        </div>
    </div>
    
</div>