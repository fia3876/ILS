/**
 * Created by isaac on 21/11/15.
 */

function QuestionMultiAnswer(index) {
    Question.call(this, index);
    this.object_options_array = [];
}

// Inherit Question.prototype
QuestionMultiAnswer.prototype = Object.create(Question.prototype);
// Redeclare constuctor to self.
QuestionMultiAnswer.prototype.constructor = QuestionMultiAnswer;

QuestionMultiAnswer.prototype.setQuestionOptions = function (questions) {
    for (var question in questions) {
        if (questions.hasOwnProperty(question)) {
            var __index = question;
            question = questions[question];
            var reactivo;
            switch (question.question_type) {
                case 'multichoice':
                    reactivo = new QuestionMultichoice(__index);
                    reactivo.setQuestionText(question.question_text);
                    reactivo.setQuestionOptions(question.answers);
                    this.addOption(reactivo);
                    break;
                case 'match':
                    // TODO: Implement QuestionMatch
                    //reactivo = new QuestionMatch(__index);
                    //reactivo.setQuestionText(question.question_text);
                    //reactivo.setQuestionOptions(question.subQuestions);
                    //this.addOption(reactivo);
                    break;
                case 'multianswer':
                    reactivo = new QuestionMultiAnswer(__index);
                    reactivo.setQuestionText(question.question_text);
                    reactivo.setQuestionOptions(question.subQuestions);
                    this.addOption(reactivo);
                    break;
                case 'shortanswer':
                    reactivo = new QuestionShortAnswer(__index);
                    reactivo.setQuestionText(question.question_text);
                    reactivo.setQuestionOptions(question.answer);
                    this.addOption(reactivo);
                    break;
            }

        }
    }
};

QuestionMultiAnswer.prototype.optionTemplate = function (element, option_index) {
    var option_container = document.createElement('span');

    option_container.className = 'r' + option_index;
    element.setId(this.getId() + '-' + option_index);
    option_container.appendChild(element.getObject(true));

    return option_container;
};


QuestionMultiAnswer.prototype.evaluate = function () {
    //this.disable();
    //this.showCorrect();
    //var element = this.object_main_container.querySelector('input:checked');
    //if (element === null) {
    //    this.highlight(0);
    //    this.result = 0;
    //} else {
    //    this.result = (element.value == "true") ? 1 : 0;
    //    this.highlight(this.result);
    //}
    //
    //this.object_result_container.classList.add('outcome');
    //this.object_result_container.innerHTML = this.getResult() + ' pts.';

    var options = this.question_options;
    for (var option in options) {
        if (options.hasOwnProperty(option)) {
            option = options[option];
            option.evaluate();
        }
    }
};

QuestionMultiAnswer.prototype.disable = function () {
    var radios = this.object_main_container.querySelectorAll('input');
    for (var i = 0; i < radios.length; i++) {
        radios[i].disabled = true;
    }
};
QuestionMultiAnswer.prototype.showCorrect = function () {
    var subQuestions = this.question_options;
    for (var question in subQuestions) {
        if (subQuestions.hasOwnProperty(question)) {
            question = subQuestions[question];
            question.showCorrect();
        }
    }
};

QuestionMultiAnswer.prototype.getObject = function (inline) {
    var options = this.question_options;
    this.object_options_container = [];
    var question = this.object_question_container;
    for (var option in options) {
        if (options.hasOwnProperty(option)) {
            var questionInstance = options[option];

            var regex = new RegExp('(\{\#' + (parseInt(option) + 1) + '\}+?)');
            question.innerHTML = question.innerHTML
                .replace(regex, '<span id="replace-me"></span>');

            var replace_item = question.querySelector('#replace-me');
            replace_item.parentNode.replaceChild(questionInstance.getObject(true), replace_item);
        }
    }

    return this.object_main_container;
};



