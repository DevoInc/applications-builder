import BaseField from "./BaseField";

/**
 * @category Fields
 * @class
 * Simple widget to set a input element.
 * @extends BaseField
 */
class InputField extends BaseField {
  constructor(props) {
    props = Object.assign(
      {
        default: "",
        onFocus: null,
      },
      props
    );
    super(props);
  }

  addListeners() {
    super.addListeners();
    this.el.addEventListener("focus", () => {
      if (this.onFocus) this.onFocus();
    });
  }
}

export default InputField;
