/**
 *  @category Libs
 *  @module alerts */
import dependencies from '../data/dependencies';

const NotiPop = dependencies.require('NotiPop');

/**
 * Show error message
 * @param {string} params - Object.
 */
export function error(params) {
  let msg, title, timer;
  if (params instanceof Object) {
    msg = params.msg;
    title = params.title;
    timer = params.timer;
  } else if (typeof params === 'string') {
    msg = params;
  }
  new NotiPop({ text: msg, type: NotiPop.ERROR, title: title, timer: timer });
}

/**
 * Show info message
 * @param {string} params - Object.
 */
export function info(params) {
  let msg, title, timer;
  if (params instanceof Object) {
    msg = params.msg;
    title = params.title;
    timer = params.timer;
  } else if (typeof params === 'string') {
    msg = params;
  }

  new NotiPop({ text: msg, type: NotiPop.INFO, title: title, timer: timer });
}

/**
 * Show success message
 * @param {string} params - Object.
 */
export function success(params) {
  let msg, title, timer;
  if (params instanceof Object) {
    msg = params.msg;
    title = params.title;
    timer = params.timer;
  } else if (typeof params === 'string') {
    msg = params;
  }

  new NotiPop({ text: msg, type: NotiPop.SUCCESS, title: title, timer: timer });
}

/**
 * Show warning message
 * @param {string} params - Object.
 */
export function warning(params) {
  let msg, title, timer;
  if (params instanceof Object) {
    msg = params.msg;
    title = params.title;
    timer = params.timer;
  } else if (typeof params === 'string') {
    msg = params;
  }

  new NotiPop({ text: msg, type: NotiPop.WARNING, title: title, timer: timer });
}

export default {
  error,
  info,
  success,
  warning,
};
