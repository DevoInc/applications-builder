/**
 * @class
 *
 */
class TabsBar {
  /**
   * @constructor
   * @param {obeject} settings - Settings for the TabsBar
   * @param {number} settings.firstTabIndex - Index of the Tab active.
   * @param {obeject} settings.transition -
   * @param {string} settings.transition.effect - Effect to apply on tab.
   * transitions. One of: _fade_, _slide_ or _none_. Default _none_.
   * @param {duration} settings.transition.duration - Duration of the
   * transition in milliseconds. Default _0_.
   */
  constructor(settings = {}) {
    this.buttons = [];
    this.tabs = [];
    this.currentTab = 0;

    this.settings = Object.assign(
      {
        firstTabIndex: 0,
        transition: {
          effect: "none",
          duration: 0,
        },
      },
      settings
    );

    this.MENU_EXPANDED = 250;
    this.MENU_COLLAPSED = 60;
  }

  /**
   * Init on ready
   */
  init() {
    this.menu = document.querySelector(".lt-vapp-menu");
    this.detail = document.querySelector(".lt-vapp-details");
    if (this.detail) this.menu.classList.add("withDetailBar");

    // Init all tabs
    for (let tab of this.tabs) tab.init(this.settings);

    // Set the tab for show
    this.currentTab = this.settings.firstTabIndex;
    this.tabs[this.currentTab].select();

    this._windowsScroll();
    this._setListeners();
  }

  /**
   * Add a button to the TabsBar
   * @param {object} button - Button for add
   */
  addButton(button) {
    this.buttons.push(button);
  }

  /**
   * Add a tab to the TabsBar
   * @param {object} tab - Tab for add
   */
  addTab(tab) {
    tab.setTransition(this.settings.transition);
    this.tabs.push(tab);
  }

  /**
   * Close all tabs
   */
  closeAll() {
    for (let tab of this.tabs) tab.unselect();
  }

  // Add listeners
  _setListeners() {
    window.addEventListener("scroll", () => this._windowsScroll());
  }

  // Change position of the tabs on change to fixed menu
  _repositionTabs() {
    let w = 0;
    if (this.menu.classList.contains("fixed-menu")) {
      let mn = document.querySelector("#main-navigation");
      if (mn) {
        if (mn.classList.contains("fixed-menu")) w = this.MENU_EXPANDED;
        else w = this.MENU_COLLAPSED;
      } else {
        // Not MENUBAR at all
        w = 0;
      }
    }
    this.menu.style.left = `${w}px`;
    if (this.detail) this.detail.style.left = `${w}px`;
  }

  // Control when scroll the window
  _windowsScroll() {
    let header = document.querySelector(".lt-vapp-header");
    if (header !== null) {
      let detailH = this.detail ? parseInt(this.detail.offsetHeight) : 0;
      let headerH = parseInt(header.offsetHeight);
      let scrollTop = window.scrollY;

      let barOverridden = scrollTop >= headerH - detailH;
      let alreadyFixed = this.menu.classList.contains("fixed-menu");

      if ($("[section]:visible").length > 0)
        this._setActiveScrollingSection(scrollTop);

      if (barOverridden && !alreadyFixed) {
        this.menu.classList.add("fixed-menu");
        this.menu.style.top = `${detailH}px`;
        if (this.detail) this.detail.classList.add("fixed-menu");
      } else if (!barOverridden && alreadyFixed) {
        this.menu.classList.remove("fixed-menu");
        this.menu.style.top = "auto";
        if (this.detail) this.detail.classList.remove("fixed-menu");
      }
    }

    this._repositionTabs();
  }

  // Set active scrolling section
  _setActiveScrollingSection(scrollTop) {
    var selected = null;
    var def = null;
    var sections = $("[toSection]:visible");
    var totSections = sections.length;
    var i = 0;
    for (i; i < totSections; i += 1) {
      var section = $(sections[i]);
      var top = section.offset().top;
      var toSection = section.attr("tosection");
      var selected = scrollTop >= top ? toSection : selected;
      def = i == 0 ? toSection : def;
    }
    if (selected != null) {
      $(
        '[section].active:visible:not([section="' + selected + '"])'
      ).removeClass("active");
      $('[section="' + selected + '"]:visible').addClass("active");
    } else if (def != null) {
      $('[section].active:visible:not([section="' + def + '"])').removeClass(
        "active"
      );
      $('[section="' + def + '"]:visible').addClass("active");
    }
  }
}

export default TabsBar;
