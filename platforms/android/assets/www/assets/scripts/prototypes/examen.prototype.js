/**
 * Created by isaac on 10/11/15.
 */

function Examen(name) {
    this.name = name;
    this.reactivos = [];
    this.calificacion = 0;
    this.render_container = null;
    this.submit_btn = null;
}
Examen.prototype = {
    calificacion: 0,
    name: null,
    reactivos: [],
    addReactivo: function (Reactivo) {
        this.reactivos.push(Reactivo);
    },
    getReactivos: function () {
        return this.reactivos;
    },
    evaluate: function () {
        var calificacion = 0;
        for (var i in this.reactivos) {
            if (this.reactivos.hasOwnProperty(i)) {
                var index = Object.keys(this.reactivos).indexOf(i);
                this.reactivos[index].evaluate();
                calificacion += this.reactivos[index].getResult();
            }
        }
        this.calificacion = calificacion / this.reactivos.length;
        this.saveResult();

        var resultados = document.createElement('h2');
        resultados.innerHTML = 'Results';
        resultados.style.textAlign = 'center';
        this.render_container.appendChild(resultados);

        this.canvas_container = document.createElement('canvas');
        this.canvas_container.id = 'canvasContainer';
        this.canvas_container.style.height = "250px";
        this.canvas_container.style.width = "450px";
        this.canvas_container.style.marginLeft = 'auto';
        this.canvas_container.style.marginRight = 'auto';
        this.canvas_container.style.display = 'block';
        this.render_container.appendChild(this.canvas_container);

        var data = [
            {
                value: this.reactivos.length - calificacion,
                color:"#F7464A",
                highlight: "#FF5A5E",
                label: "Incorrect",
                labelColor : 'white',
                labelFontSize : '16'
            },
            {
                value: calificacion,
                color: "#14b734",
                highlight: "#5AD3D1",
                label: "Correct",
                labelColor : 'white',
                labelFontSize : '16'
            }
        ];

        var options = {
            legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
        };
        var ctx = document.getElementById("canvasContainer").getContext("2d");
        var myPieChart = new Chart(ctx).Pie(data, options);

        $('html, body').animate({
            scrollTop: $(resultados).offset().top
        }, 1500);

    },
    getCalificacion: function () {
        return this.calificacion * 10;
    },
    getName: function () {
        return this.name;
    },
    setName: function (name) {
        this.name = name;
    },
    setRenderContainer: function (selector) {
        this.render_container = document.querySelector(selector);
    },
    renderExamen: function () {
        this.render_container.innerHTML = '';
        this.shuffleReactivos();
        for (var i in this.reactivos) {
            var index = Object.keys(this.reactivos).indexOf(i);
            this.reactivos[index].setId(index);
            var template = this.reactivos[index].getObject();
            this.render_container.appendChild(template);
        }
        this.submit_btn = document.createElement('button');
        this.submit_btn.className = 'btn';
        this.submit_btn.id = 'submit';
        this.submit_btn.innerHTML = "Finalizar";
        this.submit_btn.addEventListener('click', function () {
            this.evaluate();
            this.submit_btn.remove();
        }.bind(this));
        this.render_container.appendChild(this.submit_btn);
    },
    shuffle: function (array) {
        var i = array.length,
            j = 0,
            temp = null;

        while (i > 0) {
            j = Math.floor(Math.random() * i--);
            temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    },
    shuffleReactivos: function () {
        this.shuffle(this.reactivos);
    },
    saveResult: function () {
        var usuario = Cookies.get('session');
        if (usuario) {
            var users = $.jStorage.get("users");
            if (users && users[usuario]) {
                var _usuario = users[usuario];
                if (!_usuario.examenes) {
                    _usuario.examenes = {};
                }
                if (!_usuario.examenes[this.getName()]) {
                    _usuario.examenes[this.getName()] = {};
                }
                _usuario.examenes[this.getName()][Date.now()] = this.getCalificacion();
                console.log(_usuario.examenes[this.getName()]);
                $.jStorage.set('users', users);
            }
        }
    },
    loadJson: function (json_string) {
        var data = JSON.parse(json_string);
        /** @namespace data.examen */
        this.setName(data.examen.name);
        for (var question in data.questions) {
            /** @namespace data.questions */
            if (data.questions.hasOwnProperty(question)) {
                question = Object.keys(data.questions).indexOf(question);
                question = data.questions[question];
                /** @namespace question.question_type */
                switch (question.question_type) {
                    case 'multichoice':
                        this.reactivoMultichoice(question);
                        break;
                    case 'match':
                        //debugger;
                        break;
                    case 'multianswer':
                        //this.reactivoMultiAnswer(question);
                        break;
                    case 'shortanwer':
                        //debugger;
                        break;
                }
            }
        }
    },
    /**
     * Añade un reactivo de tipo Multichoice.
     * @param question
     */
    reactivoMultichoice: function (question) {
        var reactivo = new QuestionMultichoice();
        reactivo.setQuestionText(question.question_text);
        reactivo.setQuestionOptions(question.answers);
        this.addReactivo(reactivo);

    },
    reactivoMultiAnswer: function (question) {
        var reactivo = new QuestionMultiAnswer();
        reactivo.setQuestionText(question.question_text);
        reactivo.setQuestionOptions(question.subQuestions);
        this.addReactivo(reactivo);
    },
    reactivoShortAnswer: function (question) {
        var reactivo = new QuestionShortAnswer();
        reactivo.setQuestionText(question.question_text);
        reactivo.setQuestionOptions(question.answer);
        this.addReactivo(reactivo);
    }
};