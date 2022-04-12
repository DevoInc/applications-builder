import '@babel/polyfill';
import sinon from 'sinon';
import template from '../template';

beforeEach(() => {
  let $ = (window.jQuery = window.$ = require('jquery'));
  document.body.innerHTML = template;
  global.stub = sinon.stub(console, 'warn');
});
afterEach(() => {
  window.jQuery = undefined;
  window.$ = undefined;
  global.stub.restore();
  global.stub = undefined;
});

test('should exist', () => {
  const base = require('@devoinc/applications-builder/mixins/base');
  expect(base).toBeDefined();
});

test('should initialize the widget structure', () => {
  const base = require('@devoinc/applications-builder/mixins/base');
  let self = {
    id: 'base',
  };
  base.default(self);

  expect(self.widget).toBeNull();
  expect(self.graphic).toBeUndefined();
  expect(self.visible).toBe(false);
  expect(self.forceRefresh).toBe(false);
  expect(self.visible).toBe(false);
  expect(self.data.id).toBe('base');
  expect(self.data.data instanceof Object).toBeTruthy();
  expect(self.data.observers instanceof Object).toBeTruthy();
  expect(Array.isArray(self.data.children)).toBeTruthy();
  expect(self.data.parent).toBeNull();
});

test('should do nothing when resize is called', () => {
  const base = require('@devoinc/applications-builder/mixins/base');
  let self = {
    id: 'base',
  };
  let baseMxi = base.default(self);
  let copySelf = self;
  baseMxi.resize();
  expect(self).toBe(copySelf);
});

test('should do nothing when redraw is called', () => {
  const base = require('@devoinc/applications-builder/mixins/base');
  let self = {
    id: 'base',
  };
  let baseMxi = base.default(self);
  let copySelf = self;
  baseMxi.redraw();
  expect(self).toBe(copySelf);
});

test('should do nothing when init is called', () => {
  const base = require('@devoinc/applications-builder/mixins/base');
  let self = {
    id: 'base',
  };
  let baseMxi = base.default(self);
  let copySelf = self;
  baseMxi.init();
  expect(self).toBe(copySelf);
});

test('should return graphic value when getGraphicContainer is called', () => {
  const base = require('@devoinc/applications-builder/mixins/base');
  let self = { id: 'base' };
  let baseMxi = base.default(self);
  let gr = baseMxi.getGraphicContainer();
  expect(gr).toBeUndefined();
});

test('should return widget value when getWidget is called', () => {
  const base = require('@devoinc/applications-builder/mixins/base');
  let self = { id: 'base' };
  let baseMxi = base.default(self);
  let wid = baseMxi.getWidget();
  expect(wid).toBeNull();
});

test('should return visible value is when isVisible is called', () => {
  const base = require('@devoinc/applications-builder/mixins/base');
  let self = { id: 'base' };
  let baseMxi = base.default(self);
  let isVisible = baseMxi.isVisible();
  expect(isVisible).toBe(false);
});

test('should return visible value is when isVisible is called', () => {
  const base = require('@devoinc/applications-builder/mixins/base');
  let self = { id: 'base' };
  let baseMxi = base.default(self);
  let isVisible = baseMxi.isVisible();
  expect(isVisible).toBe(false);
});

test('should show widget when show is called', () => {
  const base = require('@devoinc/applications-builder/mixins/base');
  let self = { id: 'base' };
  let baseMxi = base.default(self);
  self.graphic = {
    style: {
      display: null,
    },
  };
  let spy = sinon.spy();
  baseMxi.addListener = spy;
  baseMxi.show();
  expect(self.visible).toBe(true);
  expect(self.graphic.style.display).toBe(null);
  // sinon.assert.calledOnce(spy);
});

test('should hide widget when hide is called', () => {
  const base = require('@devoinc/applications-builder/mixins/base');
  let self = { id: 'base' };
  let baseMxi = base.default(self);
  self.graphic = {
    style: {
      display: null,
    },
  };
  let spy = sinon.spy();
  baseMxi.removeAllListeners = spy;
  baseMxi.hideGraphic();
  expect(self.visible).toBe(false);
  expect(self.graphic.style.display).toBe('none');
  sinon.assert.calledOnce(spy);
  sinon.assert.calledWith(spy, 'resize');
});

test('should draw error without message when drawError is called without \
params', () => {
  const base = require('@devoinc/applications-builder/mixins/base');
  let self = {
    id: 'stackedBarWidget',
    el: $('#stackedBarWidget'),
    settings: {},
  };
  let baseMxi = base.default(self);
  self.graphic = {
    style: {
      display: null,
    },
  };
  baseMxi.drawError();
  let container = $(self.el).find('.lt-vapp-widget-graphic');
  expect(self.visible).toBe(false);
  expect(container[0].innerHTML).toBe(
    '<div class="widgetError">\
<span class="lticon-information_about"></span><span></span></div>'
  );
});

test('should draw error with message when drawError is called without params', () => {
  const base = require('@devoinc/applications-builder/mixins/base');
  let self = {
    id: 'stackedBarWidget',
    el: $('#stackedBarWidget'),
    settings: {},
  };
  let baseMxi = base.default(self);
  self.graphic = {
    style: {
      display: null,
    },
  };
  baseMxi.drawError('message');
  let container = $(self.el).find('.lt-vapp-widget-graphic');
  expect(self.visible).toBe(false);
  expect(container[0].innerHTML).toBe(
    '<div class="widgetError">\
<span class="lticon-information_about"></span><span>message</span></div>'
  );
});

test('should log warn to console and call drawError with the default message, \
and hideLoading when debugError is called without params', () => {
  const base = require('@devoinc/applications-builder/mixins/base');
  let self = {
    id: 'stackedBarWidget',
    el: $('#stackedBarWidget'),
    settings: {},
  };
  let baseMxi = base.default(self);
  self.graphic = {
    style: {
      display: null,
    },
  };
  let stub = global.stub;
  let spy = sinon.spy();
  baseMxi.hideLoading = spy;
  baseMxi.debugError();

  let container = $(self.el).find('.lt-vapp-widget-graphic');
  expect(self.visible).toBe(false);
  expect(container[0].innerHTML).toBe(
    '<div class="widgetError">\
<span class="lticon-information_about"></span><span>NO DATA</span></div>'
  );
  sinon.assert.calledOnce(stub);
  sinon.assert.calledWith(stub, `${self.id} -> No data`);
  sinon.assert.calledOnce(spy);
});

test('should log warn to console and call drawError with the message, and \
hideLoading when debugError is called with params', () => {
  const base = require('@devoinc/applications-builder/mixins/base');

  let self = {
    id: 'stackedBarWidget',
    el: $('#stackedBarWidget'),
    settings: {},
  };
  let baseMxi = base.default(self);
  self.graphic = {
    style: {
      display: null,
    },
  };
  let stub = global.stub;
  let spy = sinon.spy();
  baseMxi.hideLoading = spy;
  baseMxi.debugError();

  let container = $(self.el).find('.lt-vapp-widget-graphic');
  expect(self.visible).toBe(false);
  expect(container[0].innerHTML).toBe(
    '<div class="widgetError">\
<span class="lticon-information_about"></span><span>NO DATA</span></div>'
  );
  sinon.assert.calledOnce(stub);
  sinon.assert.calledWith(stub, `${self.id} -> No data`);
  sinon.assert.calledOnce(spy);
});
