<?php
    global $panel;
?>

<div class="library-panel" data-panel="<?php echo isset($panel['id']) ? $panel['id'] : '' ?>" data-component="library-panel">
    <div class="handle"></div>
    <div class="body">        
        <?php if( isset($panel['links']) ): ?>
        <ul>
            <?php foreach ($panel['links'] as $link): ?>
            <li>
                <span><?php echo $link['title'] ?></span>
                <?php if( isset( $link['see_in_Wellcome_Library_url'] ) ):  ?><a href="<?php echo $link['see_in_Wellcome_Library_url'] ?>" rel="external">View</a><?php       endif ?>
                <?php if( isset( $link['download_hi_res_url'] ) ):          ?><a href="<?php echo $link['download_hi_res_url'] ?>" rel="external">Download hi-res image</a><?php   endif ?>
                <?php if( isset( $link['external_url'] ) ):                 ?><a href="<?php echo $link['external_url'] ?>" rel="external">View on external website</a><?php   endif ?>
            </li>
            <?php endforeach ?>
        </ul>
        <?php endif ?>

        <div class="share-me">
            <p>Share</p>
            <a href=""><img src="/_assets/img/icons/icon-twitter-circle-white.svg" alt="share on twitter"></a>
            <a href=""><img src="/_assets/img/icons/icon-facebook-circle-white.svg" alt="share on facebook"></a>
            <a href=""><img src="/_assets/img/icons/icon-pinterest-circle-white.svg" alt="share on pinterest"></a>
            <a href=""><img src="/_assets/img/icons/icon-gplus-circle-white.svg" alt="share on google plus"></a>
        </div>
    </div>
    
</div>