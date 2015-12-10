/**
 * Created by isaac on 21/11/15.
 */

function QuestionShortAnswer(index) {
    Question.call(this, index);
}

// Inherit Question.prototype
QuestionShortAnswer.prototype = Object.create(Question.prototype);
// Redeclare constuctor to self.
QuestionShortAnswer.prototype.constructor = QuestionShortAnswer;

QuestionShortAnswer.prototype.setQuestionOptions = function (respuesta) {
    this.addOption(new Opcion(respuesta, true));
};

QuestionShortAnswer.prototype.optionTemplate = function (element, option_index, inline) {
    inline = inline || false;
    var type = (inline) ? 'span' : 'div';

    var option_container = document.createElement(type);
    option_container.className = 'r' + option_index;

    var input = this.inputTemplate(element, option_index);
    option_container.appendChild(input);

    var label = document.createElement('label');
    label.setAttribute('for', 'q-' + this.getId() + '-' + option_index);
    label.style.marginLeft = "10px";
    option_container.appendChild(label);

    this.object_options_container.appendChild(option_container);
    return this.object_options_container;
};

QuestionShortAnswer.prototype.inputTemplate = function (element, option_index) {
    var input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('data-value', element.texto);
    input.id = 'q-' + this.getId() + '-' + option_index;
    input.name = 'q-' + this.getId();

    return input;
};

QuestionShortAnswer.prototype.evaluate = function () {
    this.disable();
    this.showCorrect();
    var element = this.object_options_container.querySelector('input');
    if (element === null) {
        this.highlight(0);
        this.result = 0;
    } else {
        this.result = (element.value == this.question_options[0].valor) ? 1 : 0;
        this.highlight(this.result);
    }

    this.object_result_container.classList.add('outcome');
    this.object_result_container.innerHTML = this.getResult() + ' pts.';
};

QuestionShortAnswer.prototype.disable = function () {
    var inputs = this.object_main_container.querySelectorAll('input');
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].disabled = true;
    }
};
QuestionShortAnswer.prototype.showCorrect = function () {
    //var options = this.question_options;
    //for (var question in options) {
    //    if (options.hasOwnProperty(question)) {
    //        question = options[question];
    //        var label = this.object_options_container.querySelector('label');
    //        var input = this.object_options_container.querySelector('input');
    //        label.innerHTML = '(Correct answer: ' + input.getAttribute('data-value') + ')';
    //        label.style.textDecoration = "underline";
    //    }
    //}
};


