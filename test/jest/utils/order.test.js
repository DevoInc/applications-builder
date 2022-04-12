import order from '@devoinc/applications-builder/utils/order';

let items = [
  { key: 'test1', value: 8 },
  { key: 'test2', value: 9 },
  { key: 'test1', value: 10 },
  { key: 'test3', value: 12 },
  { key: 'test4', value: 11 },
  { key: 'test5', value: 15 },
];

describe('Order:', () => {
  test('Order an Array with key and value field and the max numbers of elements', () => {
    let tmp = order.rankingByFloat(items, 'key', 'value', 3);
    expect(tmp.length).toBe(3);
    expect(tmp[0].key).toBe('test1');
    expect(tmp[1].key).toBe('test5');
    expect(tmp[2].key).toBe('test3');
  });
});
