<?php
    global $root, $path, $panel, $config_yml, $pathway, $module;

    $modules = $config_yml['site']['pathways'][$pathway]['modules'];

    foreach( $modules as $m ):
        if( $module == $m['id'] )
            $modulepath = $m['path'];
    endforeach;

    $panel_link = $root.$path.$modulepath.'#'.$panel['id'];
    $url_panel_link = urlencode($panel_link);

    $pinterest_img = urlencode($panel['share']['img']);
    $share_text = urlencode($panel['share']['text']);
?>
 
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
            
            <ul>
                <li class="twitter"><a href="https://twitter.com/intent/tweet?url=<?php echo $url_panel_link ?>&via=WellcomeLibrary&text=<?php echo $share_text?>"><img src="/_assets/img/icons/icon-twitter-btn.gif" alt="share on twitter"></a></li>
                <li class="facebook"><div class="fb-share-button" data-href="<?php echo $panel_link ?>" data-layout="button" data-width="75"></div></li>
                <li class="pinterest"><a href="//www.pinterest.com/pin/create/button/?url=<?php echo $url_panel_link?>&media=<?php echo $pinterest_img?>&description=<?php echo $share_text?>" data-pin-config="none" data-pin-color="white" data-pin-height="28"><img src="//assets.pinterest.com/images/pidgets/pinit_fg_en_rect_white_28.png" /></a></li>
                <li class="googleplus"><div class="g-plus" data-action="share" data-annotation="none" data-href="<?php echo $panel_link ?>" data-width="56"></div></li>
            </ul>  
           
        </div>
    </div>
    
</div>