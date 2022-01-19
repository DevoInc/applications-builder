import BaseField from "./BaseField";

/**
 * @category Fields
 * @class CheckBoxField
 * @extends BaseField
 * Simple widget to set a checkbox element.
 */
class CheckBoxField extends BaseField {
  addListeners() {
    this.el.addEventListener("change", () => {
      this.setValue(this.el.checked);
      if (this.onChange) this.onChange(this.value);
    });
  }

  setDOM() {
    this.el.checked = this.value;
  }
}

export default CheckBoxField;
