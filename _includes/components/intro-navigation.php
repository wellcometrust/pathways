<?php

    $modules = $page->getPathwayModules();
    $pathwayPath = $page->getPathwayPath();
    $currentModule = $page->getModule();
    $pathwayId = $page->getPathwayId();

?>

<div class="intro-navigation intro-navigation--<?= $pathwayId ?> active">
    <div class="container clearfix">
        <nav>

            <ul class="clearfix">

            <?php
                foreach( $modules as $m ):
                    if ( isset($m['panels']) ) {
            ?>
                <li>
                    <a href="<?= $pathwayPath . $m['path'] ?>">
                        <span><?= $m['index']  . '. ' . $m['title'] ?></span>
                        <img src="<?= $pathwayPath . '_assets/navigation/'. $m['id'] ?>.jpg">
                    </a>
                </li>
            <?php
                    }
                endforeach;
            ?>
            </ul>
        </nav>
    </div>
</div>
