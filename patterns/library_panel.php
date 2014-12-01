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

    if (isset($panel['share'])) {
        $share =            $panel['share'];
        $pinterest_img =    isset($share['img']) ? urlencode($share['img']) : '';
        $share_text =       isset($share['text']) ? urlencode($share['text']) : '';
    }


?>

<div class="library-panel" data-panel="<?= $id ?>" data-component="library-panel">
    <div class="handle" data-ga="<?= $gaData . 'l2 open share' ?>"></div>
    <div class="body">
        <?php if( isset($panel['links']) ): ?>
        <ul>
            <?php foreach ($panel['links'] as $key=>$link):

            $lTitle     = isset( $link['title'] ) ? $link['title'] : '';

            $pLink      = isset( $link['player_url'] ) ? $link['player_url'] : '';
            $dLink      = isset( $link['download_url'] ) ? $link['download_url'] : '';
            $eLink      = isset( $link['external_url'] ) ? $link['external_url'] : '';

            $lHref      = str_replace('/package/', '/player/', $pLink);

            $shortTitle = $key.'-'.truncate($lTitle, 40);

            ?>
            <li>
                <span><?= $lTitle ?></span>

                <?php if( $pLink != '' ): ?><a href="<?= $lHref ?>" data-component="player-overlay" data-embed="<?= $pLink ?>" data-ga="<?= $gaData . 'l2 share ' . $shortTitle . ' - view' ?>">View</a><?php endif ?>
                <?php if( $dLink != '' ): ?><a href="<?= $dLink ?>" rel="external" data-ga="<?= $gaData . 'l2 share ' . $shortTitle . ' - download' ?>">Download hi-res image</a><?php endif ?>
                <?php if( $eLink != '' ): ?><a href="<?= $eLink ?>" rel="external" target="_blank" data-ga="<?= $gaData . 'l2 share ' . $shortTitle . ' - view external' ?>">View on external website</a><?php endif ?>
            </li>
            <?php endforeach ?>
        </ul>
        <?php endif ?>

        <?php if( isset($share) ): ?>
        <div class="share-me">
            <p>Share</p>

            <ul>
                <li class="twitter" data-ga="<?= $gaData . 'l2 share twitter' ?>"><a href="https://twitter.com/intent/tweet?url=<?= $url_panel_link ?>&via=ExploreWellcome&text=<?= $share_text?>"><img src="/_assets/img/icons/icon-twitter-btn.gif" alt="share on twitter"></a></li>
                <li class="facebook" data-ga="<?= $gaData . 'l2 share facebook' ?>"><div class="fb-share-button" data-href="<?= $panel_link ?>" data-layout="button" data-width="75"></div></li>
                <li class="pinterest" data-ga="<?= $gaData . 'l2 share pinterest' ?>"><a href="//www.pinterest.com/pin/create/button/?url=<?= $url_panel_link?>&media=<?= $pinterest_img?>&description=<?= $share_text?>" data-pin-config="none" data-pin-color="white" data-pin-height="28"><img src="//assets.pinterest.com/images/pidgets/pinit_fg_en_rect_white_28.png" /></a></li>
                <li class="googleplus" data-ga="<?= $gaData . 'l2 share googleplus' ?>"><div class="g-plus" data-action="share" data-annotation="none" data-href="<?= $panel_link ?>"></div></li>
            </ul>

        </div>
        <?php endif ?>
    </div>

</div>
