import units from '@devoinc/applications-builder/utils/units';

describe('Units:', () => {
  test('Pass from bytes to the best unit for visualize', () => {
    let tmp = units.bytesToByteBaseSize(254448751, 2);
    expect(tmp).toBe('242.66 MB');
  });
});
