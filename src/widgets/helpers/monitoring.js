/**
 * @category Utils
 * @subcategory Helpers
 * @class Helper Monitoring
 *
 * This plugin only can represent three states. Those states can be configurated
 * by parameters that adjust the color, the icon and the values.
 * All params are required
 *
 * Params:
 * - element: HTML element where the graph will be included
 * - orig: object with two required vars: keys and dataMatrix. keys is an array
 *          of objects with the names of values of dataMatrix inthe same order.
 *          dataMatrix is an array of elements with the values to count and show.
 * - options: is an object with the params to configure the graph.
 *
 *
 * Settings object:
 * - colors: Array with three elements. The first element represent success val,
 *          the second element represent a middle value and the third element
 *          represente the fail case. Each one of colors has to be in hexadecimal
 *          representation. Default values: 'green', 'orange', 'red'
 * - icons: Array with three elements. The first element represent success val,
 *          the second element represent a middle value and the third element
 *          represente the fail case. Each one of icons has to be a css class
 *          representation of the image. Default values: 'icon-ok-sign',
 *          'icon-minus-sign', 'icon-remove-sign'
 * - heightdefault: Integer that represents the height of the indicators.
 *          Default value: 200
 * - itemsbyrow: Number of items to show by row. Default value: 4
 * - rules: is an array with two objects. The first object define the roule for
 *           success state and the second object define the roule for the fail
 *           state. Each object must contain a operator and value.
 *           The operator can be any logical operator (>,<, ==, <=, =>, !=).
 *           The value must be the value to compare.
 *           Default: [{operator: '>=', value: 66.66},{operator: '<', value: 33.33}]
 *
 * - keyToShow (REQUIRED): column name to count
 * - valToShow (REQUIRED): val to show
 * - is_percent: Indicate if the comparation of rules must be with percent.
 *            Default true
 */

class Monitoring {
  constructor(element, orig, options = {}) {

    if (!element || !orig || !options) {
      throw new Error('Must pass a element and min options');
    }

    if (options.rules && options.rules.length != 2) {
      throw new Error('rules option must be an array with two objects');
    }

    this.element = element;
    this.settings = Object.assign({
      colors: ['green', 'orange', 'red'],
      icons: ['icon-ok-sign', 'icon-minus-sign', 'icon-remove-sign'],
      rules: [
        {operator: '>=', value: 66.66},
        {operator: '<', value: 33.33}],
      heightdefault: 200,
      itemsbyrow: 4,
      keyToShow: null,
      valToShow: null,
      is_percent: true,
    }, options);

    this.settings.keyToShow = this.getKeyFromName(orig.keys, this.settings.keyToShow);
    this.settings.valToShow = this.getKeyFromName(orig.keys, this.settings.valToShow);

    if (!this.settings.keyToShow | !this.settings.valToShow) {
      throw new Error('keyto show and valToShow must be passed into oprions object');
    }

    let data = this.getDataFormated(orig.dataMatrix);

    let html = this.getHTML(data);

    this.element.innerHTML = html;

    return this;
  };

  /**
   * return the element key value with the name atributte equal to value
   * @param {Array} arr
   * @param {string} value
   * @returns {integer|null} item key match
   */
  getKeyFromName(arr, value){
    for (let k in arr) {
      if (arr[k].name == value) return k;
    }
    return null;
  };

  /**
   * returns an array by summing the values (valToShow) and the total elements grouped by keyToShow
   * @param {Array} data received from malote
   * @returns {Array}
   */
  getDataFormated(data){
    let arr = [];
    for (let o in data) {
      let item  = data[o];
      if (typeof arr[item[this.settings.keyToShow]] === 'undefined') {
        arr[item[this.settings.keyToShow]] = { sum : 0, total: 0, min: Number.MAX_SAFE_INTEGER, max: 0};
      }

      if (item[this.settings.valToShow] <= arr[item[this.settings.keyToShow]]['min']) {
        arr[item[this.settings.keyToShow]]['min'] = parseInt(item[this.settings.valToShow]);
      }

      if (item[this.settings.valToShow] > arr[item[this.settings.keyToShow]]['max']) {
        arr[item[this.settings.keyToShow]]['max'] = parseInt(item[this.settings.valToShow]);
      }

      arr[item[this.settings.keyToShow]]['sum'] += parseInt(item[this.settings.valToShow]);
      arr[item[this.settings.keyToShow]]['total'] += 1;
    }
    return arr;
  };

  /**
   * return the html
   * @param {Array} data
   * @returns {string}
   */
  getHTML(data) {
    let elements = Object.keys(data).length;
    this.settings.itemsbyrow = (elements < this.settings.itemsbyrow) ? elements : this.settings.itemsbyrow;
    let _width = (this.settings.itemsbyrow == 1) ? 50 : 100 / this.settings.itemsbyrow;
    let _html = '<div class="lt-widget-status">';
    let div = 0;
    let color = '';
    let icon = '';
    let rule1 = `${this.settings.rules[0].operator} ${this.settings.rules[0].value}`;
    let rule2 = `${this.settings.rules[1].operator} ${this.settings.rules[1].value}`;

    for (let o in data) {
      div = data[o]['sum'] / data[o]['total']; // average
      div = (this.settings.is_percent) ? div * 100 / data[o]['max'] : div;

      color = (eval(`${div} ${rule1}`)) ? this.settings.colors[0] : (eval(`${div} ${rule2}`)) ? this.settings.colors[2] : this.settings.colors[1];
      icon = (eval(`${div} ${rule1}`)) ? this.settings.icons[0] : (eval(`${div} ${rule2}`)) ? this.settings.icons[2] : this.settings.icons[1];

      _html += `<div style="height: ${this.settings.heightdefault}px;display: inline-block;color: ${color};text-align: center;margin: 0 auto;width: ${_width}%;">`;
      _html += `<h1>${o}</h1>`;
      _html += `<div class="${icon}" style="width: 100%; line-height: ${this.settings.heightdefault}px; font-size: ${this.settings.heightdefault}px;"></div>`;
      _html += `</div>`;
    }
    _html += '</div>';

    return _html;
  }

}

export default Monitoring;
