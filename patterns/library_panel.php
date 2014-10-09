<?php
    global $root, $path, $panel, $config_yml, $pathway, $module;

    $modules = $config_yml['site']['pathways'][$pathway]['modules'];

    foreach( $modules as $m ):
        if( $module == $m['id'] )
            $modulepath = $m['path'];
    endforeach;

    $panel_link = $root.$path.$modulepath.'#'.$panel['id'];
    $url_panel_link = urlencode($panel_link);
?>

<!-- <p>Path: '<?php echo $panel_link ?>'</p>
<p>Path: '<?php echo $url_panel_link ?>'</p>
 -->
 
<div class="library-panel" data-panel="<?php echo isset($panel['id']) ? $panel['id'] : '' ?>" data-component="library-panel">
    <div class="handle"></div>
    <div class="body">        
        <?php if( isset($panel['links']) ): ?>
        <ul>
            <?php foreach ($panel['links'] as $link): ?>
            <li>
                <span><?php echo $link['title'] ?></span>

                <?php if( isset( $link['player_url'] ) && $link['player_url'] != '' ): ?>
                <a href="#" data-component="player-overlay" data-embed="<?php echo $link['player_url'] ?>">View</a>
                <?php endif ?>
                <?php if( isset( $link['download_url'] ) ): ?><a href="<?php echo $link['download_url'] ?>" rel="external">Download hi-res image</a><?php endif ?>
                <?php if( isset( $link['external_url'] ) ): ?><a href="<?php echo $link['external_url'] ?>" rel="external">View on external website</a><?php endif ?>
            </li>
            <?php endforeach ?>
        </ul>
        <?php endif ?>

        <div class="share-me">
            <p>Share</p>
            <!-- <a href=""><img src="/_assets/img/icons/icon-twitter-circle-white.svg" alt="share on twitter"></a>
            <a href=""><img src="/_assets/img/icons/icon-facebook-circle-white.svg" alt="share on facebook"></a>
            <a href=""><img src="/_assets/img/icons/icon-pinterest-circle-white.svg" alt="share on pinterest"></a>
            <a href=""><img src="/_assets/img/icons/icon-gplus-circle-white.svg" alt="share on google plus"></a>
 -->
            

            <a href="<?php echo $panel_link ?>"><img src="/_assets/img/icons/icon-twitter-circle-white.svg" alt="share on twitter"></a>
            <a href="<?php echo $panel_link ?>" class="twitter-share-button">Tweet</a> 
            <div class="fb-share-button" data-href="<?php echo $panel_link ?>"></div>
            <a href="//www.pinterest.com/pin/create/button/?url=<?php echo $url_panel_link ?>&media=http%3A%2F%2Ffarm8.staticflickr.com%2F7027%2F6851755809_df5b2051c9_z.jpg&description=Next%20stop%3A%20Pinterest" data-pin-do="buttonPin" data-pin-config="none" data-pin-color="white" data-pin-height="28"><img src="//assets.pinterest.com/images/pidgets/pinit_fg_en_rect_white_28.png" /></a>
            <div class="g-plus" data-action="share" href="<?php echo $panel_link ?>"></div>
            
        </div>
    </div>
    
</div>