
Pathways.Scene.MagnetisedTrees = function(panelID) {
    
    

// Canvas animations. Forget trying to pause/play on entering exiting the panel. Let it go, man. Just let it go...

/*function initCanvas(images) {
    var canvas = document.getElementById("canvas");
    var images = images||{};
    var stage = new createjs.Stage(canvas);

    var loader = new createjs.LoadQueue(false);
    loader.addEventListener("fileload", bindFileLoad(images));
    loader.addEventListener("complete", bindComplete(canvas, stage));
    loader.loadManifest(lib.properties.manifest);
    return stage;
}

function bindFileLoad(images) {
    return function handleFileLoad(evt) {
        if (evt.item.type == "image") { images[evt.item.id] = evt.result; }
    }
}

function bindComplete(canvas, stage) {
    return function handleComplete() {
        var exportRoot = new lib.tree2();

        stage.addChild(exportRoot);
        stage.update();

        createjs.Ticker.setFPS(lib.properties.fps);

        if( Modernizr.touch ) {
            createjs.Ticker.addEventListener("tick", stage);
        }
    }
}

var stage = initCanvas(images);

if( window.innerWidth >= 768 ) {
    initCanvas();
}*/

    var scene1 = new ScrollScene({
            triggerElement: panelID,
            duration:       Pathways.panel_height
        })
        .on('enter', function(e) {
            
            if( e.scrollDirection == 'FORWARD' ) {
                TweenMax.to(panelID + ' .black-strip', .4, { y: 0 }); // Scroll up
                createjs.Ticker.addEventListener("tick", stage);
            }
        })
        .on('leave', function(e) {
            
            if( e.scrollDirection == 'REVERSE' ) {
                TweenMax.to(panelID + ' .black-strip', .2, { y: Pathways.panel_height }); // scroll down
                createjs.Ticker.removeEventListener("tick", stage);
            }
        });

    Pathways.Scenes.push(scene1);
}