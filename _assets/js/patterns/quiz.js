
Pathways.Quiz = function() {

    $('body').on('click', '[data-component="quiz"]', function(e) {
        // setup overlay
        var $overlay    = $('<div class="overlay"></div>'),
            $close      = $('<div class="close"></div>');

        $overlay.css('height', window.innerHeight );

        // append overlay
        $('body').append( $overlay );

        $overlay.show();
        $overlay.css('background-color', 'rgba(0,0,0,0.8)');

        // append and initialize quiz
        setTimeout(function() {
            var $code           = $( _('#template-quiz').innerHTML ),
                $content        = $('<div class="content"></div>'),
                $quizContainer  = $('<div class="quiz"></div>');

            $content.append( $code );
            $quizContainer.append( $content );
            $overlay.append( $quizContainer );

            positionCenter($quizContainer);

            var quiz = new Quiz($quizContainer);

            $overlay.append( $close );
        }, 800);

        $close.on('click', function() {
            $overlay.css('opacity', 0);
            setTimeout(function() {
                $overlay.remove();
            }, 800);
        });

        $(window).on('resize', function() {
            $overlay.css('height', window.innerHeight);
        });

    });
}

function Quiz(element) {
    var $quiz           = $(element),
        started         = false,
        paused          = false,
        level           = 1,
        questions       = quiz_db['questions'],
        answers         = quiz_db['questions'][level]['answers'],
        totalQuestions  = questions.length,
        score           = 0,

        timerWait       = 5, // in seconds
        timerLength     = 5, // in seconds

        $remaining  = $quiz.find('.remaining'),
        $score      = $quiz.find('.score span'),

        $timer      = $('<div/>').addClass('timer').css('display', 'none'),
        timerID;


    this.init = function() {
        var self = this;

        console.log('init');

        $quiz.on('click', '.quiz-start .button', function() {
            self.start();
        });
    }

    this.start = function() {
        console.log('starting');

        var self = this;

        $quiz.find('.quiz-start').hide();
        $quiz.find('.status-bar').show();
        $quiz.find('.quiz-playground').show();

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
        var self        = this,
            question    = this.getCurrentQuestion(),
            $image      = $('<img/>').attr('src', question['image']),
            str         = '<ul>';

        $quiz.find('.image').html($image);

        // question
        $quiz.find('.question').html(question['title']);

        // answers
        for (var i = 0; i < question['answers'].length; i++) {
            str += '<li>' + question['answers'][i] + '</li>';
        }

        str += '</ul>';

        $quiz.find('.answers').html(str);

        this.updateScore();
        this.updateQuestionsRemaining();

        // Wait for timerWait seconds then start a timerLength countdown
        setTimeout(function() {
            self.startTimer();
        }, (timerWait * 1000));
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
            self.stopTimer();
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
        $elm.addClass('correct');
    }

    this.showError = function($elm) {
        $elm.addClass('wrong');
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
        $remaining.html('<em>'+level+'</em> of <span>'+totalQuestions+'</span>');
    }

    this.startTimer = function() {
        var self    = this,
            counter = timerLength;

        clearInterval(timerID);

        var elm = $quiz.find('.quiz-playground .image');

        var diff = $quiz.find('.quiz-playground .image').offset().top - $quiz.find('.quiz-playground').offset().top;

        $timer.css({
            top:        (diff + elm.outerHeight() / 2) - ($timer.height() / 2),
            left:       (elm.outerWidth() / 2) - ($timer.width() / 2)
        })
        .html(counter);

        $timer.fadeIn(100);

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
                    $timer.fadeOut(100);
                    self.nextQuestion();
                }, 2000);
            }
        }, 1000);
    }

    this.stopTimer = function() {
        clearInterval(timerID);
        $timer.fadeOut(100);
    }


    this.finishGame = function() {
        var self            = this,
            $quiz_finish    = $quiz.find('.quiz-finish');

        this.stopTimer();
        $timer.css('display', 'none');

        $quiz_finish.find('.quiz-finish--score').html('<span>'+score+'</span> out of ' + totalQuestions);
        
        $quiz.find('.quiz-playground').hide();
        $quiz_finish.show();

        $quiz_finish.on('click', '.play-again', function() {
            self.restart();
        });
    }

    this.restart = function() {
        score = 0;
        level = 1;

        this.start();
    }

    this.init();
}


var quiz_db = {
    'title': 'The Esdaile Game',
    'questions' : [
         {
            'image':    'http://placekitten.com/500/295',
            'title':    'Estimate the weight of the tumour',
            'answers':  ['0.5kg', '1kg', '2kg', '5kg'],
            'correct':  1
         },
         {
            'image':    'http://placekitten.com/600/300',
            'title':    'How long did it take to remove?',
            'answers':  ['5 minutes', '30 minutes', '2 hours', '4 hours'],
            'correct':  4
         },
    ]
}
