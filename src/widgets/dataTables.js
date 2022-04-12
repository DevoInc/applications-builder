import downloads from '@devoinc/applications-builder/libs/downloads';
import { i18n } from '@devoinc/applications-builder/i18n';
import widgetFactory from '@devoinc/applications-builder/widgetFactory';
import objects from '@devoinc/applications-builder/utils/objects';
import { arrayRenderer, tooltipRenderer } from './helpers/renderers';

/**
 * The table widget displays data as a simple table,
 * distributed in columns and rows.
 *
 * This widget is based on
 * [datatables]{@link https://datatables.net/} library.
 * @category Widgets
 * @module Table
 * @see [base](module-base.html)
 * @see [collapser](module-collapser.html)
 * @see [dataSearch](module-dataSearch.html)
 * @see [download](module-download.html)
 * @see [info](module-info.html)
 * @see [lifeCycle](module-lifeCycle.html)
 * @see [listeners](module-listeners.html)
 * @see [loading](module-loading.html)
 * @see [menu](module-menu.html)
 * @see [screenshot](module-screenshot.html)
 * @see [zoom](module-zoom.html)
 * @tutorial widgets-table
 */
function mixin(self) {
  return {
    /**
     * Set the limit of data to show without any kind of order.
     * @param {number} limit - Limit value.
     * @instance
     */
    setLimit(limit) {
      self.settings.ds.limit = limit;
    },

    /**
     * Set the initial order for the table.
     * @param {Array} order
     * @param {index} order.0 - Index of the column
     * @param {string} order.1 - Order to sorting. <i>desc</i> or <i>asc</i>.
     * @instance
     */
    setOrder(order) {
      self.settings.ds.order = order;
    },

    /**
     * Set the array of labels to show as series title.
     * Override the processed ones.
     * @param {string[]} arr - Array of strings
     * @instance
     */
    setLabels(arr) {
      self.settings.ds.labels = arr;
    },

    /**
     * Set specific options to columns in the table.
     * @param {Object[]} defs - Array of columnDefs objects.
     * @see https://datatables.net/reference/option/columnDefs
     * @instance
     */
    setColumnDefs(defs) {
      self.settings.ds.columnDefs = self.settings.ds.columnDefs || [];
      self.settings.ds.columnDefs = self.settings.ds.columnDefs.concat(defs);
    },

    /**
     * Attach an event handler function to execute when a row is clicked.
     * @param {Function} func - Callback JavaScript function.
     * @instance
     */
    setRowClick(func) {
      self.settings.ds.rowClick = func;
    },

    /**
     * Set a function that is called before every draw of the table.
     * @param {Function} func - Callback JavaScript function.
     * @see https://datatables.net/reference/option/drawCallback
     * @instance
     */
    setDrawCallback(func) {
      self.settings.ds.drawCallback = func;
    },

    /**
     * Set the table control elements to appear on the page and in what order.
     * https://datatables.net/reference/option/dom
     * @param {string} str - Dom value.
     * @see https://datatables.net/reference/option/dom
     * @instance
     */
    setDom(str) {
      self.settings.ds.dom = str;
    },

    /**
     * Set the order of the columns to be displayed in the table based on the
     * values of the query.
     * @param {int[]} order - Index of columns.
     * @instance
     */
    setColumnsOrder(order) {
      self.settings.ds.columnsOrder = order;
    },

    /**
     * Set the language configuration.
     * @param {object} language - Language object.
     * @see https://datatables.net/reference/option/language
     * @instance
     */
    setLanguage(language) {
      self.settings.ds.language = language;
    },

    /**
     * Set the vertical scrolling.
     * @param {string} scrollY - Value in pixels.
     * @see https://datatables.net/reference/option/scrollY
     * @instance
     */
    setScrollY(scrollY) {
      self.settings.ds.scrollY = scrollY;
    },

    /**
     * Set the horizontal scrolling.
     * @param {boolean} bool - Enable or disable.
     * @see https://datatables.net/reference/option/scrollX
     * @instance
     */
    setScrollX(scrollX) {
      self.settings.ds.scrollX = scrollX;
    },

    /**
     * Allow reduces the height of the table when a limited number of
     * rows are shown.
     * @param {boolean} scrollCollapse - Enable or disable.
     * @see https://datatables.net/reference/option/scrollCollapse
     * @instance
     */
    setScrollCollapse(scrollCollapse) {
      self.settings.ds.scrollCollapse = scrollCollapse;
    },

    /**
     * Allow to change the paging display length of the table.
     * @param {boolean} lengthChange - Enable or disable.
     * @see https://datatables.net/reference/option/lengthChange
     * @instance
     */
    setLengthChange(lengthChange) {
      self.settings.ds.lengthChange = lengthChange;
    },

    /**
     * Set the default number of rows per page.
     * @param {number} pageLength - Default page length.
     * @see https://datatables.net/reference/option/pageLength
     * @instance
     */
    setPageLength(pageLength) {
      self.settings.ds.pageLength = pageLength;
    },

    /**
     * Change the options in the page length select list.
     * @param {Array[]} lengthMenu - Array of int values.
     * @see https://datatables.net/reference/option/lengthMenu
     * @default [ 10, 25, 50, 100 ]
     * @instance
     */
    setMenuLength(lengthMenu) {
      self.settings.ds.lengthMenu = lengthMenu;
    },

    /**
     * Callback executed when a row (TR element) is created.
     * @param {Function} func - Callback JavaScript function.
     * @see https://datatables.net/reference/option/createdRow
     * @instance
     */
    setCreatedRow(func) {
      self.settings.ds.createdRow = func;
    },

    /**
     * Use the visual data for exported values.
     * @param {boolean} bool - Enable or disable.
     * @instance
     */
    useExportWithVisual(bool = true) {
      self.settings.useExportWithVisual = bool;
    },

    /**
     * Allow to show the filter.
     * @param {boolean} boo - Enable or disable.
     * @instance
     */
    setFilter(bool = false) {
      objects.set(self, 'settings.ds.filter', bool);
    },

    /**
     * Allow table pagination.
     * @param {boolean} bool - Enable or disable.
     * @see https://datatables.net/reference/option/paging
     * @instance
     */
    setPaging(bool = true) {
      self.settings.ds.paging = bool;
    },

    /**
     * Allow to show information about the table.
     * @param {boolean } bool - Enable or disable.
     * @see https://datatables.net/reference/option/info
     * @instance
     */
    setFooterInfo(bool = true) {
      self.settings.ds.info = bool;
    },

    /**
     * Add custom class to table element.
     * @param {string} classes - Name of clases.
     * @instance
     */
    setCustomClass(classes = []) {
      self.settings.ds.cls = classes;
    },

    /**
     * Set arbitrary renderers to the given columns.
     * @param {Array|number|string} targetColumns - Columns to apply
     * the definitions.
     * @param {Function|Object|string|number} render - Process to apply.
     * @see https://datatables.net/reference/option/columnDefs.targets
     * @see https://datatables.net/reference/option/columns.render
     * @instance
     */
    setColumnRenderers(targetColumns, render) {
      self.settings.ds.columnDefs = self.settings.ds.columnDefs || [];
      self.settings.ds.columnDefs = self.settings.ds.columnDefs.concat({
        render: render,
        targets: targetColumns,
      });
    },

    /**
     * Renders a group of cells with a span and a tooltip.
     * @param {Array|number|string} targetColumns - Columns to apply
     * the definitions.
     * @see https://datatables.net/reference/option/columnDefs.targets
     * @instance
     */
    setToolTipColumns(targetColumns) {
      this.setColumnRenderers(targetColumns, tooltipRenderer);

      self.settings.ds.columnDefs = self.settings.ds.columnDefs || [];
      self.settings.ds.columnDefs.push({
        className: 'flexible-ellipsis-cell',
        targets: targetColumns,
      });
    },

    /**
     * Set which columns should not wrap the text.
     * @param {Array|number|string} targetColumns - Columns to apply
     * the definitions.
     * @see https://datatables.net/reference/option/columnDefs.targets
     * @instance
     */
    setNoWrapColumns(targetColumns) {
      self.settings.ds.columnDefs = self.settings.ds.columnDefs || [];
      self.settings.ds.columnDefs.push({
        className: 'nowrap-cell',
        targets: targetColumns,
      });
    },

    /**
     * Set the columns that should represent an array of values.
     * @param {Array|number|string} targetColumns - Columns to apply
     * the definitions.
     * @see https://datatables.net/reference/option/columnDefs.targets
     * @instance
     */
    setArrayColumns(targetColumns) {
      this.setColumnRenderers(targetColumns, arrayRenderer);
    },

    /**
     * Set the pagination type.
     *
     * - <b>numbers</b>: Page number buttons only.
     * - <b>simple</b>: <i>Previous</i> and <i>Next</i> buttons only.
     * - <b>simple_numbers</b>: <i>Previous</i> and <i>Next</i> buttons,
     * plus page numbers.
     * - <b>full</b>: <i>First</i>, <i>Previous</i>, <i>Next</i> and
     * <i>Last</i> buttons.
     * - <b>full_numbers</b>: <i>First</i>, <i>Previous</i>, <i>Next</i> and
     * <i>Last</i> buttons, plus page numbers.
     * - <b>first_last_numbers</b>: <i>First</i> and <i>Last</i> buttons,
     * plus page numbers.
     * @param {string} pagingType - Pagination type.
     * @see https://datatables.net/reference/option/pagingType
     * @instance
     */
    setPagingType(pagingType = 'simple_numbers') {
      self.settings.ds.pagingType = pagingType;
    },

    // Common
    // -------------------------------------------------------------------------

    /**
     * Download in CSV format
     * @param {string} d - Delimiter (default: ,)
     * @param {string} q - Quotechar (default: ")
     * @ignore
     */
    downloadCSV(d = ',', q = '"') {
      let dt = self.widget;

      // Write headers
      let headers = dt.settings().columns().header();
      let content = headers.map((el) => q + el.innerHTML + q).join(d) + '\n';

      // Write content
      if (self.settings.useExportWithVisual) {
        // Visual content
        let rowIndexes = dt
          .rows(null, {
            search: 'applied',
            order: 'applied',
          })
          .indexes()
          .toArray();
        var selectedCells = dt.cells(rowIndexes, '');
        var cells = selectedCells.render('display').toArray();
        for (let i = 1; i <= cells.length; i++) {
          content += q + cells[i - 1] + q;
          content += i % headers.length === 0 ? '\n' : ',';
        }
      } else {
        // Internal content
        content += self.data
          .map((row) => q + row.join(q + d + q) + q)
          .join('\n');
      }

      // Download CSV
      downloads.downloadCSV(content, self.id);
    },

    // Life Cycle
    // -------------------------------------------------------------------------

    /**
     * Render of the widget
     * @param {arr} orig - Data for the widget
     * @ignore
     */
    render(data) {
      if (!self.el) return; // If not have element not render
      let orig = { ...data };
      let cfg = self.settings;
      if (
        orig &&
        orig.dataMatrix &&
        Array.isArray(orig.dataMatrix) &&
        orig.keys &&
        Array.isArray(orig.keys) &&
        orig.dataMatrix.length > 0
      ) {
        // Initial params
        const params = {
          dom: cfg.ds.dom || 'lfrtip',
        };

        // Data Source
        const safeItem = (text) => $.fn.psDataTable.render.text().display(text);
        var d = orig.dataMatrix.map((e) => e.map((x) => safeItem(x)));
        const dataArr = cfg.ds.limit ? d.slice(0, cfg.ds.limit) : d;
        self.data = d;

        if (cfg.useDataTableSource) {
          const dts = new DataTableSource(dataArr, false);
          params['serverSide'] = true;
          params['deferRender'] = true;
          params['sorting'] = [];
          params['destroy'] = true;
          params['ajax'] = (data, callback, settings) => {
            callback(dts.ajax(data, settings));
          };
        } else {
          params['aaData'] = dataArr;
          // Use deferRender by default.
          params['deferRender'] = true;
        }

        params['aaData'] = dataArr;
        params['deferRender'] = true;

        // Columns
        let labels = orig.keys.map((key) => key.name);
        let columns = [];

        let aux = 0;
        if (cfg.ds.labels)
          for (let h of cfg.ds.labels)
            columns.push({
              sTitle: h,
              data: cfg.ds.columnsOrder ? cfg.ds.columnsOrder[aux++] : aux++,
            });
        else
          for (let h of labels)
            columns.push({
              sTitle: h,
              data: cfg.ds.columnsOrder ? cfg.ds.columnsOrder[aux++] : aux++,
            });

        params['columns'] = columns;

        if (cfg.ds.columnDefs) params['columnDefs'] = cfg.ds.columnDefs;

        // Scroll
        if (cfg.ds.scrollX) params['scrollX'] = cfg.ds.scrollX;
        if (cfg.ds.scrollY) params['scrollY'] = cfg.ds.scrollY;
        if (cfg.ds.scrollCollapse)
          params['scrollCollapse'] = cfg.ds.scrollCollapse;

        // Languages
        let lang = i18n.getLang();
        let locales = i18n.locales[lang] ? i18n.locales[lang].dt : {};
        let userLocales = self.settings.ds.language || {};
        let languageObj = Object.assign({}, locales, userLocales);
        params['language'] = languageObj;
        params['lengthChange'] = cfg.ds.lengthChange || false;
        params['filter'] = cfg.ds.filter || false;

        // Order
        params['order'] = cfg.ds.order ? cfg.ds.order : [];

        // Pagination
        params['pageLength'] = cfg.ds.pageLength ? cfg.ds.pageLength : 10;
        params['paging'] =
          typeof cfg.ds.paging == 'boolean' ? cfg.ds.paging : true;
        params['info'] = typeof cfg.ds.info == 'boolean' ? cfg.ds.info : true;
        params['pagingType'] =
          typeof cfg.ds.pagingType === 'string'
            ? cfg.ds.pagingType
            : 'simple_numbers';
        params['lengthMenu'] = cfg.ds.lengthMenu
          ? cfg.ds.lengthMenu
          : [10, 25, 50, 100];

        // Callbacks
        params['createdRow'] = cfg.ds.createdRow || null;
        params['drawCallback'] = cfg.ds.drawCallback;

        // Create the table base
        let table = document.createElement('table');
        table.classList.add('display', 'hover', 'order-column');
        table.setAttribute('cellspacing', 0);
        table.setAttribute('width', '100%');

        if (typeof cfg.ds.cls !== 'undefined') {
          for (let c of cfg.ds.cls) {
            table.classList.add(c);
          }
        }
        self.graphic.innerHTML = '';
        self.graphic.appendChild(table);

        // Create the widget
        // Always destroy the previous datatable
        if (self.table !== undefined) {
          $(self.table).PsDataTable().destroy();
        }
        self.widget = $(table).PsDataTable(params);

        // Remember the table to destroy it on the next refresh
        self.table = table;

        // Add row click behaviour
        if (cfg.ds.rowClick) {
          $('#' + self.id + ' tbody').on('click', 'tr', cfg.ds.rowClick);
        }
      } else {
        this.debugError({
          msg: 'NO DATA',
          console: {
            method: 'error',
            msg: 'No data arrive to render function',
          },
        });
      }
      return data;
    },
  };
}

export default widgetFactory(mixin);
