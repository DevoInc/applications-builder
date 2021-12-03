import loading from './mixins/loading';
import base from './mixins/base';
import lifeCycle from './mixins/lifeCycle';
import info from './mixins/info';
import menu from './mixins/menu';
import screenshot from './mixins/screenshot';
import zoom from './mixins/zoom';
import dataSearch from './mixins/dataSearch';
import listeners from './mixins/listeners';
import collapser from './mixins/collapser';
import download from './mixins/download';
import showquery from './mixins/showquery';

import user from '@devo/applications-builder/libs/user';

// Widget Factory
function widget(id, tpl, mixin) {
  const el = document.getElementById(id);
  if (el === null) {
    console.error(`${id} -> The id does not exists on the HTML.`);
    return;
  }

  let self = {
    id,
    el,
    settings: {
      ds: {},
      timezone: user.getTimezone(),
    },
    requests: [],
    renderTimes: 0,
  };
  if (tpl) self.settings = Object.assign(self.settings, tpl(id));
  if (self.el !== null) {
    self.graphic = self.el.querySelector('.lt-vapp-widget-graphic');
    self.settings.dom = self.graphic;
  }

  const composite = Object.assign(
    {},
    base(self),
    lifeCycle(self),
    info(self),
    menu(self),
    screenshot(self),
    zoom(self),
    dataSearch(self),
    loading(self),
    listeners(self),
    collapser(self),
    download(self),
    showquery(self),
    mixin ? mixin(self) : {}
  );

  // TODO try to keep the pattern of proper owner at this functionality
  composite.addDownloadBehaviour();

  return composite;
}

export default (mixin = null) => {
  return (id, tpl) => widget(id, tpl, mixin);
};
