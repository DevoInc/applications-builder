import '@babel/polyfill';
import sinon from 'sinon';
import template from '../template';

const options = {};
const requesito = {
  require: () => {},
};

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
  const collapser = require('@devoinc/applications-builder/mixins/collapser');
  expect(collapser).toBeDefined();
});

test('should return null if self.el is null', () => {
  const collapser = require('@devoinc/applications-builder/mixins/collapser');
  let self = {
    el: null,
  };

  let collapserMxi = collapser.default(self);
  expect(collapserMxi).toBeNull();
});

test('should initialize the mixin right', () => {
  const collapser = require('@devoinc/applications-builder/mixins/collapser');
  let self = {
    el: document.querySelector('.lt-vapp-widget-options'),
  };
  let collapserMxi = collapser.default(self);
  expect(self.isCollapsed).toBe(false);
  expect(self.btnCollapser.outerHTML).toBe(
    `<span class="lt-vapp-widget-collapser lticon-vapp_expand"></span>`
  );
});

test('should change the collapsed status when button is clicked', () => {
  const collapser = require('@devoinc/applications-builder/mixins/collapser');
  let self = {
    el: document.querySelector('.lt-vapp-widget-options'),
  };
  let collapserMxi = collapser.default(self);
  expect(self.isCollapsed).toBe(false);
  self.btnCollapser.dispatchEvent(new MouseEvent('click'));
  expect(self.isCollapsed).toBe(true);
  self.btnCollapser.dispatchEvent(new MouseEvent('click'));
  expect(self.isCollapsed).toBe(false);
});

test('should call collapse function when button is clicked and element is expanded', () => {
  const collapser = require('@devoinc/applications-builder/mixins/collapser');
  let self = {
    el: document.querySelector('.lt-vapp-widget-options'),
  };
  let collapserMxi = collapser.default(self);
  expect(self.isCollapsed).toBe(false);
  self.btnCollapser.dispatchEvent(new MouseEvent('click'));
  expect(self.isCollapsed).toBe(true);
  expect(self.btnCollapser.className.indexOf('active')).toBeGreaterThan(0);
});

test('should call collapse function when button is clicked and element is expanded', () => {
  const collapser = require('@devoinc/applications-builder/mixins/collapser');
  let self = {
    el: document.querySelector('.lt-vapp-widget-options'),
  };
  let collapserMxi = collapser.default(self);
  expect(self.isCollapsed).toBe(false);
  self.btnCollapser.dispatchEvent(new MouseEvent('click'));
  expect(self.isCollapsed).toBe(true);
  expect(self.btnCollapser.className.indexOf('active')).toBeGreaterThan(0);
});

test('should call expand function when button is clicked and element is expanded', () => {
  const collapser = require('@devoinc/applications-builder/mixins/collapser');
  let self = {
    el: document.querySelector('.lt-vapp-widget-options'),
  };
  let collapserMxi = collapser.default(self);
  self.isCollapsed = true;
  self.btnCollapser.dispatchEvent(new MouseEvent('click'));
  expect(self.isCollapsed).toBe(false);
  expect(self.btnCollapser.className.indexOf('active')).toBe(-1);
});
