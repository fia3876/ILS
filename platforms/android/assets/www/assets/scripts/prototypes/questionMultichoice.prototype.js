/**
 * Created by isaac on 21/11/15.
 */

function QuestionMultichoice(index) {
    Question.call(this, index);
}
// Inherit Question.prototype
QuestionMultichoice.prototype = Object.create(Question.prototype);
// Redeclare constuctor to self.
QuestionMultichoice.prototype.constructor = QuestionMultichoice;

QuestionMultichoice.prototype.setQuestionOptions = function (options) {
    for (var option in options) {
        if (options.hasOwnProperty(option)) {
            /** @namespace options */
            option = Object.keys(options).indexOf(option);
            option = options[option];
            this.addOption(new Opcion(option.texto, option.value));
        }
    }
};

QuestionMultichoice.prototype.optionTemplate = function (element, option_index, inline) {
    var option_container = document.createElement('div');
    option_container.className = 'r' + option_index;

    var input = this.inputTemplate(element, option_index);
    option_container.appendChild(input);

    var label = document.createElement('label');
    label.setAttribute('for', 'q-' + this.getId() + '-' + option_index);
    label.innerHTML = element.texto;
    if (element.valor) {
        label.className = 'correct';
    }
    option_container.appendChild(label);

    this.object_options_container.appendChild(option_container);
    return option_container;
};

QuestionMultichoice.prototype.inputTemplate = function (element, option_index) {
    var input = document.createElement('input');
    input.setAttribute('type', 'radio');
    input.value = element.valor;
    input.id = 'q-' + this.getId() + '-' + option_index;
    input.name = 'q-' + this.getId();

    return input;
};

QuestionMultichoice.prototype.evaluate = function () {
    this.disable();
    this.showCorrect();
    var element = this.object_options_container.querySelector('input:checked');
    if (element === null) {
        this.highlight(0);
        this.result = 0;
    } else {
        this.result = (element.value == "true") ? 1 : 0;
        this.highlight(this.result);
    }

    this.object_result_container.classList.add('outcome');
    this.object_result_container.innerHTML = this.getResult() + ' pts.';
};

QuestionMultichoice.prototype.disable = function () {
    var radios = this.object_main_container.querySelectorAll('input');
    for (var i = 0; i < radios.length; i++) {
        radios[i].disabled = true;
    }
};
QuestionMultichoice.prototype.showCorrect = function () {
    var correct = this.object_main_container.querySelector('label.correct');
    correct.style.textDecoration = "underline";
};

QuestionMultichoice.prototype.getInlineObject = function(){
    var options = this.question_options;
    for (var option in options) {
        if (options.hasOwnProperty(option)) {
            /** @namespace options */
            option = Object.keys(options).indexOf(option);
            var option_object = options[option];
            this.optionTemplate(option_object, option);
        }
    }
    return this.object_main_container;
};


