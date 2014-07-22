<?php
    global $config_yml, $pathway, $module, $path;

    $modules = $config_yml['site']['pathways'][$pathway]['modules'];
    
    $idx    = '';
    $count  = 1;
?>

<div class="global-navigation global-navigation--the-collectors active">
    <div class="container clearfix">
        <nav>
            <ul class="clearfix">
                <li>
                    <a href="<?php echo $path ?>intro.php">
                        <span>Intro</span>
                        <div class="image">
                            <img src="/_assets/img/spacer.png">
                        </div>
                    </a>
                </li>

            <?php foreach( $modules as $m ): ?>
                <li<?php echo $module == $m['id'] ? ' class="active"' : '' ?>>
                    <a href="<?php echo $path . $count . '-' . $m['id'] ?>/index.php">
                        <span><?php echo $count . '. ' . $m['title'] ?></span>
                        <div class="image">
                            <img src="/_assets/img/spacer.png">
                        </div>
                    </a>
                </li>
            <?php
                if( $module == $m['id'] )
                    $idx = $count;

                $count++;
                endforeach;
            ?>
            </ul>
        </nav>

        <div class="handle closed">
            <div class="current-section"><?php echo $idx ?></div>
        </div>
    </div>
</div>