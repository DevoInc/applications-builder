import BaseField from './BaseField';
import DateTimePickerField from './DateTimePickerField';
import { __ } from '@devoinc/applications-builder/i18n';
import dateRange from '../utils/dateRange';

/**
 *
 * @param id {string}                     Id of the HTML element of the widget
 * @param key {string}                    Key to use when saving to datanode
 * @param customPropsFrom {Object}        Custom properties for from DateTimeWidget
 * @param customPropsTo {Object}          Custom properties for to DateTimeWidget
 * @param timepicker {boolean}            If True the DatePickers will allow hour and minute selection
 * @param apply {Function}                function executed when the state changes
 * @param dataNode {DataNode}             DataNode where state will be saved on save()
 *
 * @category Fields
 * @class
 * Allows to select a date range from two date time pickers.
 * @extends BaseField
 */
class DateTimePickerRangeField extends BaseField {
  constructor(props = {}) {
    let now = Date.now();
    props = Object.assign(
      {
        id: null,
        template: `<div class="lt-date-time-picker-field">
  <label><strong>${__('FROM: ')}</strong></label>
  <div id="{{id}}_from"></div>
</div>
<div class="lt-date-time-picker-field">
  <label><strong>${__('TO: ')}</strong></label>
  <div id="{{id}}_to"></div>
</div>`,
        class: 'lt-date-time-picker-range-field',
        props: [{}, {}],
        timepicker: false,
        default: {
          from: now - 24 * 60 * 60 * 1000,
          to: now,
        },
        value: { from: 0, to: 0 },
        dtPickers: { from: null, to: null },
      },
      props
    );
    super(props);
    if (!this.el) return undefined;
    return this;
  }

  /**
   * Updates the component view / DOM representation on state change
   * @override
   */
  setDOM() {}

  setDefault() {
    if (this.default !== null) {
      this._setValue(this.default);
    }
  }

  /**
   * Sets the value state programmatically.
   * @param dates
   * @override
   */
  setValue(dates) {
    this._setValue(dates);
    this.setDOM(); // update component view
  }

  _setValue(dates) {
    if (!dates) return;

    // Capture wrong dates
    if (dates.from > dates.to || dates.to > Date.now()) {
      throw new Error(__('Wrong dates'));
    }

    // Update child component's values
    const sides = Object.keys(this.dtPickers);
    for (let side of sides) {
      if (this.dtPickers[side]) this.dtPickers[side].setValue(dates[side]);
    }

    this.value = dates;
  }

  /**
   * Builds the DOM representation (view) on initialization.
   * @override
   */
  buildDOM() {
    if (this.class) this.el.classList.add(this.class);
    const re = new RegExp('{{id}}', 'gi');
    this.el.innerHTML = this.template.replace(re, this.getCleanId());

    const sides = Object.keys(this.dtPickers);
    for (let i = 0; i < sides.length; i++) {
      let side = sides[i];
      this.dtPickers[side] = new DateTimePickerField(
        Object.assign(
          {
            id: `#${this.getCleanId()}_${side}`,
            default: this.default[side],
            timepicker: this.timepicker,
            onChange: (value) => {
              this.value[side] = value;
              if (this.onChange) this.onChange(this.value);
            },
          },
          this.props[i]
        )
      );
    }

    this.dtPickers.from.sibilings = [null, this.dtPickers.to];
    this.dtPickers.to.sibilings = [this.dtPickers.from, null];
  }

  highlight() {
    if (this.dtPickers) {
      const sides = Object.keys(this.dtPickers);
      for (let side of sides) {
        if (this.dtPickers[side]) this.dtPickers[side].highlight();
      }
    }
  }

  /**
   * Updates the end of the date range to the current time
   */
  refresh() {
    let current = this.value;
    let oldTo = current.to;
    current.to = moment().valueOf();
    current.from = current.from + (current.to - oldTo);
    this._setValue(current);
    this.onChange(this.value);
  }
}

export default DateTimePickerRangeField;
