

Pathways.Quiz = function() {
    var $elm    = $('.quiz'),
        _elm    = _('.quiz'),
        level   = 0,
        answers = [0,1,4,0,3];

    this.init = function() {
        var self = this;

        // set up the click events
        $elm.on('click', 'li', function(e) {
            self.validate(e);
        });
    }

    this.validate = function(e) {
        var correct = false;

        if( $elm.find('li').index($(e.currentTarget)) == answers[level] )
            correct = true;

        if( correct )
            this.nextQuestion($(e.currentTarget));
        else
            this.showError($(e.currentTarget));
    }

    this.nextQuestion = function(elm) {
        elm.css('border', '1px solid green');
    }

    this.showError = function(elm) {
        elm.css('border', '1px solid red');
    }

    this.update = function() {
        // 
    }

    init();
}
