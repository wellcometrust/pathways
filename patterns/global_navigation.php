<?php
    global $module, $path;

    // $path = $config['pathways'][1]['url'];
    
    $module     = isset($module) ? $module : '';
    $indices    = ['mesmer' => 1,'airloom' => 2,'elliotson' => 3,'esdaile' => 4,'svengali' => 5,'freud' => 6];
    $idx        = isset($indices[$module]) ? $indices[$module] : '';
?>

<div class="global-navigation active" data-component="global-navigation">
    <div class="container clearfix">
        <nav>
            <ul class="clearfix">
                <li<?php echo $module == 'intro' ? ' class="active"' : '' ?>>
                    <a href="<?php echo $path ?>intro">
                        <span>Intro</span>
                        <img src="/_assets/img/navigation/intro.jpg">
                    </a>
                </li>
                <li<?php echo $module == 'mesmer' ? ' class="active"' : '' ?>>
                    <a href="<?php echo $path ?>1-mesmer">
                        <span>1. A new force in nature</span>
                        <img src="/_assets/img/navigation/mesmer.jpg">
                    </a>
                </li>
                <li<?php echo $module == 'airloom' ? ' class="active"' : '' ?>>
                    <a href="<?php echo $path ?>2-airloom">
                        <span>2. A machine to control the mind</span>
                        <img src="/_assets/img/navigation/airloom.jpg">
                    </a>
                </li>
                <li<?php echo $module == 'elliotson' ? ' class="active"' : '' ?>>
                    <a href="<?php echo $path ?>3-elliotson">
                        <span>3. Who controls who?</span>
                        <img src="/_assets/img/navigation/elliotson.jpg">
                    </a>
                </li>
                <li<?php echo $module == 'esdaile' ? ' class="active"' : '' ?>>
                    <a href="<?php echo $path ?>4-esdaile">
                        <span>4. Mind over matter</span>
                        <img src="/_assets/img/navigation/esdaile.jpg">
                    </a>
                </li>
                <li<?php echo $module == 'svengali' ? ' class="active"' : '' ?>>
                    <a href="<?php echo $path ?>5-svengali">
                        <span>5. Dark forces</span>
                        <img src="/_assets/img/navigation/svengali.jpg">
                    </a>
                </li>
                <li<?php echo $module == 'freud' ? ' class="active"' : '' ?>>
                    <a href="<?php echo $path ?>6-freud">
                        <span>6. Secrets of the mind revealed</span>
                        <img src="/_assets/img/navigation/freud.jpg">
                    </a>
                </li>
            </ul>
        </nav>
        <div class="handle closed">
            <div class="current-section"><?php echo $idx ?></div>
            <div class="open-nav-btn"><img src="/_assets/img/icons/icon-btn-next.svg"></div>
        </div>
    </div>
</div>