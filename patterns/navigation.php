<?php

    $modules = $page->getPathwayModules();
    $pathwayPath = $page->getPathwayPath();
    $currentModule = $page->getModule();

    $level = '';

    if (stripos($currentModule['path'], '/') != 0) {
        $level = '../';
    }

?>

<div class="global-navigation active">
    <div class="container clearfix">
        <nav>

            <ul class="clearfix">
                <li<?= $currentModule['id'] == '' ? ' class="active"' : '' ?>>
                    <a href="<?= $pathwayPath ?>intro.php">
                        <span>Intro</span>
                        <img src="<?= $level ?>_assets/navigation/intro.jpg">
                    </a>
                </li>

            <?php 
                foreach( $modules as $m ): 
                    if ( isset($m['panels']) ) {
            ?>                
                <li<?= $currentModule['id'] == $m['id'] ? ' class="active"' : '' ?>>
                    <a href="<?= $pathwayPath . $m['path'] ?>index.php">
                        <span><?= $m['index']  . '. ' . $m['title'] ?></span>
                        <img src="<?= $level ?>_assets/navigation/<?= $m['id'] ?>.jpg">
                    </a>
                </li>
            <?php          
                    }      
                endforeach;
            ?>
            </ul>
        </nav>
        <div class="handle closed">
            <div class="current-section"><?= $currentModule['index'] ?></div>
        </div>
    </div>
</div>