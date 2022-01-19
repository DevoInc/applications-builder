import '@babel/polyfill';
import sinon from 'sinon';
import template from './template';
import DataNode from '@devo/applications-builder/data/DataNode';

beforeEach(() => {
  let $ = (window.jQuery = window.$ = require('jquery'));
  document.body.innerHTML = template;
  global.stub = sinon.stub(console, 'error');
});
afterEach(() => {
  window.jQuery = undefined;
  window.$ = undefined;
  global.stub.restore();
  global.stub = undefined;
});

describe('Global Section Tests: ', () => {
  test('should exist', () => {
    const Section = require('@devo/applications-builder/Section');
    expect(Section).toBeDefined();
  });

  test(`Should create a new section with default settings when is called only
  with an HTML id selector`, () => {
    const Section = require('@devo/applications-builder/Section').default;
    let section = new Section('section11');
    let data = new DataNode('section11');
    expect(Array.isArray(section.widgets)).toBeTruthy();
    expect(section.widgets.length).toBe(0);
    expect(section.status).toBe('expanded');
    expect(section.settings.hidden).toBe(false);
  });

  test(`Should initialize the section when init is called`, () => {
    const Section = require('@devo/applications-builder/Section').default;
    let id = 'section11';
    let section = new Section(id);
    let data = new DataNode(id);
    let vapp = document.querySelector('.lt-vapp');
    let sectionEl = vapp.querySelector(`#${id}`);
    let collapserEl = sectionEl.querySelector('.lt-vapp-section-collapser');
    section.init();
    let spy = sinon.spy();
    section.hide = spy;

    expect(Array.isArray(section.widgets)).toBeTruthy();
    expect(section.widgets.length).toBe(0);
    expect(section.status).toBe('expanded');
    expect(section.settings.hidden).toBe(false);
    expect(section.data).toEqual(data);
    expect(section.vapp).toBe(vapp);
    expect(section.section).toBe(sectionEl);
    expect(section.collapser).toBe(collapserEl);
    sinon.assert.notCalled(spy);
  });

  // DISABLED FOR NOW
  test(`Should throw an error if section has been created with wrong id`, () => {
    const Section = require('@devo/applications-builder/Section').default;
    let id = 's';
    let section = new Section(id);

    let stub = global.stub;
    section.init();
    sinon.assert.calledOnce(stub);
    sinon.assert.calledWith(
      stub,
      `The section 's' does not exist in the index.html`.replace(/\n/gm, '')
    );
  });

  test('Should collapse when toggle is called and section is expanded', () => {
    const Section = require('@devo/applications-builder/Section').default;
    let id = 'section11';
    let section = new Section(id);
    section.init();

    expect(section.status).toBe('expanded');
    section.toggle();
    expect(section.status).toBe('collapsed');
  });

  test('Should show section when show function es called', () => {
    const Section = require('@devo/applications-builder/Section').default;
    let id = 'section11';
    let section = new Section(id);
    section.init();
    section.collapse();
    let stub = sinon.stub($.fn, 'show');

    section.show();
    expect(section.settings.hidden).toBe(false);
    sinon.assert.calledOnce(stub);
  });
});
