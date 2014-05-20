

Pathways.Quiz = function() {
    var $quiz           = $('.quiz'),
        started         = false,
        paused          = false,
        level           = 1,
        questions       = quiz_db['questions'],
        answers         = quiz_db['questions'][level]['answers'],
        totalQuestions  = questions.length,
        score           = 0,

        $remaining  = $quiz.find('.remaining'),
        $score      = $quiz.find('.score'),

        $timer      = $('<div/>').addClass('timer').css('display', 'none'),
        timerID;

    this.init = function() {
        var self = this;

        $quiz.find('.start .button').on('click', function() {
            self.start();
        });
    }

    this.start = function() {
        var self = this;

        $quiz.find('.start').hide();
        $quiz.find('.playground').show();

        // Add the timer
        $quiz.append($timer);

        // Load the level
        this.loadLevel();

        // set up the click events
        $quiz.on('click', 'li', function(e) {
            if( !paused )
                self.validate(e);
        });
    }

    this.getCurrentQuestion = function() {
        return questions[(level-1)];
    }

    this.loadLevel = function(l) {
        // image
        var question    = this.getCurrentQuestion(),
            $image      = $('<img/>').attr('src', question['image']),
            str         = '';

        $quiz.find('.image').html($image);

        // question
        $quiz.find('.question').html(question['title']);

        // answers
        for (var i = 0; i < question['answers'].length; i++) {
            str += '<li>' + question['answers'][i] + '</li>';
        }

        $quiz.find('.answers ul').html(str);

        this.updateScore();
        this.updateQuestionsRemaining();

        this.startTimer();
    }

    this.validate = function(e) {
        var self        = this,
            question    = this.getCurrentQuestion(),
            correct     = false;

        this.stopTimer();

        if( $quiz.find('li').index($(e.currentTarget)) == (question['correct'] - 1) )
            correct = true;

        if( correct ) {
            paused = true;
            this.showCorrect($(e.currentTarget));
            score++;
            this.updateScore();
        }
        else
            this.showError($(e.currentTarget));

        setTimeout(function() {
            paused = false;
            // self.stopTimer();
            self.nextQuestion($(e.currentTarget));
        }, 2000)
    }

    this.nextQuestion = function($elm) {
        level++;

        if( level <= questions.length )
            this.loadLevel();
        else
            this.finishGame();
    }

    this.showCorrect = function($elm) {
        $elm.css('border', '1px solid green');
    }

    this.showError = function($elm) {
        $elm.css('border', '1px solid red');
    }

    this.revealAnswers = function() {
        var self        = this,
            question    = this.getCurrentQuestion(),
            count       = 1;

        $quiz.find('.answers li').each(function() {
            if(count == question['correct'])
                self.showCorrect($(this));
            else
                self.showError($(this));

            count++;
        })
    }

    this.updateScore = function() {
        $score.html(score);
    }

    this.updateQuestionsRemaining = function() {
        $remaining.html(level + '/' + totalQuestions);
    }

    this.startTimer = function() {
        var self    = this,
            counter = 10;

        clearInterval(timerID);

        $timer.css({
            display:    'block',
            top:        ($quiz.find('.quiz-container').height() / 2) - ($timer.height() / 2),
            left:       ($quiz.find('.quiz-container').width() / 2) - ($timer.width() / 2)
        })
        .html(counter);

        timerID = setInterval(function() {
            if(counter > 1) {
                $timer.html(--counter);
            }
            else {
                $timer.html('<span style="color:red">'+ (--counter) + '</span>');

                paused = true;
                self.stopTimer();
                self.revealAnswers();

                setTimeout(function() {
                    paused = false;
                    self.nextQuestion();
                }, 2000);
            }
        }, 1000);
    }

    this.stopTimer = function() {
        clearInterval(timerID);
    }


    this.finishGame = function() {
        this.stopTimer();
        $timer.css('display', 'none');
        alert('You’re finished');
    }

    this.init();
}


var quiz_db = {
    'questions' : [
         {
            'image':    'http://placekitten.com/300/250',
            'title':    'Estimate the weight of the tumour',
            'answers':  ['0.5kg', '1kg', '2kg', '3kg'],
            'correct':  1
         },
         {
            'image':    'http://placekitten.com/600/500',
            'title':    'How long did it take to remove?',
            'answers':  ['5 minutes', '30 minutes', '2 hours', '4 hours'],
            'correct':  4
         },
    ]
}
