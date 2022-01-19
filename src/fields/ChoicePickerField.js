import BaseField from './BaseField';

/**
 * @category Fields
 * @class ChoicePickerField
 * Simple widget to select one option from a list of options.
 * @extends BaseField
 */
class ChoicePickerField extends BaseField {
  /**
   * @constructor
   * @param {Object} props - Properties object.
   * @param {string} props.id - Id of the container HTML element.
   * @param {object[]} props.choices - List of selectable choices in the form { id: '', text: '', value: '' }.
   * @param {string} props._default - choice selected by default.
   * @param {Function} props.apply - Callback called on state change.
   * @param {Function} props.dataNode - Associated data node.
   */
  constructor(props = {}) {
    super(
      Object.assign(
        {
          choices: [],
          class: 'lt-choice-picker-field',
        },
        props
      )
    );
    if (!this.el) return undefined;
    return this;
  }

  setDefault() {
    if (this.default !== null) {
      this._setValue(this.default);
    }
  }

  getValue() {
    if (this.value) {
      return this.value.value ? this.value.value : this.value.id;
    }
  }

  /**
   * Set the value of the field
   * The value could be a choice object or the id of any choice object
   * @param {String|Object} value The value to set
   * @memberof ChoicePickerField
   */
  setValue(value) {
    this.previous = this.value;
    this._setValue(value);
    this.setDOM();
  }

  _setValue(value) {
    if (typeof value === 'string') {
      let choice = this.choices.find((el) => el.id === value);
      if (choice) value = choice;
    }
    this.value = value;
  }

  /**
   * Updates the component view / DOM representation on state change
   * @override
   */
  setDOM() {
    for (let item of this.choices) {
      if (item.element) item.element.classList.remove('selected');
    }
    if (this.value && this.value.element) {
      this.value.element.classList.add('selected');
    }
  }

  /**
   * Add listeners for user interaction, executed on widget initialization
   * @override
   */
  addListeners() {
    for (let item of this.choices) {
      item.element.addEventListener('click', () => {
        this.setValue(item);
        if (this.onChange) this.onChange(this.value);
      });
    }
  }

  /**
   * Builds the DOM representation on initialization
   * @override
   */
  buildDOM() {
    this.el.classList.add(this.class);
    for (let i = 0; i < this.choices.length; i++) {
      let li = this.buildListItem(this.choices[i]);
      this.el.appendChild(li);
      this.choices[i].element = li;
      if (this.value && this.choices[i].id == this.value.id)
        this.choices[i].element.classList.add('selected');
    }
  }

  // Build one list item
  buildListItem(item) {
    let elem = document.createElement('label');
    elem.setAttribute('id', item.id);
    elem.setAttribute('for', item.id);
    elem.setAttribute('class', 'cb-enable-mult');

    let span = document.createElement('span');
    span.innerText = item.text;

    elem.appendChild(span);
    return elem;
  }
}

export default ChoicePickerField;
