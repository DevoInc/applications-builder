/**
 * @category Data
 * @class
 * This class provides the external dependencies necessary for the operation
 * of the application.
 **/
class Dependencies {
  // Constructor
  constructor() {
    this._dependencies = {
      goToQuery: {},
      loadPage: {},
      InlineMessage: {},
      NotiPop: {},
      userInfo: {},
      webModal: {},
      widgets: {},
    };

    let depEvt = (evt) => {
      evt.preventDefault();
      if (evt.detail.dependencies) this.update(evt.detail.dependencies);
    };
    document.addEventListener('applicationBuilderDependencies', depEvt);
    document.dispatchEvent(new CustomEvent('getVappDeps'));
  }

  /**
   * Require a dependency by the id.
   * @param {string} id - Id of the dependency.
   */
  require(id) {
    return this._dependencies[id];
  }

  /**
   * Update dependencies.
   * @param {object} dependencies - Dependencies object.
   */
  update(dependencies) {
    if (dependencies) {
      this._dependencies.goToQuery = dependencies.goToQuery;
      this._dependencies.loadPage = dependencies.loadPage;
      this._dependencies.NotiPop = dependencies.NotiPop;
      this._dependencies.userInfo = dependencies.userInfo;
      this._dependencies.webModal = dependencies.webModal;
      this._dependencies.widgets = dependencies.widgets.view;
      this._dependencies.InlineMessage = dependencies.InlineMessage;
    }
  }
}

// Singleton
export default new Dependencies();
