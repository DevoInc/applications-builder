/**
 * @category Data
 * @class Requests
 * This class handles the requests for a widget.
 **/
class Requests {
  constructor() {
    this.store = {};
  }

  /**
   * Add request to the store.
   * @param {string|Array} id - Id for the request or array of
   * object { id, request } for add.
   * @param {Request} req - The request to store.
   * @internal
   */
  add(id, req) {
    if (Array.isArray(id)) {
      for (let i = id.length; i--; ) {
        if (!id[i].request.componentId) {
          id[i].request.componentId = id[i].id;
        }
        this.store[id[i].id] = id[i].request;
      }
    } else {
      if (!req.componentId) req.componentId = id;
      this.store[id] = req;
    }
  }

  /**
   * Return request by id.
   * @param {string} id - Id of the request.
   * @internal
   */
  get(id) {
    return this.store[id];
  }

  /**
   * Return all available requests.
   * @internal
   */
  getAll() {
    return this.store;
  }

  abortAll() {
    for (let reqKey in this.store) {
      let req = this.store[reqKey];
      if (req.abort && req.abort instanceof Function) req.abort();
    }
  }
}

export default new Requests();
