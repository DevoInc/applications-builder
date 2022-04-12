import BaseField from './BaseField';
import ChoicePickerField from './ChoicePickerField';
import DateTimePickerRangeField from './DateTimePickerRangeField';
import { __ } from '@devoinc/applications-builder/i18n';
import dateRange from '@devoinc/applications-builder/utils/dateRange';

/**
 *
 * @category Fields
 * @class
 * Allows to select one date range from a list of presets or to select the range.
 * @extends BaseField
 */
class DateTimePickerRangeFieldPresets extends BaseField {
  /**
   * @param props.id            - id of the DOM container
   * @param props.choices       - selectable choices, a map of string : dateRange pairs
   * @param props.timepicker    - if true the user can select hours and minutes
   * @param props.apply         - callback that will be called whenever the state of the component is changed
   * @param props.dataNode      - data node
   */
  constructor(props = {}) {
    props = Object.assign(
      {
        choices: [
          {
            id: '1h',
            value: () => dateRange.fromNow(1, 'hour', 'minute'),
            text: '1h',
          },
          {
            id: '1d',
            value: () => dateRange.fromNow(1, 'day', 'minute'),
            text: '1d',
          },
          {
            id: '7d',
            value: () => dateRange.fromNow(7, 'day', true),
            text: '7d',
          },
          {
            id: '30d',
            value: () => dateRange.fromNow(30, 'day', true),
            text: '30d',
          },
        ],
        timepicker: true,
        default: '1h',
      },
      props
    );
    props.choices.push({
      id: '_custom_',
      text: __('Custom'),
      value: () => null,
    });
    super(props);
    if (!this.el) return undefined;
    return this;
  }

  setDefault() {
    if (this.default !== null) {
      this.setValue(this.default);
    }
  }

  /**
   * Set the value to the component
   * @param {Object|String} value Value of the component, dates object or string
   */
  setValue(value) {
    if (typeof value === 'string') {
      if (this.choicePickerField) {
        this.choicePickerField.setValue(value);
        let val = this.choicePickerField.getValue();
        if (val) {
          this.value = val();
          if (this.dateTimePickerRangeField) {
            this.dateTimePickerRangeField.setValue(this.value);
            this.dateTimePickerRangeField.highlight();
            if (this.onChange) this.onChange(this.value);
          }
        }
      }
    } else if (typeof value === 'object') {
      const processDate = (date) =>
        typeof date === 'string' ? new Date(date).getTime() : date;
      value.from = processDate(value.from);
      value.to = processDate(value.to);
      this.value = value;
      if (this.choicePickerField) {
        // Update the choice picker with an option similar to the
        // passed date range.
        this.choicePickerField.setValue(this.getChoiceFromDateRange(value));
        if (this.dateTimePickerRangeField) {
          this.dateTimePickerRangeField.setValue(value);
          this.dateTimePickerRangeField.highlight();
        }
        if (this.onChange) this.onChange(value);
      }
    }
    this.previous = this.value;
  }

  getDatesValue(value) {
    if (typeof value === 'string') {
      let choice = this.choices.find((el) => el.id === value);
      return choice.value();
    } else {
      return value;
    }
  }

  /**
   * Updates the component view / DOM representation on state change
   * @override
   */
  setDOM() {}

  /**
   * Builds the DOM representation (view) on initialization
   */
  buildDOM() {
    this.el.classList.add('lt-date-picker-presets');
    let cleanId = this.getCleanId();
    this.el.innerHTML = '';
    this.el.innerHTML = `<div id="${cleanId}_lt-choice-picker"></div>
<div id="${cleanId}_lt-date-range"></div>`;

    // Custom date range selector
    this.dateTimePickerRangeField = new DateTimePickerRangeField({
      id: `#${cleanId}_lt-date-range`,
      timepicker: this.timepicker,
      default: this.default != null ? this.getDatesValue(this.default) : null,
      onChange: (value) => this.setValue(value),
    });

    // Presets date ranges selector
    this.choicePickerField = new ChoicePickerField({
      id: `#${cleanId}_lt-choice-picker`,
      choices: this.choices,
      default: this.default != null ? this.default : null,
      onChange: (value) => this.setValue(value.id),
    });
  }

  /**
   * Finds a choice in the choice picker that is nearly similar
   * to the passed dateRange
   * @param {Object} dateRange
   * @returns {string|null} choice id or null
   */
  getChoiceFromDateRange(dateRange) {
    let diff = dateRange.to - dateRange.from;

    for (let choice of this.choices.slice(0, this.choices.length - 1)) {
      let choice_range = choice.value();
      let diff_choice = choice_range.to - choice_range.from;

      if (Math.abs(diff_choice - diff) < 120000) {
        return choice.id;
      }
    }

    return '_custom_';
  }

  /**
   * Updates the from and to dates to the current moment
   */
  refresh() {
    this.dateTimePickerRangeField.refresh();
  }
}

export default DateTimePickerRangeFieldPresets;
