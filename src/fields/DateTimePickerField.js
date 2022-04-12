import BaseField from './BaseField';
import { i18n } from '@devoinc/applications-builder/i18n';
import user from '@devoinc/applications-builder/libs/user';
import locales from '@devoinc/applications-builder/fields/DateTimePickerFieldLocales.json';

/**
 *
 * @param {Object} props - Properties object
 * @param {DataNode} [dataNode=null] - DataNode to write
 *
 * @category Fields
 * @class
 * Simple widget to select a datetime from a picker options.
 * @extends BaseField
 */
class DateTimePickerField extends BaseField {
  constructor(props) {
    props = Object.assign(
      {
        timepicker: false,
        showTime: false,
        default: Date.now(),
        lang: getLang(),
        sibilings: [null, null], // Sibilings DateTimePickers [previous, next]
        locale: JSON.parse(JSON.stringify(locales['en'])),
        firstOpen: false,
      },
      props
    );
    super(props);
    if (!this.el) return undefined;
    return this;
  }

  /**
   * Get formated value for date time picker.
   * @return {string} Formated date.
   */
  getDTPFormat(full = true) {
    let format = 'YYYY/MM/DD';
    if (full) format += ' HH:mm';
    return getMomentWithTZ(this.value).format(format);
  }

  /**
   * Get formated value for input text.
   * @return {string} Formated date.
   */
  getInputFormat() {
    return getMomentWithTZ(this.value).format(this.locale.format);
  }

  /**
   * Set default value.
   */
  setDefault() {
    if (this.default != null) {
      this.value = this.default;
    }
  }

  /**
   * Event on close,
   * @param {moment} date - Date in moment object.
   */
  onClose(date) {
    this.setValue(moment(date).tz(user.getTimezone()).valueOf());
    if (this.onChange) this.onChange(this.value);
  }

  // Override addListener.
  addListeners() {}

  /**
   * Set the date to the input box.
   */
  setDOM() {
    this.container.innerHTML = this.getInputFormat();
  }

  /**
   * Build the DateTimePicker elements.
   */
  buildDOM() {
    // Get the locales
    this.locale = getLocales(this.lang, this.timepicker || this.showTime);

    let cleanId = this.getCleanId();
    this.el.classList.add('selectWrapper');
    this.el.innerHTML = `<input type="hidden" value="" />
      <div class="dropArrowDown">
        <span class="LtAppIcon-arrow_down"></span>
      </div>
      <span class="${cleanId}_container"></span>`;

    this.input = this.el.querySelector('input');
    this.container = this.el.querySelector(`.${cleanId}_container`);

    // Initialize the component
    let self = this;
    this.component = $(this.el).datetimepicker({
      lang: this.lang,
      lazyInit: false,
      ownerDocument: this.vapp,
      contentWindow: this.vapp,
      dayOfWeekStart: this.locale.weekStart,
      onClose: (date) => {
        let tz = user.getTimezone();
        let fmtDate = moment(date).format('YYYY/MM/DD HH:mm');
        let newDate = moment.tz(fmtDate, 'YYYY/MM/DD HH:mm', tz).toDate();
        this.onClose(newDate);
      },
      timepicker: this.timepicker,
      closeOnDateSelect: false,
      closeOnTimeSelect: false,
      value: this.getDTPFormat(),
      onShow: this.onShow
        ? this.onShow
        : function () {
            this.setOptions({
              value: self.getDTPFormat(),
              minDate: self.sibilings[0]
                ? self.sibilings[0].getDTPFormat(false)
                : false,
              maxDate: self.sibilings[1]
                ? self.sibilings[1].getDTPFormat(false)
                : getMomentWithTZ().format('YYYY/MM/DD'),
            });
          },
    });
  }

  // Highlight whenever the value is set programatically
  setValue(value) {
    super.setValue(value);
    this.highlight();
  }

  /**
   * Highlight the input.
   */
  highlight() {
    $(this.el).removeClass('highlight');
    setTimeout(() => {
      $(this.el).addClass('highlight');
    }, 0);
  }
}

export default DateTimePickerField;

// Helpers
// -----------------------------------------------------------------------------

function getLang() {
  return i18n && i18n.getRegionCode() ? i18n.getRegionCode() : 'en';
}

function getLocales(lang, full = true) {
  let l = JSON.parse(JSON.stringify(locales[lang]));
  if (!full) l.format = l.formatDate;
  return l;
}

function getMomentWithTZ(ts = null) {
  return moment(ts).tz(user.getTimezone());
}
