/**
 * Created by isaac on 8/11/15.
 */

function Usuario(username, password) {
  this.username = username;
  this.password = password;
}

Usuario.prototype = {
  get_examen: function (name) {
    var examen = this.examenes[name];
    if (!examen) {
      examen = new Examen();
      this.examenes[name] = examen;
    }
    return examen;
  },

  set_examen: function (name, examen) {
    this.examenes[name] = examen;
  }
};

