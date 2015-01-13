<?php
    $link = $page->getPathwaySurveyLink();
?>
<?php if (!empty($link)) { ?>
<div class="survey">
    <a href="<?= $link ?>">Please help us by telling us what you thought of this digital story</a>
</div>
<?php } ?>
