Pathways.Scene.GonadMan = function(panelID) {

    var $panel = $(panelID),
        $quiz = $panel.find('[data-component="quiz"]'),
        height = $panel.outerHeight();

    var scene1 = new ScrollScene({
            triggerElement: panelID,
            triggerHook: 'top',
            duration: function() {
                return $panel.outerHeight() + (Pathways.panelHeight * 0.5);
            }
        })
        .on('enter', function() {
            $panel.addClass('active');
        }).on('leave', function() {
            $panel.removeClass('active');
        });

    return scene1;
};

Pathways.components.quiz.guessTheTumour = {
    data: {
        'title': 'The Esdaile Game',
        'images': '/_assets/img/quizzes/guess-the-tumour',
        'questions': [{
            'image': 'q1-300h.jpg',
            'title': 'How much did this jaw-dropping tumour weigh?',
            'answers': ['2 pounds', '5 pounds', '10 pounds', '23 pounds'],
            'correct': 2
        }, {
            'image': 'q2-300h.jpg',
            'title': 'How long did it take Esdaile to remove this whopping 103 pound tumour?',
            'answers': ['10 seconds', '1 hour', '6 and a half minutes', '6 hours'],
            'correct': 3
        }, {
            'image': 'q3-300h.jpg',
            'title': 'What was the weight of this extremely uncomfortable-looking tumour?',
            'answers': ['80 pounds', '40 pounds', '400 pounds', '60 pounds'],
            'correct': 1
        }, {
            'image': 'q4-300h.jpg',
            'title': 'How much did this tumour weigh before Esdaile got it off the patient’s chest?',
            'answers': ['10 pounds', '80 pounds', '60 pounds', '40 pounds'],
            'correct': 1
        }, {
            'image': 'q5-300h.jpg',
            'title': 'This 90 pound tumour was removed by Esdaile without anaesthetic. But how long did it take?',
            'answers': ['It never was removed', '30 minutes', '9 minutes', '3 minutes'],
            'correct': 4
        }, ]
    }
};
