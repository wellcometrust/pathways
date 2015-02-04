Pathways.components.get('crop-zoom').addData('mesmers-salon', {
    'rod': {
        'image': '/pathways/1-mindcraft/1-mesmer/_assets/rod-crop.jpg',
        'title': '',
        'text': 'Mesmer ‘magnetised’ rods or wands that could be used to direct the fluid to the afflicted part of the body. He would often play music on a glass harmonica that sent shivers through the patients’ nerves.',
        'position': 'right'
    },
    'woman': {
        'image': '/pathways/1-mindcraft/1-mesmer/_assets/woman-crop.jpg',
        'text': 'Patients would form circles, holding hands or grasping cords, to transfer the healing energies between them. Sometimes these healing circles would climax in mass convulsions.',
        'position': 'left'
    },
    'mesmer': {
        'image': '/pathways/1-mindcraft/1-mesmer/_assets/mesmer-crop.jpg',
        'text': 'Mesmer, depicted here with his wand, taught his healing skills to initiates. They were obliged to take a strict vow of secrecy and pay the large sum of 100 livres. Many French aristocrats signed up.',
        'position': 'left'
    }
});

// Pathways.scrollSceneCtrl.addSinglePanelScrollFactory('mesmers-salon', function() {
//     return {
//         getScenes: function(panelId, panelEl, panel) {
//             scene = new ScrollScene({
//                     triggerElement: panelId,
//                     duration: panel.getContentDuration
//                 })
//                 .on('enter', function(e) {
//                     console.log('>>enter factory');
//                 })
//                 .on('leave', function(e) {
//                     console.log('>>leave factory');
//                 });

//             return scene;
//         }
//     };
// });

// Pathways.scrollSceneCtrl.addSinglePanelScrollFactory('mesmers-salon', {
//     getScenes: function(panelId, panelEl, panel) {
//         scene = new ScrollScene({
//                 triggerElement: panelId,
//                 duration: panel.getContentDuration
//             })
//             .on('enter', function(e) {
//                 console.log('>>enter object');
//             })
//             .on('leave', function(e) {
//                 console.log('>>leave object');
//             });

//         return scene;
//     }

// });

// Pathways.scrollSceneCtrl.addSinglePanelScrollMethod('mesmers-salon',
//     function(panelId, panelEl, panel) {
//         scene = new ScrollScene({
//                 triggerElement: panelId,
//                 duration: panel.getContentDuration
//             })
//             .on('enter', function(e) {
//                 console.log('>>enter method');
//             })
//             .on('leave', function(e) {
//                 console.log('>>leave method');
//             });

//         return scene;
//     }

// );
