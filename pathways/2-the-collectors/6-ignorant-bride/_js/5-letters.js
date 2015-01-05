
Pathways.scrollScenes.Letters = function() {

    var scene = new ScrollScene({
            triggerElement: '#letters',
            duration:       Pathways.panelHeight
        })
        .on('enter', function(e) {
            if( _('#letters audio') ) {
                _('#letters audio').play();
            }
        })
        .on('leave', function() {
            if( _('#letters audio') ) {
                _('#letters audio').pause();
            }
        });

    return scene;
};

Pathways.components.letterGallery.marieStopesLetters = {
    data: {
        location: 'galleries/marie-stopes-letters/',
        images: [{
            image: '01-HorridVice-pp-08-HIGHLIGHT',
            text: 'Quacks and travelling medicine vendors were a common sight in the 17th and 18th century.',
            audio: 'http://s3-eu-west-1.amazonaws.com/digitalstories/digital-stories/the-collectors/audio-stopes-letters/01-HorridVice-Extract.mp3',
        }, {
            image: '02-HugeAppendage-Transcript-pp-03-HIGHLIGHT',
            text: 'They were selling snake oil but sometimes antidotes to snake poison, like this vendor.',
            audio: 'http://s3-eu-west-1.amazonaws.com/digitalstories/digital-stories/the-collectors/audio-stopes-letters/02-HugeAppendage-Extract.mp3',
        }, {
            image: '03-PositionsDuringPregnancy-pp-01-HIGHLIGHT',
            text: 'Some of them were women: Anne Manning, a quack doctor, outside her cottage with Betty Upton.',
            audio: 'http://s3-eu-west-1.amazonaws.com/digitalstories/digital-stories/the-collectors/audio-stopes-letters/03-PositionsDuringPregnancy-Extract.mp3',
        }, {
            image: '04-PleasureWithoutPregnancy-pp-01-HIGHLIGHT',
            text: 'Doctor Kill’em-or-Cure’em irresponsibly dispensing his potions.',
            audio: 'http://s3-eu-west-1.amazonaws.com/digitalstories/digital-stories/the-collectors/audio-stopes-letters/04-PleasureWithoutPregnancy-Extract.mp3',
        }, {
            image: '05-LargeSexOrgans-pp-01-HIGHLIGHT',
            text: 'A sailor with a bandaged eye consulting a quack doctor.',
            audio: 'http://s3-eu-west-1.amazonaws.com/digitalstories/digital-stories/the-collectors/audio-stopes-letters/05-LargeSexOrgans-Extract.mp3',
        }, {
            image: '06-GoBackHome-pp-01-HIGHLIGHT',
            text: 'Doctor Bossy selling his wares on stage with assistants at Covent Garden, London.',
            audio: 'http://s3-eu-west-1.amazonaws.com/digitalstories/digital-stories/the-collectors/audio-stopes-letters/06-GoBackHome-Extract.mp3',
        }, {
            image: '07-FreeingTheCaptives-pp-01-HIGHLIGHT',
            text: 'Doctor Botherum, perhaps based on Doctor Bossy, selling his goods to a raucous crowd.',
            audio: 'http://s3-eu-west-1.amazonaws.com/digitalstories/digital-stories/the-collectors/audio-stopes-letters/07-FreeingTheCaptives.mp3',
        }]
    }
};
