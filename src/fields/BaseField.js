/**
 * @category Fields
 * @class
 *
 * The BaseField class provides a generic structure and some default functionality
 * for all components.
 *
 * Extend this class to create custom widgets by overriding the default
 * lifecycle methods.
 *
 * **Lifecycle methods:**
 *
 * - _setElement_: Aaves the HTML element indicated by the id parameter as
 *    the main element of the widget.
 * - _buildDOM_: Builds the initial HTML representation of the widget.
 * - _addListeners_: Adds any listeners to listen for user interaction and
 *    react to it, for example by changing the inner state of the component.
 * - _setDefault_: Updates the widget state and visual representation with
 *    the default value specified in the constructor.
 * - _setValue_: Updates the widget state programmatically with an arbitrary
 *    value.
 * - _setDOM_: Updates the visual representation of the component, usually
 *    executed after state changes to reflect them.
 *
 * **Saving and restoring state in the data tree:**
 *
 * The widget state can be saved or restored from the data tree by using
 * the _save()_ and _restore()_ methods.
 * Override them to provide custom saving and restoring functionality.
 * Call _save()_ and _restore()_ from outside the widget to save its state
 * on the data tree or restore it.
 *
 * **Changing the component state:**
 *
 * The component state can be changed by three methods:
 *
 *    - By setting the value programmatically calling _setValue()_.
 *    - By interacting with it.
 *    - By changing the associated datanode and calling _widget.restore()_.
 *
 * **Reacting to changes in the component state from outside of it:**
 *
 * Either subscribe to changes on the datanode or pass an apply
 * function to the constructor:
 *
 * ```
 * datanode.subscribe('lt-my-widget-data', data => { });
 *
 * let myWidget = new MyWidget({
 *   id: 'lt-my-widget',
 *   key: 'lt-my-widget-data',
 *   apply : function(value) {  }
 * }
 * ```
 */
class BaseField {
  /**
   * @constructor
   * @param {Object} props - Object of properties
   * @param {String} props.id - Id of the field
   * @param {*} [props.default=null] - Default value
   * @param {Boolean} [props.preview=true] - If the value can be previewed
   * @param {Function} [props.onSave=null] - Callback for the save action. With one param as the new value.
   * @param {Boolean} [props.canSave=true] - If the field can save ??? TODO: Better description
   */
  constructor(props) {
    Object.assign(
      this,
      {
        onChange: null, // On the change of the field this method is trigger with
        // the value
        onSave: null, // When the value has to be stored, it is manually
        // trigger by save() method
        previous: null, // Previous value
      },
      props
    );

    // Get application reference
    this.app = document.querySelector(".lt-vapp");

    // Set the DOM element
    this.setElement();
    if (!this.el) {
      console.error(`The field id '${this.id}' does not exists.`);
      return undefined;
    }

    // Initial value initialization
    this.value = null;
    this.setDefault();

    // Builds the DOM representation of the widget
    // Override it to specify custom HTML
    this.buildDOM();
    this.setDOM();

    // Add listeners for the field
    this.addListeners();

    return this;
  }

  // Initialization
  // ---------------------------------------------------------------------------

  /**
   * Set default value (Normally only in the constructor)
   */
  setDefault() {
    if (this.default !== null) {
      this.value = this.default;
    }
  }

  /**
   * Set the element to listen on changes
   * Overload in some cases
   */
  setElement() {
    this.el = this.app.querySelector(this.id);
  }

  /**
   * Listener for on change properties
   * By default is change event for a Input[type=text] field
   */
  addListeners() {
    this.el.addEventListener("change", () => {
      this.setValue(this.el.value);
      if (this.onChange) this.onChange(this.value);
    });
  }

  // Getters & Setters
  // ---------------------------------------------------------------------------

  /**
   * Programmatically set the value of the widget and update the DOM
   * to reflect the changes.
   * @param {*} value
   */
  setValue(value) {
    if (this.value != null) this.previous = this.value;
    this.value = value;
    this.setDOM();
  }

  /**
   * Get the current value of the field
   * @return {*} Value of the field
   */
  getValue() {
    return this.value;
  }

  /**
   * Get the clean id name (without # or .)
   * @returns {String} Clean id
   */
  getCleanId() {
    return this.id.replace("#", "").replace(".", "");
  }

  // DOM Operations
  // ---------------------------------------------------------------------------

  /**
   * Builds the DOM representation of the widget
   * By default is empty for a Input[type=text] field
   */
  buildDOM() {}

  /**
   * Set the value to the DOM element
   * By default apply like a Input[type=text]
   */
  setDOM() {
    this.el.value = this.value;
  }

  // Save operations
  // ---------------------------------------------------------------------------

  /**
   * Save action trigger onSave method
   */
  save() {
    this.previous = null;
    if (this.onSave) this.onSave(this.value);
  }

  /**
   * Restore the previous value & trigger onChange callback
   */
  restore() {
    if (this.previous != null) {
      this.setValue(this.previous);
      this.previous = null;
      if (this.onChange) this.onChange(this.value);
    }
  }
}

export default BaseField;
