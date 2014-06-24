<?php
    global $panel;
?>

<div class="library-panel" data-component="library-panel">
    <div class="handle">i</div>
    <div class="body">
        <span>Sources</span>
        
        <ul>
            <?php foreach ($panel['links'] as $link): ?>
            <li>
                <span><?php echo $link['title'] ?></span>
                <?php if( isset( $link['catalogue_url'] ) ):    ?><a href="<?php echo $link['catalogue_url'] ?>">catalogue</a><?php endif ?>
                <?php if( isset( $link['images_url'] ) ):       ?><a href="<?php echo $link['images_url'] ?>">images</a><?php       endif ?>
                <?php if( isset( $link['download_url'] ) ):     ?><a href="<?php echo $link['download_url'] ?>">download</a><?php   endif ?>
                <?php if( isset( $link['external_url'] ) ):     ?><a href="<?php echo $link['external_url'] ?>">external</a><?php   endif ?>
            </li>
            <?php endforeach ?>
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