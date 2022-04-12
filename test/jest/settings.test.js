import '@babel/polyfill';
import sinon from 'sinon';
import template from './template';
import DataTree from '@devoinc/applications-builder/data/dataTree';
import requesito from './requesito';

beforeEach(() => {
  let $ = (window.jQuery = window.$ = require('jquery'));
  document.body.innerHTML = template;
  global.stub = sinon.stub(console, 'error');
  global.requesito = requesito;
  global.Settings = require('@devoinc/applications-builder/Settings').default;
});
afterEach(() => {
  window.jQuery = undefined;
  window.$ = undefined;
  global.Settings = undefined;
  global.stub.restore();
  global.stub = undefined;
});

describe('Global Settings Tests: ', () => {
  test('should exist', () => {
    let settings = new global.Settings();
    expect(settings).toBeDefined();
  });

  describe('Settings creation', () => {
    beforeEach(() => {
      global.listenerStub = sinon.stub(
        global.Settings.prototype,
        'setListeners'
      );
    });
    afterEach(() => {
      global.listenerStub.restore();
      global.listenerStub = undefined;
    });
    test('Should set default properties on creation without params', () => {
      let settings = new global.Settings();
      expect(settings.data).toBe(DataTree.root);
      expect(settings.btn).toBe(document.querySelector('.va-menu-trigger'));
      expect(settings.panel).toBe(document.querySelector('.lt-vapp-config'));
      expect(settings.overlay).toBe(document.querySelector('.lt-vapp-overlay'));
      expect(settings.btnUpdate).toBe(
        document.querySelectorAll('.lt-vapp-config-update')
      );
      expect(settings.btnCancels).toBe(
        document.querySelectorAll('.lt-vapp-config-close')
      );
      expect(settings.settings).toEqual({
        panel: { trans: { effect: 'slide', duration: 300 } },
        overlay: { trans: { effect: 'fade', duration: 100 } },
      });
      expect(settings.settings).toEqual(settings.settings);
      expect(settings.options).toEqual([]);
      sinon.assert.calledOnce(global.listenerStub);
    });

    test('Should set custom properties on creation with params', () => {
      let customSettings = { test: test };
      let defaultSettings = {
        panel: { trans: { effect: 'slide', duration: 300 } },
        overlay: { trans: { effect: 'fade', duration: 100 } },
      };
      let combinedSettings = Object.assign(defaultSettings, customSettings);

      let settings = new global.Settings(customSettings);

      expect(settings.data).toBe(DataTree.root);
      expect(settings.btn).toBe(document.querySelector('.va-menu-trigger'));
      expect(settings.panel).toBe(document.querySelector('.lt-vapp-config'));
      expect(settings.overlay).toBe(document.querySelector('.lt-vapp-overlay'));

      expect(settings.btnUpdate).toBe(
        document.querySelectorAll('.lt-vapp-config-update')
      );
      expect(settings.btnCancels).toBe(
        document.querySelectorAll('.lt-vapp-config-close')
      );
      expect(settings.settings).toEqual(combinedSettings);
      expect(settings.options).toEqual([]);
      sinon.assert.calledOnce(global.listenerStub);
    });
  });

  describe('Settings methods test', () => {
    test('Should set listeners when set listeners is called', () => {
      let saveStub = sinon.stub(global.Settings.prototype, 'save');
      let cancelStub = sinon.stub(global.Settings.prototype, 'cancel');
      let openStub = sinon.stub(global.Settings.prototype, 'open');
      let settings = new global.Settings();
      settings.btnUpdate[0].click();
      sinon.assert.calledOnce(saveStub);
      settings.btnCancels[0].click();
      sinon.assert.calledOnce(cancelStub);
      settings.overlay.click();
      sinon.assert.calledTwice(cancelStub);
      settings.btn.click();
      sinon.assert.calledOnce(openStub);
      saveStub.restore();
      cancelStub.restore();
      openStub.restore();
      saveStub = undefined;
      cancelStub = undefined;
      openStub = undefined;
    });

    test('Should add option when addOptions is called', () => {
      let settings = new global.Settings();
      expect(settings.options).toEqual([]);
      settings.addOption({});
      expect(settings.options).toHaveLength(1);
    });
    test('Should save options when save is called', () => {
      let settings = new global.Settings();
      expect(settings.options).toEqual([]);
      const fakeOption = {
        save: sinon.spy(),
      };
      settings.addOption(fakeOption);
      settings.save();
      sinon.assert.calledOnce(fakeOption.save);
    });

    test('Should restore the settings when cancel is called', () => {
      let closeStub = sinon.stub(global.Settings.prototype, 'close');

      let settings = new global.Settings();
      expect(settings.options).toEqual([]);
      const fakeOption = {
        restore: sinon.spy(),
      };
      settings.addOption(fakeOption);
      settings.cancel();
      sinon.assert.calledOnce(fakeOption.restore);
      sinon.assert.calledOnce(closeStub);
      closeStub.restore();
    });

    test(`Should close the settings when toggle is called and settings
      are open`, () => {
      let closeStub = sinon.stub(global.Settings.prototype, 'close');

      let settings = new global.Settings();
      settings.panel.classList.remove('closed');
      settings.toggle();
      sinon.assert.calledOnce(closeStub);
      closeStub.restore();
    });

    test(`Should open the settings when toggle is called and settings
      are closed`, () => {
      let openStub = sinon.stub(global.Settings.prototype, 'open');

      let settings = new global.Settings();
      settings.panel.classList.add('closed');
      settings.toggle();
      sinon.assert.calledOnce(openStub);
      openStub.restore();
    });

    test(`Should return false when panel is open and true when panel is closed`, () => {
      let settings = new global.Settings();
      expect(settings.isClosed()).toEqual(true);
      settings.open();
      expect(settings.isClosed()).toEqual(false);
      settings.close();
      expect(settings.isClosed()).toEqual(true);
    });
  });
});
