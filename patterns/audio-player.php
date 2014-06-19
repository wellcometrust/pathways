<?php
    $as = isset( $audio_src ) ? $audio_src : '/_assets/audio/Riding.mp3';
?>
<div class="audio-player" data-src="<?php echo $as ?>" data-component="audio-player">
    <div class="time-left">Time left: <span>0.00</span></div>
    <div class="progress-bar">
        <div class="progressed"></div>
    </div>
    <div class="controls play"></div>
</div>