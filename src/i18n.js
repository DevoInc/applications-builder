/** i18n */

import i18n from './i18n/I18n';

let __ = (str) => i18n.trans(str);

export {
  i18n,
  __
};
