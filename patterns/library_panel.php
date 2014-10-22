<?php    

    $panel = $data;

    $hostRoot =     $page->hostRoot;
    $module =       $page->getModule();
    $modulePath =   $module['path'];
    $pathwayPath =  $page->getPathwayPath();
   

    $panel_link =       $hostRoot.$pathwayPath.$modulePath.'#'.$panel['id'];
    $url_panel_link =   urlencode($panel_link);

    $pinterest_img =    urlencode($panel['share']['img']);
    $share_text =       urlencode($panel['share']['text']);

    $id = isset($panel['id']) ? $panel['id'] : '';
?>
 
<div class="library-panel" data-panel="<?= $id ?>" data-component="library-panel">
    <div class="handle"></div>
    <div class="body">        
        <?php if( isset($panel['links']) ): ?>
        <ul>
            <?php foreach ($panel['links'] as $link): ?>
            <li>
                <span><?= $link['title'] ?></span>

                <?php if( isset( $link['player_url'] ) && $link['player_url'] != '' ): ?>
                <a href="#" data-component="player-overlay" data-embed="<?= $link['player_url'] ?>">View</a>
                <?php endif ?>
                <?php if( isset( $link['download_url'] ) ): ?><a href="<?= $link['download_url'] ?>" rel="external">Download hi-res image</a><?php endif ?>
                <?php if( isset( $link['external_url'] ) ): ?><a href="<?= $link['external_url'] ?>" rel="external">View on external website</a><?php endif ?>
            </li>
            <?php endforeach ?>
        </ul>
        <?php endif ?>

        <?php if( isset($panel['share']) ): ?>
        <div class="share-me">
            <p>Share</p>
            
            <ul>
                <li class="twitter"><a id="<?= 'twitter-'. $id ?>" href="https://twitter.com/intent/tweet?url=<?= $url_panel_link ?>&via=WellcomeLibrary&text=<?= $share_text?>"><img src="/_assets/img/icons/icon-twitter-btn.gif" alt="share on twitter"></a></li>
                <li class="facebook"><div id="<?= 'facebook-'. $id ?>" class="fb-share-button" data-href="<?= $panel_link ?>" data-layout="button" data-width="75"></div></li>
                <li class="pinterest"><a id="<?= 'pinterest-'. $id ?>" href="//www.pinterest.com/pin/create/button/?url=<?= $url_panel_link?>&media=<?= $pinterest_img?>&description=<?= $share_text?>" data-pin-config="none" data-pin-color="white" data-pin-height="28"><img src="//assets.pinterest.com/images/pidgets/pinit_fg_en_rect_white_28.png" /></a></li>
                <li class="googleplus"><div id="<?= 'googleplus-'. $id ?>" class="g-plus" data-action="share" data-annotation="none" data-href="<?= $panel_link ?>" data-width="56"></div></li>
            </ul>  
           
        </div>
        <?php endif ?>
    </div>
    
</div>