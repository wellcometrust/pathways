<?php    

    $panel = $data;

    $hostRoot =     $page->hostRoot;
    $module =       $page->getModule();
    $modulePath =   $module['path'];
    $pathwayPath =  $page->getPathwayPath();

    

    $id =           isset($panel['id']) ? $panel['id'] : '';

    $gaData =       $page->getGARoot() . $id . ' - ';

    $panel_link =       $hostRoot.$pathwayPath.$modulePath.'#'.$id;
    $url_panel_link =   urlencode($panel_link);

    $pinterest_img =    urlencode($panel['share']['img']);
    $share_text =       urlencode($panel['share']['text']);

    
?>
 
<div class="library-panel" data-panel="<?= $id ?>" data-component="library-panel" data-ga="<?= $gaData . 'l2 share open' ?>">
    <div class="handle"></div>
    <div class="body">        
        <?php if( isset($panel['links']) ): ?>
        <ul>
            <?php foreach ($panel['links'] as $link): 
            $shortTitle = truncate($link['title'], 40);
            ?>
            <li>
                <span><?= $link['title'] ?></span>

                <?php if( isset( $link['player_url'] ) && $link['player_url'] != '' ): ?>
                <a href="#" data-component="player-overlay" data-embed="<?= $link['player_url'] ?>" data-ga="<?= $gaData . 'l2 share ' . $shortTitle . ' - view' ?>">View</a>
                <?php endif ?>
                <?php if( isset( $link['download_url'] ) ): ?><a href="<?= $link['download_url'] ?>" rel="external" data-ga="<?= $gaData . 'l2 share ' . $shortTitle . ' - download' ?>">Download hi-res image</a><?php endif ?>
                <?php if( isset( $link['external_url'] ) ): ?><a href="<?= $link['external_url'] ?>" rel="external"data-ga="<?= $gaData . 'l2 share ' . $shortTitle . ' - view external' ?>">View on external website</a><?php endif ?>
            </li>
            <?php endforeach ?>
        </ul>
        <?php endif ?>

        <?php if( isset($panel['share']) ): ?>
        <div class="share-me">
            <p>Share</p>
            
            <ul>
                <li class="twitter" data-ga="<?= $gaData . 'l2 share twitter' ?>"><a href="https://twitter.com/intent/tweet?url=<?= $url_panel_link ?>&via=WellcomeLibrary&text=<?= $share_text?>"><img src="/_assets/img/icons/icon-twitter-btn.gif" alt="share on twitter"></a></li>
                <li class="facebook" data-ga="<?= $gaData . 'l2 share facebook' ?>"><div class="fb-share-button" data-href="<?= $panel_link ?>" data-layout="button" data-width="75"></div></li>
                <li class="pinterest" data-ga="<?= $gaData . 'l2 share pinterest' ?>"><a href="//www.pinterest.com/pin/create/button/?url=<?= $url_panel_link?>&media=<?= $pinterest_img?>&description=<?= $share_text?>" data-pin-config="none" data-pin-color="white" data-pin-height="28"><img src="//assets.pinterest.com/images/pidgets/pinit_fg_en_rect_white_28.png" /></a></li>
                <li class="googleplus" data-ga="<?= $gaData . 'l2 share googleplus' ?>"><div class="g-plus" data-action="share" data-annotation="none" data-href="<?= $panel_link ?>" data-width="56"></div></li>
            </ul>  
           
        </div>
        <?php endif ?>
    </div>
    
</div>