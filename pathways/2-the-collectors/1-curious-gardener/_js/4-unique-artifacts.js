Pathways.Scene.UniqueArtifacts = function(panelID) {

    var scene = new ScrollScene({
            triggerElement: panelID,
            duration: (Pathways.panelHeight - 100),
            offset: 100
        })
        .on('enter', function(e) {
            _('.crop-zoom').style['position'] = 'fixed';
            TweenMax.to('.crop-zoom', 0.2, {
                opacity: 1
            }); // Fade in
        })
        .on('leave', function(e) {
            TweenMax.to('.crop-zoom', 0.2, {
                opacity: 0
            }); // Fade out

            setTimeout(function() {
                _('.crop-zoom').style['position'] = 'absolute';
            }, 200);
        });

    return scene;
};

Pathways.components.cropZoom.uniqueArtifacts = {
    data: {
        'croc': {
            'image': '/pathways/1-mindcraft/_assets/1-mesmer/rod-crop.jpg',
            'title': '',
            'text': 'Tradescant was attracted by large or exotic items. His requests to British ships included pleas for ‘the biggest that canbe gotten’ and ‘any thing that is strang’.',
            'position': 'right'
        },
        'person': {
            'image': '/pathways/1-mindcraft/_assets/1-mesmer/woman-crop.jpg',
            'text': 'Royal apothecary John Parkinson described his friend, and self-made man, John Tradescant as ‘that worthy, curious, and diligent searcher and preserver of all natures rarities and varieties’.',
            'position': 'left'
        },
        'bird': {
            'image': '/pathways/1-mindcraft/_assets/1-mesmer/mesmer-crop.jpg',
            'text': 'One of Tradescant’s earliest documented collecting experiences occurred on a 16-week sea voyage to the Russian city of Archangel. When a strange bird, ‘whose like I yet never sawe’, flew onto the ship’s deck, it was caught and given to Tradescant.',
            'position': 'left'
        },
        'cabinet': {
            'image': '/pathways/1-mindcraft/_assets/1-mesmer/rod-crop.jpg',
            'text': 'Tradescant’s rarities were ultimately acquired, in disputed circumstances, by the lawyer and alchemist Elias Ashmole. Ashmole later left the collection to the University of Oxford, where it formed the basis of the Ashmolean Museum.',
            'position': 'left'
        },
        'books': {
            'image': '/pathways/1-mindcraft/_assets/1-mesmer/woman-crop.jpg',
            'text': 'New World explorer John Smith bequeathed half his library of books to Tradescant.',
            'position': 'left'
        },
        'window': {
            'image': '/pathways/1-mindcraft/_assets/1-mesmer/mesmer-crop.jpg',
            'text': 'After establishing what would become Britain’s first museum, Tradescant clocked up another first. He became the initial Keeper of the Oxford Physic Garden, England’s first botanic garden.',
            'position': 'left'
        }
    }
};
