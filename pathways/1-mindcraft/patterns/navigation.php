<?php
    global $config_yml, $pathway, $module, $path;

    $modules = $config_yml['site']['pathways'][$pathway]['modules'];
    
    $idx    = '';
    $count  = 1;

    foreach( $modules as $m ):
        if( $module == $m['id'] )
            $idx = $count;

        $count++;
    endforeach;
?>

<div class="global-navigation active">
    <div class="container clearfix">
        <nav>
            <ul class="clearfix">
                <li<?php echo $module == 'intro' ? ' class="active"' : '' ?>>
                    <a href="<?php echo $path ?>intro.php">
                        <span>Intro</span>
                        <img src="../_assets/navigation/intro.jpg">
                    </a>
                </li>
                <li<?php echo $module == 'mesmer' ? ' class="active"' : '' ?>>
                    <a href="<?php echo $path ?>1-mesmer">
                        <span>1. A new force in nature</span>
                        <img src="../_assets/navigation/mesmer.jpg">
                    </a>
                </li>
                <li<?php echo $module == 'airloom' ? ' class="active"' : '' ?>>
                    <a href="<?php echo $path ?>2-airloom">
                        <span>2. A machine to control the mind</span>
                        <img src="../_assets/navigation/airloom.jpg">
                    </a>
                </li>
                <li<?php echo $module == 'elliotson' ? ' class="active"' : '' ?>>
                    <a href="<?php echo $path ?>3-elliotson">
                        <span>3. Who controls who?</span>
                        <img src="../_assets/navigation/elliotson.jpg">
                    </a>
                </li>
                <li<?php echo $module == 'esdaile' ? ' class="active"' : '' ?>>
                    <a href="<?php echo $path ?>4-esdaile">
                        <span>4. Mind over matter</span>
                        <img src="../_assets/navigation/esdaile.jpg">
                    </a>
                </li>
                <li<?php echo $module == 'svengali' ? ' class="active"' : '' ?>>
                    <a href="<?php echo $path ?>5-svengali">
                        <span>5. Dark forces</span>
                        <img src="../_assets/navigation/svengali.jpg">
                    </a>
                </li>
                <li<?php echo $module == 'freud' ? ' class="active"' : '' ?>>
                    <a href="<?php echo $path ?>6-freud">
                        <span>6. Secrets of the mind revealed</span>
                        <img src="../_assets/navigation/freud.jpg">
                    </a>
                </li>
            </ul>
        </nav>
        <div class="handle closed">
            <div class="current-section"><?php echo $idx ?></div>
        </div>
    </div>
</div>