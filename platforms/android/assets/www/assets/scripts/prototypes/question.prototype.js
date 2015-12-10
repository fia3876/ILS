/**
 * Created by isaac on 21/11/15.
 */

function Question(index) {
    this.result = 0;
    this.question_options = [];
    this.id = undefined;

    index = index || null;
    if (index !== null) {
        this.setId(index);
    }

    this.object_main_container = this.create_container();

}

Question.prototype = {
    question_text: null,
    question_options: null,
    question_type: null,
    result: 0,
    object_id: null,
    object_main_container: null,
    object_question_container: null,
    object_options_container: null,
    object_result_container: null,
    create_container: function () {
        var main_container = document.createElement('div');
        main_container.className = 'que';

        var content = document.createElement('div');
        content.className = 'content';
        main_container.appendChild(content);

        var formulation = document.createElement('div');
        formulation.className = 'formulation';
        content.appendChild(formulation);

        var qtext = document.createElement('div');
        qtext.className = 'qtext';
        this.object_question_container = qtext;
        formulation.appendChild(this.object_question_container);

        var ablock = document.createElement('div');
        ablock.className = 'ablock';
        this.object_options_container = ablock;
        formulation.appendChild(this.object_options_container);

        var resultBlock = document.createElement('div');
        resultBlock.className = 'result';
        formulation.appendChild(resultBlock);
        this.object_result_container = resultBlock;

        this.object_main_container = main_container;
        return this.object_main_container;
    },
    create_container_inline: function () {
        var main_container = document.createElement('span');
        main_container.className = 'que inline';

        var content = document.createElement('span');
        content.className = 'content';
        main_container.appendChild(content);

        var formulation = document.createElement('span');
        formulation.className = 'formulation';
        content.appendChild(formulation);

        var qtext = document.createElement('span');
        qtext.className = 'qtext';
        formulation.appendChild(qtext);
        this.object_question_container = qtext;

        var ablock = document.createElement('span');
        ablock.className = 'ablock';
        formulation.appendChild(ablock);
        this.object_options_container = ablock;

        var resultBlock = document.createElement('span');
        resultBlock.className = 'result';
        formulation.appendChild(resultBlock);
        this.object_result_container = resultBlock;

        this.object_main_container = main_container;
        return this.object_main_container;
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
    addOption: function (option) {
        this.question_options.push(option);
    },
    setId: function (id) {
        this.id = id;
    },
    getId: function () {
        return this.id;
    },
    getObject: function (inline) {
        inline = inline || false;
        if (inline) {
            this.object_main_container = this.create_container_inline();
        }
        var options = this.question_options;
        this.object_options_container.innerHTML = '';
        for (var option in options) {
            if (options.hasOwnProperty(option)) {
                /** @namespace options */
                option = Object.keys(options).indexOf(option);
                var option_object = options[option];
                this.optionTemplate(option_object, option, inline);
            }
        }
        return this.object_main_container;
    },
    setType: function (type) {
        this.question_type = type;
    },
    setQuestionText: function (text) {
        this.question_text = text;
        this.object_question_container.innerHTML = this.question_text;
    },
    getResult: function () {
        return this.result;
    },
    setQuestionOptions: function (options) {
        // TODO: Process options for question.
    },
    evaluate: function () {
        // TODO: Implement evaluation method on instances.
    },
    disable: function () {
        // TODO: Implement disable element functions on instances.
    },
    showCorrect: function () {
        // TODO: Implement showing correct item function.
    },
    hydrate: function (array) {
        // TODO: Implement hydratation method for class.
    }
};
