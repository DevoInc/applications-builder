describe('I18n:', () => {
  global.requesito = require('../requesito').default;

  let i18n = require('@devo/applications-builder/i18n').i18n;

  test('Translate default string to Spanish as global forced language', () => {
    i18n.setLang('es_ES');
    expect(i18n.trans('FROM')).toBe('DESDE');
  });

  test('Translate a default string to Spanish as param language', () => {
    expect(i18n.trans('FROM', 'es_ES')).toBe('DESDE');
  });

  test('Translate a custom string to Spanish as param language', () => {
    i18n.addLocale('es_ES', { Test: 'Prueba' });
    expect(i18n.trans('Test', 'es_ES')).toBe('Prueba');
  });

  test('Translate a inexisting string to Spanish as param language', () => {
    expect(i18n.trans('Test AABB', 'es_ES')).toBe('Test AABB');
  });

  i18n.addLocale('es_ES', { 'A & < > " \' B': 'OK' });
  test('Translate special characters to Spanish as param language', () => {
    expect(i18n.trans('A & < > " \' B', 'es_ES')).toBe('OK');
  });
});
