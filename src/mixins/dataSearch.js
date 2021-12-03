import { closeAllMenus } from './menu';
import { fixQueryForLoxcope } from '../libs/queryutils';
import dependencies from '../data/dependencies';
import { error } from '../libs/alerts';

const goToQuery = dependencies.require('goToQuery');

const BTN_CLASS = 'lt-vapp-widget-action-gotosearch';

// Go to Loxcope with a query and dates ranges
function callGoToQuery(query, dates = null) {
  if (!query) return;

  try {
    goToQuery(query, dates);
  } catch (err) {
    error({
      title: 'Error',
      msg: `The query can not be launched`,
    });

    console.error(
      `The query "${query}" is not valid on the Search UI, it throws the following error: ${
        err.message.split('at')[0]
      }`
    );
  }
}

// Go To Search
const goToSearch = function (self) {
  // If no search was defined try to use the query of the first request
  // but only if setUseRequestForSearch is enabled.
  if (self.useMainRequestForSearch) {
    let req =
      self.requests[0]._type !== 'RequestChain'
        ? self.requests[0]
        : self.requests[0]._chainUnits[2];
    let query = fixQueryForLoxcope(req.query, self.customQueryFixesForLoxcope);
    callGoToQuery(query, req.dates);
  } else if (self.searchRequest !== undefined) {
    let req = self.searchRequest;
    callGoToQuery(req.query, req.dates);
  } else {
    console
      .error(
        `No search defined for widget ${self.id}. Use one of these:
      - widget.useMainRequestForSearch()
      - widget.setSearchRequest()`
      )
      .replace(/\n/gm, '');
  }
};

/**
 * Contains the methods to run the query of the widget in the
 * [Data search]{@link https://docs.devo.com/confluence/ndt/latest/searching-data} view.
 *
 * Sometimes the query executed through the
 * [API]{@link https://docs.devo.com/confluence/ndt/latest/api-reference/query-api}
 * may not be compatible from the [Data search]{@link https://docs.devo.com/confluence/ndt/latest/searching-data}
 * and it may be necessary to adapt it.
 * @category Widgets
 * @subcategory Mixins
 * @module dataSearch
 */
export default (self) => {
  if (self.el == null) return;
  let btn = self.el.querySelector(`.${BTN_CLASS}`);
  if (btn !== null) {
    btn.addEventListener('click', (evt) => {
      evt.stopPropagation();
      evt.preventDefault();
      closeAllMenus();
      goToSearch(self);
    });
  }
  self.useMainRequestForSearch = true;

  return {
    /**
     * If true the widget will try to to use the query of the first
     * assigned request for the go to search functionality. It will
     * try to fix it automatically so that it is compatible with loxcope.
     *
     * This feature will not always work, some queries can't be fixed
     * automatically.
     * @param {boolean} [useMainRequestForSearch=true] - Indicate if widget will
     * try to use the main query request
     * @param {Function[]} [customFixes] - Functions to be applied over the query.
     * Each functions should be receive the query text.
     * @instance
     */
    setUseMainRequestForSearch(
      useMainRequestForSearch = true,
      customFixes = []
    ) {
      self.useMainRequestForSearch = useMainRequestForSearch;
      self.customQueryFixesForLoxcope = customFixes;
    },

    /**
     * Sets the search request that will be used with the go to search
     * functionality. It has to be compatible with the
     * [Data search]{@link https://docs.devo.com/confluence/ndt/latest/searching-data}
     * @param {Object} searchRequest -
     * @param {string} searchRequest.query - Text with the query to run, expressed in LINQ.
     * @param {Object} searchRequest.dates -
     * @param {number} searchRequest.dates.from - The start date as a UTC timestamp in milliseconds.
     * @param {number} searchRequest.dates.to - The end date as a UTC timestamp in milliseconds.
     * @instance
     */
    setSearchRequest(searchRequest) {
      self.useMainRequestForSearch = false;
      self.searchRequest = searchRequest;
    },

    /**
     * Provides access to run a query and open it in
     * [Data search]{@link https://docs.devo.com/confluence/ndt/latest/searching-data}
     * @param {string} query - Text with the query to run, expressed in LINQ
     * @param {Object} dates -
     * @param {number} dates.from - The start date as a UTC timestamp in milliseconds
     * @param {number} dates.to - The end date as a UTC timestamp in milliseconds
     * @ignore
     */
    goToSearch: goToSearch,
  };
};
