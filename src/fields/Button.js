/**
 * @category Fields
 * @class
 * Simple widget for a button element.
 */

class Button {
  constructor(props) {
    Object.assign(
      this,
      {
        id: null,
        vapp: document.querySelector(".lt-vapp"),
        onClick: null,
      },
      props
    );
    this.el = this.vapp.querySelector(this.id);

    if (!this.el) {
      console.error(`The button id '${this.id}' does not exists.`);
      return null;
    }

    this.el.addEventListener("click", (evt) => {
      evt.stopPropagation();
      evt.preventDefault();
      this.click(evt);
    });

    return this;
  }

  /**
   * Trigger onClick callback.
   * @param {Event} evt - Event fired.
   * @memberof Button
   */
  click(evt = null) {
    if (this.onClick) this.onClick(evt);
  }
}

export default Button;
