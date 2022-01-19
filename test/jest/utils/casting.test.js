import casting from '@devo/applications-builder/utils/casting';

var items = [
  { key: 'test1', value: 8 },
  { key: 'test2', value: 9 },
  { key: 'test3', value: 12 },
];

describe('Casting:', () => {
  test('Array to Object casting', () => {
    let tmp = casting.arrayToObject(items, 'key');
    expect(tmp.test1.value).toBe(8);
    expect(tmp.test2.value).toBe(9);
    expect(tmp.test3.value).toBe(12);
  });
});
