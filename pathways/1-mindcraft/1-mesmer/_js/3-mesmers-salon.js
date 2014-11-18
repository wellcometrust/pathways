Pathways.Scene.MesmersSalon = function(panelID) {
    //TODO: remove absolute selector for .crop-zoom
    //TODO: add to component-level activator

    var scene = new ScrollScene({
            triggerElement: panelID,
            duration: (Pathways.panelHeight - 100),
            offset: 100
        })
        .on('enter', function(e) {
            _('.crop-zoom').style.position = 'fixed';
            TweenMax.to('.crop-zoom', 0.2, {
                opacity: 1
            }); // Fade in
        })
        .on('leave', function(e) {
            TweenMax.to('.crop-zoom', 0.2, {
                opacity: 0
            }); // Fade out

            setTimeout(function() {
                _('.crop-zoom').style.position = 'absolute';
            }, 200);
        });

     return scene;
};

Pathways.components.cropZoom.mesmersSalon = {
    data: {
        'rod': {
            'image': '/pathways/1-mindcraft/_assets/1-mesmer/rod-crop.jpg',
            'title': '',
            'text': 'Mesmer ‘magnetised’ rods or wands that could be used to direct the fluid to the afflicted part of the body. He would often play music on a glass harmonica that sent shivers through the patients’ nerves.',
            'position': 'right'
        },
        'woman': {
            'image': '/pathways/1-mindcraft/_assets/1-mesmer/woman-crop.jpg',
            'text': 'Patients would form circles, holding hands or grasping cords, to transfer the healing energies between them. Sometimes these healing circles would climax in mass convulsions.',
            'position': 'left'
        },
        'mesmer': {
            'image': '/pathways/1-mindcraft/_assets/1-mesmer/mesmer-crop.jpg',
            'text': 'Mesmer, depicted here with his wand, taught his healing skills to initiates. They were obliged to take a strict vow of secrecy and pay the large sum of 100 livres. Many French aristocrats signed up.',
            'position': 'left'
        }
    }
};
