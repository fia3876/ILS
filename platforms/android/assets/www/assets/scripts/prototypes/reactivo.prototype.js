/**
 * Created by isaac on 10/11/15.
 */

function Reactivo() {
  this.options = [];
}

Reactivo.prototype = {
  question: null,
  options: [],
  result: null,
  index: null,
  selector_options: null,
  selector_main_container: null,
  object_main_container: null,
  setIndex: function (index) {
    this.index = index;
    this.selector_main_container = '#question-' + this.getIndex();
    this.selector_options = '#question-' + this.getIndex() + ' input[type=radio][name=q-' + this.getIndex() + ']';
  },
  highlight: function (value) {
    if (value === 0) {
      this.object_main_container.classList.add('incorrect');
    } else if (value > 0) {
      this.object_main_container.classList.add('correct');
    } else {
      this.object_main_container.classList.add('partiallycorrect');
    }
  },
  evaluate: function (index) {
    this.disableRadios();
    this.showCorrect();
    var query = this.selector_options + ':checked';
    var element = document.querySelector(query);
    if (element === null) {
      this.highlight(0);
      this.result = 0;
    } else {
      this.result = (element.value == "true") ? 1 : 0;
      this.highlight(this.result);
    }
    var resultBlock = this.object_main_container
      .querySelector('.result');
    resultBlock.classList.add('outcome');
    resultBlock.innerHTML = this.getResult() + ' pts.';
  },
  getResult: function () {
    return this.result;
  },
  disableRadios: function () {
    var radios = this.object_main_container.querySelectorAll('input');
    for (var i = 0; i < radios.length; i++) {
      radios[i].disabled = true;
    }
  },
  showCorrect: function () {
    var correct = this.object_main_container.querySelector('label.correct');
    correct.style.textDecoration = "underline";
  },
  setQuestion: function (question) {
    this.question = question;
  },
  addOption: function (option) {
    this.options.push(option);
  },
  getIndex: function () {
    return this.index;
  },
  questionTemplate: function () {
    var container = document.createElement('div');
    container.className = 'que multichoice';
    container.id = 'question-' + this.getIndex();

    var content = document.createElement('div');
    content.className = 'content';
    container.appendChild(content);

    var formulation = document.createElement('div');
    formulation.className = 'formulation';
    content.appendChild(formulation);

    var qtext = document.createElement('div');
    qtext.className = 'qtext';
    qtext.innerHTML = this.question;
    formulation.appendChild(qtext);

    var ablock = document.createElement('div');
    ablock.className = 'ablock';
    formulation.appendChild(ablock);

    var prompt = document.createElement('div');
    prompt.className = 'prompt';
    prompt.innerHTML = 'Seleccione una:';
    ablock.appendChild(prompt);

    var answer = document.createElement('div');
    answer.className = 'answer';
    ablock.appendChild(answer);

    var resultBlock = document.createElement('div');
    resultBlock.className = 'result';
    formulation.appendChild(resultBlock);

    for (var element in this.options) {
      var option_index = Object.keys(this.options).indexOf(element);
      this.optionTemplate(this.options[option_index], this.getIndex(), option_index, {answer: answer});
    }

    this.object_main_container = container;
    return container;
  },
  optionTemplate: function (element, question_index, option_index, args) {
    var option_container = document.createElement('div');
    option_container.className = 'r' + option_index;

    var input = this.inputTemplate(element, question_index, option_index);
    option_container.appendChild(input);

    var label = document.createElement('label');
    label.setAttribute('for', 'q-' + question_index + '-' + option_index);
    label.innerHTML = element.texto;
    if (element.valor) {
      label.className = 'correct';
    }
    option_container.appendChild(label);

    args.answer.appendChild(option_container);
  },
  inputTemplate: function (element, question_index, option_index) {
    var input = document.createElement('input');
    input.setAttribute('type', 'radio');
    input.value = element.valor;
    input.id = 'q-' + question_index + '-' + option_index;
    input.name = 'q-' + question_index;

    return input;
  }
};