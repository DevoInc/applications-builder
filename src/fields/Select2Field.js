import BaseField from '@devo/applications-builder/fields/BaseField';
import { __ } from '@devo/applications-builder/i18n';

/**
 * @category Fields
 * @class
 * Simple widget to set a select element based on select2 pluging.
 * @extends BaseField
 *
 */
class Select2Field extends BaseField {
  constructor(props) {
    super(props);
    this.dataArray = props.data;
    if (this.dataArray == null) {
      this.dataArray = [];
      $(this.el)
        .find('option')
        .each((i, el) => {
          this.dataArray.push({ id: $(el).val(), text: $(el).html() });
        });
    }
    let self = this;
    $(this.el)
      .select2({
        placeholder: __(props.placeholder),

        ajax: {
          transport: function (params, success) {
            let response = new Promise((resolve) => {
              let input = $('.select2-search__field').val();
              if (input.length >= 0) {
                let res = matchElement(input, self.dataArray);
                resolve(res);
              }
            });
            return response.then(success);
          },
          processResults: function (data) {
            return {
              results: data,
              pagination: {
                // Changed this to avoid infinite scroll
                more: false,
              },
            };
          },
        },
        cache: props.cache || true,
        minimumInputLength: props.minimumInputLength || 0,
        dropdownAutoWidth: true,
        width: 'style',
      })
      .select2('val', props.val);
    this.setEvents(props);
  }

  setEvents(props) {
    $(this.el).on('change.select2', function () {
      if (props.onChange) props.onChange(this.value);
    });
    $(this.el).on('select2:change', props.onSelectChange);
    $(this.el).on('select2:select', props.onSelect);
    $(this.el).on('select2:close', props.onClose);
    $(this.el).on('select2:opening', props.onOpening);
    $(this.el).on('select2:open', props.onOpen);
    $(this.el).on('select2:selecting', props.onSelecting);
    $(this.el).on('select2:select', props.onSelect);
    $(this.el).on('select2:unselecting', props.onUnselecting);
    $(this.el).on('select2:unselect', props.onUnselect);
  }
}

/**
 * Simple function to found one element in an array
 *
 * @param {string} input - Element to found.
 * @param {array} arr - Array of strings
 *
 *
 * @category Fields
 * @method matchElement
 * @alias matchElement
 */
function matchElement(input, arr) {
  var reg = new RegExp(input.split('').join('\\w*').replace(/\W/, ''), 'i');
  return arr.filter(function (elem) {
    if (elem && elem.text && elem.text.match(reg)) {
      return elem;
    }
  });
}
export default Select2Field;
