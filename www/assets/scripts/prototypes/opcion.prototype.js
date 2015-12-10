/**
 * Created by isaac on 10/11/15.
 */

/**
 *
 * @param texto string
 * @param valor bool
 * @constructor
 */
function Opcion(texto, valor){
  this.texto = texto;
  this.valor = valor;
}

Opcion.prototype = {
  /** @param texto string */
  texto: null,
  /** @param valor bool */
  valor: null
};