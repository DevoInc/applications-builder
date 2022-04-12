import Settings from '@devoinc/applications-builder/Settings';
import SelectField from '@devoinc/applications-builder/fields/SelectField';
import CheckBoxField from '@devoinc/applications-builder/fields/CheckBoxField';
import DateTimePickerRangeField from '@devoinc/applications-builder/fields/DateTimePickerRangeField';
import dataTree from '@devoinc/applications-builder/data/dataTree';
import { __ } from '@devoinc/applications-builder/i18n';

export default (conf) => {
  let settings = new Settings();

  // Theme
  // ---------------------------------------------------------------------------

  settings.addOption(
    new SelectField({
      id: '#theme',
      preview: true,
      default: conf.theme,
      onChange: (value) => {
        let vapp = document.querySelector('.lt-vapp');
        for (let item of vapp.classList) {
          if (item.startsWith('theme-')) vapp.classList.remove(item);
        }
        vapp.classList.add(value);
      },
      onSave: (value) => {
        dataTree.root.set('theme', value);
      },
    })
  );

  // Title Size
  // ---------------------------------------------------------------------------

  settings.addOption(
    new SelectField({
      id: '#titleSize',
      preview: true,
      default: conf.titleSize,
      onChange: (value) => {
        let vapp = document.querySelector('.lt-vapp');
        let options = ['small-headers', 'big-headers'];
        for (let item of vapp.classList) {
          if (options.includes(item)) vapp.classList.remove(item);
        }
        if (value !== '') vapp.classList.add(value);
      },
      onSave: (value) => {
        dataTree.root.set('titleSize', value);
      },
    })
  );

  // Display Compact
  // ---------------------------------------------------------------------------

  settings.addOption(
    new CheckBoxField({
      id: '#displayCompact',
      preview: true,
      default: conf.displayCompact,
      onChange: (value) => {
        let vapp = document.querySelector('.lt-vapp');
        if (value) vapp.classList.add('compact');
        else vapp.classList.remove('compact');
      },
      onSave: (value) => {
        dataTree.root.set('displayCompact', value);
      },
    })
  );

  // Display Bordered
  // ---------------------------------------------------------------------------

  settings.addOption(
    new CheckBoxField({
      id: '#displayBordered',
      preview: true,
      default: conf.displayBordered,
      onChange: (value) => {
        let vapp = document.querySelector('.lt-vapp');
        if (value) vapp.classList.add('bordered');
        else vapp.classList.remove('bordered');
      },
      onSave: (value) => {
        dataTree.root.set('displayBordered', value);
      },
    })
  );

  // Display Collapsibles
  // ---------------------------------------------------------------------------

  settings.addOption(
    new CheckBoxField({
      id: '#displayCollapsibles',
      preview: true,
      default: conf.displayCollapsibles,
      onChange: (value) => {
        let vapp = document.querySelector('.lt-vapp');
        if (value) vapp.classList.add('collapsible');
        else vapp.classList.remove('collapsible');
      },
      onSave: (value) => {
        dataTree.root.set('displayCollapsibles', value);
      },
    })
  );

  // Display Description
  // ---------------------------------------------------------------------------

  settings.addOption(
    new CheckBoxField({
      id: '#displayDescription',
      preview: true,
      default: conf.displayDescription,
      onChange: (value) => {
        let vapp = document.querySelector('.lt-vapp');
        if (value) vapp.classList.remove('hide-descriptions');
        else vapp.classList.add('hide-descriptions');
      },
      onSave: (value) => {
        dataTree.root.set('displayDescription', value);
      },
    })
  );

  // Display Menu Widget Expanded
  // ---------------------------------------------------------------------------

  settings.addOption(
    new CheckBoxField({
      id: '#displayMenuWidgetsExpanded',
      preview: true,
      default: conf.displayMenuWidgetsExpanded,
      onChange: (value) => {
        let vapp = document.querySelector('.lt-vapp');
        if (value) vapp.classList.add('expanded-widget-menu');
        else vapp.classList.remove('expanded-widget-menu');
      },
      onSave: (value) => {
        dataTree.root.set('displayMenuWidgetsExpanded', value);
      },
    })
  );

  // Date From - To
  // ---------------------------------------------------------------------------

  settings.addOption(
    new DateTimePickerRangeField({
      id: '#date-range-picker',
      preview: true,
      default: conf.dates,
      onSave: (value) => {
        dataTree.root.set('displayMenuWidgetsExpanded', value);
      },
      class: '',
      template: `<div class="lt-form-column">
    <div class="lt-form-field">
      <label>${__('From')}</label>
      <div class="selectWrapper custom_from_date" id="{{id}}_from"></div>
    </div>
</div>
<div class="lt-form-column">
    <div class="lt-form-field">
      <label>${__('To')}</label>
      <div class="selectWrapper custom_to_date" id="{{id}}_to"></div>
    </div>
</div>`,
    })
  );

  return settings;
};
