
Pathways.components.quiz = function(element, data) {

    if(typeof data === 'undefined') return console.warn('Quiz component not provided data');

    $(element).on('click', function(e) {
        // setup overlay
        var $overlay    = $('<div class="overlay"></div>'),
            $close      = $('<div class="close"></div>');

        $overlay.css('height', window.innerHeight );

        // append overlay
        $('body').append( $overlay );

        $overlay.show();
        $overlay.css({
            'background-color': 'rgba(0,0,0,0.9)',
            'background-image': 'url('+data.images + '/' + 'bg.jpg)'
        });

        // prevent scrolling
        $('body').addClass('modal-open');

        // append and initialize quiz
        setTimeout(function() {
            var $code           = $( _('#template-quiz').innerHTML ),
                $content        = $('<div class="content"></div>'),
                $quizContainer  = $('<div class="quiz"></div>');

            $content.append( $code );
            $quizContainer.append( $content );
            $overlay.append( $quizContainer );

            Pathways.Utils.positionCenter($quizContainer);

            var quiz = new Quiz($quizContainer, data);

            $overlay.append( $close );
        }, 800);

        $close.on('click', function() {
            $overlay.css('opacity', 0);
            $('body').removeClass('modal-open');

            setTimeout(function() {
                $overlay.remove();
            }, 800);
        });

        $(window).on('resize', function() {
            $overlay.css('height', window.innerHeight);
        });

    });
};

function Quiz(element, data) {
    var $quiz           = $(element),
        paused          = false,
        level           = 1,
        imagesLocation  = data.images,
        questions       = data.questions,
        answers         = data.questions[level].answers,
        totalQuestions  = questions.length,
        score           = 0,

        timerWait       = 5, // in seconds
        timerLength     = 5, // in seconds

        $remaining  = $quiz.find('.remaining'),
        $score      = $quiz.find('.score span'),

        $timer      = $('<div/>').addClass('timer').css('display', 'none'),
        timerID,
        timeoutWaitID;


    this.init = function() {
        var self = this;

        // load the intro image
        var $quizHeader = $quiz.find('.quiz-header-image'),
            $image      = $('<img/>').attr('src', imagesLocation + '/intro.jpg');

        $quizHeader.html($image);

        // Add the timer
        $quiz.append($timer);

        $quiz.on('click', '.quiz-start .button', function() {
            self.start();
        });

        // set up the click events
        $quiz.on('click', 'li', function(e) {
            if( !paused )
                self.validate(e);
        });
    };

    this.start = function() {

        var self = this;

        $quiz.find('.quiz-start').hide();
        $quiz.find('.status-bar').show();
        $quiz.find('.quiz-playground').show();

        // Load the level
        this.loadLevel();
    };

    this.getCurrentQuestion = function() {
        return questions[(level-1)];
    };

    this.loadLevel = function(l) {
        // image
        var self        = this,
            question    = this.getCurrentQuestion(),
            $image      = $('<img/>').attr('src', imagesLocation + '/' + question.image),
            str         = '<ul>';

        $quiz.find('.image').html($image);

        // question
        $quiz.find('.question').html(question.title);

        // answers
        for (var i = 0; i < question.answers.length; i++) {
            str += '<li>' + question.answers[i] + '</li>';
        }

        str += '</ul>';

        $quiz.find('.answers').html(str);

        this.updateScore();
        this.updateQuestionsRemaining();

        // Wait for timerWait seconds then start a timerLength countdown
        timeoutWaitID = setTimeout(function() {
            self.startTimer();
        }, (timerWait * 1000));
    };

    this.validate = function(e) {
        var self        = this,
            question    = this.getCurrentQuestion(),
            correct     = false;

        this.stopTimer();

        if( $quiz.find('li').index($(e.currentTarget)) == (question.correct - 1) )
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
        }, 2000);
    };

    this.nextQuestion = function($elm) {
        level++;

        if( level <= questions.length )
            this.loadLevel();
        else
            this.finishGame();
    };

    this.showCorrect = function($elm) {
        $elm.addClass('correct');
    };

    this.showError = function($elm) {
        $elm.addClass('wrong');
    };

    this.revealAnswers = function() {
        var self        = this,
            question    = this.getCurrentQuestion(),
            count       = 1;

        $quiz.find('.answers li').each(function() {
            if(count == question.correct)
                self.showCorrect($(this));
            else
                self.showError($(this));

            count++;
        });
    };

    this.updateScore = function() {
        $score.html(score);
    };

    this.updateQuestionsRemaining = function() {
        $remaining.html('<em>'+level+'</em> of <span>'+totalQuestions+'</span>');
    };

    this.startTimer = function() {
        var self    = this,
            counter = timerLength;

        this.stopTimer();

        var elm     = $quiz.find('.quiz-playground .image'),
            diff    = $quiz.find('.quiz-playground .image').offset().top - $quiz.find('.quiz-playground').offset().top;

        $timer.css({
            top:        (diff + elm.outerHeight() / 2) - ($timer.height() / 2),
            left:       (elm.outerWidth() / 2) - ($timer.width() / 2)
        })
        .html(counter);

        $timer.fadeIn(100);

        // Every second, count down.
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
    };

    this.stopTimer = function() {
        clearInterval(timerID);
        clearTimeout(timeoutWaitID);

        $timer.fadeOut(100);
    };


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
    };

    this.restart = function() {
        this.stopTimer();

        score = 0;
        level = 1;

        $quiz.find('.quiz-finish').hide();

        this.start();
    };

    this.init();
}
