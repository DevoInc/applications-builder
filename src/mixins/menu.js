const BTN_CLASS = "lt-vapp-widget-menu-launcher";

function changeMenuStylesToClosed(el) {
  const list = el.querySelector(`.${BTN_CLASS} > ul`);
  let listStyle = list.style;
  listStyle.visibility = "hidden";
  listStyle.top = "50px";
  listStyle.opacity = 0;
  listStyle.filter = "alpha(opacity=0)";
  listStyle.transform = "translate(9999px)";
  listStyle.webkitTransform = "translate(9999px)";
  listStyle.msTransform = "translate(9999px)";
  listStyle.webkitTransition = "top .2s, opacity .2s";
  listStyle.transition = "top .2s, opacity .2s";
}

function changeMenuStylesToOpened(el) {
  const list = el.querySelector(`.${BTN_CLASS} > ul`);
  let listStyle = list.style;
  listStyle.visibility = "visible";
  listStyle.top = "28px";
  listStyle.opacity = 1;
  listStyle.filter = "alpha(opacity=100)";
  listStyle.transform = "translate(0px)";
  listStyle.webkitTransform = "translate(0px)";
  listStyle.msTransform = "translate(0px)";
  listStyle.webkitTransition = "top .5s, opacity .4s";
  listStyle.transition = "top .5s, opacity .4s";
}

function changeMenuStylesToOpenedUp(el) {
  const list = el.querySelector(`.${BTN_CLASS} > ul`);

  let listStyle = list.style;
  listStyle.visibility = "visible";
  listStyle.top = "28px";
  listStyle.opacity = 1;
  listStyle.filter = "alpha(opacity=100)";
  listStyle.transform = "translate(0px, -120%)";
  listStyle.webkitTransform = "translate(0px, -120%)";
  listStyle.msTransform = "translate(0px, -120%)";
  listStyle.webkitTransition = "top .5s, opacity .4s";
  listStyle.transition = "top .5s, opacity .4s";
}

// Close others menus
export function closeOthersMenus(el) {
  let btn = el.querySelector(`.${BTN_CLASS}`);
  for (let elem of document.querySelectorAll(`.${BTN_CLASS}`)) {
    if (elem !== btn) changeMenuStylesToClosed(elem);
  }
}

// Close all menus
// TODO Move to general behaviour with the trigger
export function closeAllMenus() {
  for (let elem of document.querySelectorAll(`.${BTN_CLASS}`)) {
    changeMenuStylesToClosed(elem);
  }
}

// Toggle menu
export function toggleMenu(el) {
  if (!el.querySelector(`.${BTN_CLASS}`)) return;
  const HEIGHT = document.documentElement.clientHeight;
  const list = el.querySelector(`.${BTN_CLASS} > ul`);
  const listHeight = list.offsetHeight;
  const listYpos = list.getClientRects()[0].y;
  if (el.querySelector(`.${BTN_CLASS}`).classList.contains("openup")) {
    changeMenuStylesToClosed(el);
    el.querySelector(`.${BTN_CLASS}`).classList.toggle("openup");
  } else {
    if (listYpos + listHeight < HEIGHT) {
      if (el.querySelector(`.${BTN_CLASS} `).classList.contains("open")) {
        changeMenuStylesToClosed(el);
        el.querySelector(`.${BTN_CLASS}`).classList.toggle("open");
      } else {
        changeMenuStylesToOpened(el);
        el.querySelector(`.${BTN_CLASS}`).classList.toggle("open");
      }
    } else {
      if (el.querySelector(`.${BTN_CLASS}`).classList.contains("openup")) {
        changeMenuStylesToClosed(el);
        el.querySelector(`.${BTN_CLASS}`).classList.toggle("openup");
      } else {
        changeMenuStylesToOpenedUp(el);
        el.querySelector(`.${BTN_CLASS}`).classList.toggle("openup");
      }
    }
  }
}

/**
 * Contains the mechanisms to control the menu view in the widget header.
 * @category Widgets
 * @subcategory Mixins
 * @module menu
 */
const mixin = (self) => {
  if (self.el == null) return;
  let btn = self.el.querySelector(`.${BTN_CLASS}`);
  if (btn !== null) {
    btn.addEventListener("click", (evt) => {
      evt.stopPropagation();
      evt.preventDefault();
      closeOthersMenus(self.el);
      toggleMenu(self.el);
    });
  }

  if (document.querySelector(".lt-vapp") !== null)
    document.querySelector(".lt-vapp").addEventListener("click", () => {
      closeAllMenus();
    });

  return {
    /**
     * Given an HTML DOM element, it closes all the menus that may be
     * open inside it.
     * @param {HTMLElement} el - HTML DOM element to closes its menus.
     * @instance
     */
    closeOthersMenus: closeOthersMenus,

    /**
     * Given an HTML DOM element, toggle the menu.
     * @param {HTMLElement} el - HTML DOM element menu to toggle.
     * @instance
     */
    toggleMenu: toggleMenu,

    /**
     * Close all menus that might be open.
     * @instance
     */
    closeAllMenus: closeAllMenus,
  };
};

export default mixin;
