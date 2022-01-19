import '@babel/polyfill';
import sinon from 'sinon';
import template from '../template';
import requesito from '../requesito';

const options = {};

beforeEach(() => {
  let $ = (window.jQuery = window.$ = require('jquery'));
  document.body.innerHTML = template;
  global.stub = sinon.stub(console, 'warn');
  global.requesito = requesito;
});

afterEach(() => {
  window.jQuery = undefined;
  window.$ = undefined;
  global.stub.restore();
  global.stub = undefined;
});

test('should exist', () => {
  const showquery = require('@devo/applications-builder/mixins/showquery');
  expect(showquery).toBeDefined();
});

test('should return null if self.el is null', () => {
  const showquery = require('@devo/applications-builder/mixins/showquery');

  let self = {
    el: null,
  };

  let showqueryMxi = showquery.default(self);
  expect(showqueryMxi).toBeNull();
});

test('should initialize the mixin right', () => {
  const showquery = require('@devo/applications-builder/mixins/showquery');
  let self = {
    el: document.querySelector('.lt-vapp-widget-options'),
  };
  let showqueryMxi = showquery.default(self);
  expect(showqueryMxi).toMatchObject({});
});

test('should open a modal when is clicked', () => {
  const showquery = require('@devo/applications-builder/mixins/collapser');
  let self = {
    el: document.querySelector('.lt-vapp-widget-options'),
  };
  let showqueryMxi = showquery.default(self);
  expect(showquery).toBeDefined();
  let btn = document.querySelector('.lt-vapp-widget-showquery');
  expect(btn).not.toBe(null);
  btn.dispatchEvent(new MouseEvent('click'));
});
