
Pathways.Scene.MesmersSalon = function() {

    var audio = Pathways.initAudio('http://wellcome-pathways.s3.amazonaws.com/mesmers_salon.mp3');
    
    var scene = new ScrollScene({
            triggerElement: '#mesmers-salon',
            duration:       (Pathways.panel_height - 100),
            offset:         100
        })
        .on('enter', function(e) {
            if( audio ) {               

                _('#mesmers-salon').appendChild(audio);                
                Pathways.LoadPanelAudio(audio);
            }            

            _('.crop-zoom').style['position'] = 'fixed';
            TweenMax.to('.crop-zoom', 0.2, { opacity: 1 }); // Fade in
        })
        .on('leave', function(e) {
            Pathways.UnloadPanelAudio(audio);

            TweenMax.to('.crop-zoom', 0.2, { opacity: 0 }); // Fade out
            
            setTimeout(function() {
                _('.crop-zoom').style['position'] = 'absolute';
            }, 200);
        })

    Pathways.Scenes.push(scene);
}