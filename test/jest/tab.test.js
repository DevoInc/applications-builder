import '@babel/polyfill';
import sinon from 'sinon';
import template from './template';
import DataNode from '@devo/applications-builder/data/DataNode';
import { SIGINT } from 'constants';
jest.mock('@devo/applications-builder/utils/scroll');
import scroll from '@devo/applications-builder/utils/scroll';

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

describe('Global Tab Tests: ', () => {
  test('should exist', () => {
    const Tab = require('@devo/applications-builder/Tab');
    expect(Tab).toBeDefined();
  });

  test(`Should create a new tab with default settings when is called only
  with an HTML id selector`, () => {
    const Tab = require('@devo/applications-builder/Tab').default;
    let tab = new Tab('main1');
    let data = new DataNode('main1');
    expect(Array.isArray(tab.sections)).toBeTruthy();
    expect(tab.sections.length).toBe(0);
    expect(tab.settings.loadOnDemand).toBe(false);
    expect(tab.stats.show).toBe(0);
  });

  test(`Should throw an error when no HTML id is provided`, () => {
    const Tab = require('@devo/applications-builder/Tab').default;
    let tab = new Tab('main17');
    tab.init();
    sinon.assert.calledWith(stub, `Tab "main17" does not exists on HTML.`);
  });

  test(`Should initialize the tab when init is called`, () => {
    const initSubmenuSpy = sinon.spy();
    const addListenersSpy = sinon.spy();
    const Tab = require('@devo/applications-builder/Tab').default;
    const initSubMenu = Tab.prototype._initSubMenu;
    const addListeners = Tab.prototype._addListeners;
    Tab.prototype._initSubMenu = initSubmenuSpy;
    Tab.prototype._addListeners = addListenersSpy;
    let id = 'main1';
    let tab = new Tab(id);
    let data = new DataNode(id);
    let vapp = document.querySelector('.lt-vapp');
    let tabEl = vapp.querySelector(`li[main="${id}"]`);
    tab.init();
    expect(Array.isArray(tab.sections)).toBeTruthy();
    expect(tab.sections.length).toBe(0);
    expect(tab.settings.loadOnDemand).toBe(false);
    expect(tab.stats.show).toBe(0);
    expect(tab.data).toEqual(data);
    expect(tab.vapp).toBe(vapp);
    expect(tab.selector).toBe(tabEl);
    sinon.assert.calledOnce(initSubmenuSpy);
    sinon.assert.calledOnce(addListenersSpy);
    Tab.prototype._initSubMenu = initSubMenu;
    Tab.prototype._addListeners = addListeners;
  });

  test(`Should init child sections when init is called`, () => {
    const initSectionSpy = sinon.spy();
    const Tab = require('@devo/applications-builder/Tab').default;
    const Section = require('@devo/applications-builder/Section').default;
    Section.prototype.init = initSectionSpy;
    let tab = new Tab('main1');
    tab.addSection(new Section('section11'));
    tab.addSection(new Section('section12'));
    tab.init();
    expect(Array.isArray(tab.sections)).toBeTruthy();
    expect(tab.sections.length).toBe(2);
    expect(tab.settings.loadOnDemand).toBe(false);
    expect(tab.stats.show).toBe(0);

    sinon.assert.calledTwice(initSectionSpy);
  });

  test(`Should add event listeners to tab and its sections when
addListeners is called`, () => {
    const selectSpy = sinon.spy();
    const Tab = require('@devo/applications-builder/Tab').default;
    const select = Tab.prototype.select;
    Tab.prototype.select = selectSpy;
    const Section = require('@devo/applications-builder/Section').default;
    let tab = new Tab('main1');
    tab.addSection(new Section('section11'));
    tab.init();
    expect(Array.isArray(tab.sections)).toBeTruthy();
    expect(tab.sections.length).toBe(1);
    expect(tab.settings.loadOnDemand).toBe(false);
    expect(tab.stats.show).toBe(0);
    tab.selector.dispatchEvent(new MouseEvent('click'));
    sinon.assert.calledOnce(selectSpy);
    Tab.prototype.select = select;
  });

  test(`Should init submenus`, () => {
    const Tab = require('@devo/applications-builder/Tab').default;
    let tab = new Tab('main5');
    tab.init();
    let selector = tab.selector;
    expect(selector.classList.contains('hasMenu')).toBe(true);
    expect(Array.isArray(tab.sections)).toBeTruthy();
    expect(tab.sections.length).toBe(0);
    expect(tab.settings.loadOnDemand).toBe(false);
    expect(tab.stats.show).toBe(0);
  });

  test(`Should set transition options when setTransitions is called`, () => {
    const Tab = require('@devo/applications-builder/Tab').default;
    let tab = new Tab('main1');
    tab.setTransition('test');
    expect(tab.trans).toBe('test');
  });

  test(`Should scroll to section when toSection is call`, () => {
    const closeSubmenuSpy = sinon.spy();
    const scrollToElementStub = sinon.stub(scroll, 'scrollToElement');

    const Tab = require('@devo/applications-builder/Tab').default;
    const closeSubmenu = Tab.prototype.closeSubmenu;
    Tab.prototype.closeSubmenu = closeSubmenuSpy;
    let tab = new Tab('main1');

    const sectionId = 'section11';
    tab.toSection($(`<li section="${sectionId}">Tab1}</li>`)[0]);
    sinon.assert.calledOnce(closeSubmenuSpy);
    sinon.assert.calledWith(scrollToElementStub, `#${sectionId}`, 300, 90);
    Tab.prototype.closeSubmenu = closeSubmenu;
  });

  test(`Should close submenu when closeSubmenu is called`, () => {
    const Tab = require('@devo/applications-builder/Tab').default;
    let tab = new Tab('main1');
    tab.init();
    tab.selector.classList.add('scroll-menu-open');
    tab.selector.classList.add('hasMenuOpen');
    tab.closeSubmenu();
    expect(tab.selector.classList.contains('scroll-menu-open')).toBeFalsy();
    expect(tab.selector.classList.contains('hasMenuOpen')).toBeFalsy();
  });

  test(`Should refresh the tab and its sections when tab is active and refresh is called`, () => {
    const Tab = require('@devo/applications-builder/Tab').default;
    const Section = require('@devo/applications-builder/Section').default;
    const sectionRefreshSpy = sinon.spy();
    Section.prototype.refresh = sectionRefreshSpy;
    let tab = new Tab('main1');
    tab.init();
    tab.addSection(new Section('section11'));
    tab.addSection(new Section('section12'));
    tab.selector.classList.add('active');

    tab.refresh();
    sinon.assert.calledTwice(sectionRefreshSpy);
  });

  test(`Should do nothing when refresh is called and the tab is not active`, () => {
    const Tab = require('@devo/applications-builder/Tab').default;
    const Section = require('@devo/applications-builder/Section').default;
    const sectionRefreshSpy = sinon.spy();
    Section.prototype.refresh = sectionRefreshSpy;
    let tab = new Tab('main1');
    tab.init();
    tab.addSection(new Section('section11'));
    tab.addSection(new Section('section12'));

    tab.selector.classList.remove('active');

    tab.refresh();
    sinon.assert.notCalled(sectionRefreshSpy);
  });

  test(`Should hide sections when unselect is called`, () => {
    const Tab = require('@devo/applications-builder/Tab').default;
    const closeSubmenu = Tab.prototype.closeSubmenu;
    const closeSubmenuSpy = sinon.spy();
    Tab.prototype.closeSubmenu = closeSubmenuSpy;
    const Section = require('@devo/applications-builder/Section').default;
    const sectionhideSpy = sinon.spy();
    Section.prototype.hide = sectionhideSpy;
    let tab = new Tab('main1');
    tab.init();
    tab.addSection(new Section('section11'));
    tab.addSection(new Section('section12'));

    tab.selector.classList.add('active');
    tab.trans = {};
    tab.unselect();
    sinon.assert.calledTwice(sectionhideSpy);
    sinon.assert.calledOnce(closeSubmenuSpy);
    expect(tab.selector.classList.contains('active')).toBeFalsy();

    Tab.prototype.closeSubmenu = closeSubmenu;
  });

  test(`Should init submenus if the selector has submenu`, () => {
    const Tab = require('@devo/applications-builder/Tab').default;
    let tab = new Tab('main5');
    tab.init();
    tab._initSubMenu();
    expect(tab.selector.classList.contains('hasMenu')).toBeTruthy();
  });

  test(`Should not init submenus if the selector  does not have submenu`, () => {
    const Tab = require('@devo/applications-builder/Tab').default;
    let tab = new Tab('main1');
    tab.init();
    tab._initSubMenu();
    expect(tab.selector.classList.contains('hasMenu')).toBeFalsy();
  });
});
