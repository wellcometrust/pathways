<?php

    $modules = $page->getPathwayModules();
    $pathwayPath = $page->getPathwayPath();
    $currentModule = $page->getModule();
    $pathwayId = $page->getPathwayId();

    $count = 0;

?>

<div class="global-navigation global-navigation--<?= $pathwayId ?> active">
    <div class="container clearfix">
        <nav>

            <ul class="clearfix">
                <li<?= $currentModule['id'] == '' ? ' class="active"' : '' ?>>
                    <a href="<?= $pathwayPath ?>index.php">
                        <span>Intro</span>
                        <img src="<?= $pathwayPath ?>_assets/navigation/intro.jpg">
                    </a>
                </li>

            <?php
                foreach( $modules as $m ):
                    if ( isset($m['panels']) ) {
                        $count++;
            ?>
                <li<?= $currentModule['id'] == $m['id'] ? ' class="active"' : '' ?>>
                    <a href="<?= $pathwayPath . $m['path'] ?>index.php">
                        <span><?= $m['index']  . '. ' . $m['title'] ?></span>
                        <img src="<?= $pathwayPath . '_assets/navigation/' . $m['id'] ?>.jpg">
                    </a>
                </li>
            <?php
                    }
                endforeach;
            ?>
            </ul>
        </nav>
        <div class="handle closed">
            <div class="current-section">
                <?php if ( isset($currentModule['index']) ) {
                echo '<span class="curr">'.$currentModule['index'].'</span>'.'<span class="total">'. $count . '</span>';
                } ?>
                <svg class="slash" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path xmlns="" width="20" height="20" stroke="none" fill="#FFFFFF" opacity="0.3" d="M20,0 L20,20 L0,20 L20,0Z "/></svg>
            </div>
        </div>
    </div>
</div>
