import loading from '@devoinc/applications-builder/mixins/loading';
import base from '@devoinc/applications-builder/mixins/base';
import lifeCycle from '@devoinc/applications-builder/mixins/lifeCycle';

import user from '@devoinc/applications-builder/libs/user';
jest.mock('@devoinc/applications-builder/libs/user');

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

    loading(self),

    mixin ? mixin(self) : {}
  );

  return composite;
}

export default (mixin = null) => {
  return (id, tpl) => widget(id, tpl, mixin);
};
