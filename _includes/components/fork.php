<?php
    $fullpath = $page->getModulePath();
    $gaRoot =   $page->getGARoot();
?>

<div class="fork">

    <?php include($fullpath. '_panels/fork.php'); ?>

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
