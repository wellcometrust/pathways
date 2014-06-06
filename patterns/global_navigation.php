<?php
    $module     = isset($module) ? $module : 'mesmer';
    $indices    = ['mesmer' => 1,'airloom' => 2,'elliotson' => 3,'esdaile' => 4,'svengali' => 5,'freud' => 6];
    $idx        = $indices[$module];
?>

<div class="global-navigation" data-component="global-navigation">
    <div class="container clearfix">
        <nav>
            <ul class="clearfix">
                <li<?php echo $module == 'mesmer' ? ' class="active"' : '' ?>>
                    <a href="mesmer.php">
                        <span>Mesmer</span>
                        <img src="/_assets/img/navigation/mesmer.jpg">
                    </a>
                </li>
                <li<?php echo $module == 'airloom' ? ' class="active"' : '' ?>>
                    <a href="airloom.php">
                        <span>Airloom</span>
                        <img src="/_assets/img/navigation/airloom.jpg">
                    </a>
                </li>
                <li<?php echo $module == 'elliotson' ? ' class="active"' : '' ?>>
                    <a href="elliotson.php">
                        <span>Elliotson</span>
                        <img src="/_assets/img/navigation/elliotson.jpg">
                    </a>
                </li>
                <li<?php echo $module == 'esdaile' ? ' class="active"' : '' ?>>
                    <a href="esdaile.php">
                        <span>Esdaile</span>
                        <img src="/_assets/img/navigation/esdaile.jpg">
                    </a>
                </li>
                <li<?php echo $module == 'svengali' ? ' class="active"' : '' ?>>
                    <a href="svengali.php">
                        <span>Svengali</span>
                        <img src="/_assets/img/navigation/svengali.jpg">
                    </a>
                </li>
                <li<?php echo $module == 'freud' ? ' class="active"' : '' ?>>
                    <a href="freud.php">
                        <span>Freud</span>
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