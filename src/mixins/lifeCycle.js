import dataconversor from '@devo/applications-data-library/utils/dataConversor';

/**
 * Contains methods related to life cycle data of the widget.
 *
 * The life cyle of a widget pass for the following steps:
 *
 * 1. Set the widget in loading view
 * 2. Call the requests
 * 3. Validate the requests
 * 4. Normalize the data
 * 5. Process the data
 * 6. Validate the process
 * 7. Render the data
 * @category Widgets
 * @subcategory Mixins
 * @module lifeCycle
 **/
export default (self) => {
  self = Object.assign(self, {
    data: null, // Data value
    loadingVisibility: true, // Show loading or not
  });

  return {
    /**
     * Set the requests objects
     * @param {Array} requests - Array of request to perform
     * @param {boolean} [bindChange=false] - Subscribe to the Request <i>"change"</i>.
     * @instance
     */
    setRequests(requests, bindChange = false) {
      self.requests = requests;
      if (bindChange) {
        for (let req of self.requests) {
          req.subscribe('change', this.refresh.bind(this));
        }
      }
    },

    /**
     * Set the data to the widget from outside of the request process.
     * @param {Array} data - Data to use in the widget.
     * @instance
     */
    setData(data) {
      self.data = data;
    },

    /**
     * Get the data structure of the widget.
     * @returns - Data structure.
     * @instance
     */
    getData() {
      return self.data;
    },

    /**
     * Set the visibility of the loading icon.
     * @param {boolean} bool - True for see loading, false to hide it.
     * @instance
     */
    setLoadingVisibility(bool) {
      self.loadingVisibility = bool;
    },

    /**
     * Show stats of the widget.
     * @instance
     */
    getStats() {
      console.log(self);
    },

    /**
     * Process the whole life cycle to draw a widget.
     * @instance
     */
    refresh() {
      if (self.hidden) {
        // If the widget is not visible then mark for refresh next time
        self.forceRefresh = true;
        return;
      }

      // Show loading
      if (self.loadingVisibility) this.showLoading();

      // Start the life cycle process
      Promise.resolve()

        // Request Segment
        // ---------------------------------------------------------------------

        // Requests
        .then(() => this.callRequests())

        // Validation
        .then((data) => this.validateRequests(data))

        // Process Segment
        // ---------------------------------------------------------------------

        // Normalize
        .then((data) => this.normalize(data))

        // Process
        .then((data) => (this.process ? this.process(data) : data))
        .then((data) => this.validateProcess(data))

        // Render Segment
        // ---------------------------------------------------------------------

        // Hide loading
        .then((data) => {
          if (self.loadingVisibility) this.hideLoading();
          return data;
        })

        // Render
        .then((data) => this.render(data))
        .then((data) => (this.afterRender ? this.afterRender(data) : data))

        // Common task for every life cycle
        .then(() => {
          self.renderTimes++;

          // TODO debug method for general debugging
          // console.log(`${self.id} rendered ${self.renderTimes} times`);

          // Force refresh if not visible
          self.forceRefresh = !self.visible;
        })
        .catch((err) => {
          console.error(
            `${self.id}: Unmanaged error caught on lifecycle.js: ${err}`
          );
        });
    },

    // Request Segment
    // -------------------------------------------------------------------------
    /**
     * Call the requests set before
     * @ignore
     */
    callRequests() {
      try {
        if (self.requests.length > 0) {
          // If there are requests return promise all
          return Promise.all(self.requests.map((req) => req.call()));
        } else if (self.data) {
          // If there are manual data return this data
          return Promise.resolve(self.data);
        }
        // In other cases show NO DATA
        return this.debugError(
          {
            msg: 'NO DATA',
            console: {
              method: 'warn',
              msg: `No requests or data set on widget`,
            },
          },
          true
        );
      } catch (err) {
        return this.debugError({
          msg: 'ERROR',
          console: {
            method: 'error',
            msg: `Error on callRequests(): ${err.stack}`,
          },
        });
      }
    },

    /**
     * Verify and validate the responses of the requests
     * @returns {any}
     * @ignore
     */
    validateRequests(data) {
      try {
        if (data && Array.isArray(data)) {
          let bad = 0;
          let unauthorized = 0;
          let error = 0;
          for (let res of data) {
            if (res.status !== 0) {
              // If the request is bad
              if (res.error)
                console.error(`${self.id} -> Error for: ${res.request}
                  ${res.error}`);
              else
                console.error(
                  `${self.id} -> Bad Request for: ${res.request}
                  ${res.msg}
                  ${res.object}`
                );
              bad++;
              if (res.status === 403)
                // If the request is unauthorized
                unauthorized++;
              // If the request responded with error
              else error++;
            } else if (
              res.object.length === 0 ||
              (res.object.d && res.object.d.length === 0)
            ) {
              // If the request is empty
              console.warn(`${self.id} -> Empty request for: ${res.request}`);
              bad++;
            }
          }
          if (bad === data.length) {
            // If all the request are bad or empty
            if (unauthorized)
              return this.debugError(
                {
                  msg: 'NOT AUTHORIZED',
                  console: {
                    method: 'error',
                    msg: `Not authorized to access tables`,
                  },
                },
                true
              );
            else if (error)
              return this.debugError(
                {
                  msg: 'ERROR',
                  console: {
                    method: 'error',
                    msg: `Error on request`,
                  },
                },
                true
              );
            else
              return this.debugError(
                {
                  msg: 'NO DATA',
                  console: {
                    method: 'warn',
                    msg: `All requests are bad or empty`,
                  },
                },
                true
              );
          } else {
            // If all is correct continue
            return Promise.resolve(data);
          }
        } else {
          // If data is something else return invalid data
          return this.debugError(
            {
              msg: 'INVALID DATA',
              console: {
                method: 'error',
                msg: `Invalid data`,
              },
            },
            true
          );
        }
      } catch (err) {
        // If some error is happening with this section
        return this.debugError(
          {
            msg: 'ERROR',
            console: {
              method: 'error',
              msg: `Error on validateRequests(): ${err.stack}`,
            },
          },
          true
        );
      }
    },

    // Process Segment
    // -------------------------------------------------------------------------

    /**
     * Return an array of data matrix or raw data of the input
     * sources for use in process
     * @param {Object|Array} data
     * @returns {any}
     * @ignore
     */
    normalize(data) {
      try {
        if (Array.isArray(data)) {
          // In case we have an array of data check if is from requests and can
          // be converted to data matrix
          let result = [];

          for (let i = 0; i < data.length; i++) {
            if (data[i].type) {
              // If the data is a requests result
              result.push(dataconversor(data[i]));
            } else {
              // If the data is not from request
              result.push(data[i]);
            }
          }

          // If there is only one result pass directly
          if (result.length === 1) result = result[0];
          return result;
        }
        // Direct data passed right away
        return data;
      } catch (err) {
        return this.debugError(
          {
            msg: 'ERROR',
            console: {
              method: 'error',
              msg: `Error on normalize(): ${err.stack}`,
            },
          },
          true
        );
      }
    },

    /**
     * If the data is an array pick the first result else pick the
     * whole result.
     * @param {*} data
     * @returns {any}
     * @ignore
     */
    process(data) {
      return Array.isArray(data) ? data[0] : data;
    },

    /**
     * Validate Process
     * @param {*} data
     * @returns {any}
     * @ignore
     */
    validateProcess(data) {
      try {
        // Accept objects
        if (data !== null && typeof data === 'object') return data;
        // Accept arrays
        if (Array.isArray(data)) {
          if (data.length > 0) return data;
          return this.debugError({
            msg: 'NO DATA',
            console: {
              method: 'warn',
              msg: `No data after process on widget`,
            },
          });
        }
        // In other cases
        return this.debugError(
          {
            msg: 'ERROR',
            console: {
              method: 'error',
              msg: `Bad data after process on widget`,
            },
          },
          true
        );
      } catch (err) {
        return this.debugError(
          {
            msg: 'ERROR',
            console: {
              method: 'error',
              msg: `Error on validateProcess(): ${err.stack}`,
            },
          },
          true
        );
      }
    },

    // Render segment
    // -------------------------------------------------------------------------
    /**
     * Render the data in the widget.
     * To be defined in each widget.
     * @returns {any}
     * @instance
     */
    render() {
      return this.debugError(
        {
          msg: 'NO DATA',
          console: {
            method: 'warn',
            msg: `Render method not defined`,
          },
        },
        true
      );
    },
    afterRender: null,
  };
};
