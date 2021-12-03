import objects from '@devo/applications-builder/utils/objects';

describe('Objects:', () => {
  test('Set a value to an object on path that not exists', () => {
    expect(objects.set({}, 'lvl1.lvl2.lvl3', 'test')).toEqual({
      lvl1: { lvl2: { lvl3: 'test' } },
    });
  });

  test('Set a value to an object on path at level 1', () => {
    expect(objects.set({}, 'lvl1', 'test')).toEqual({ lvl1: 'test' });
  });

  test('Set a value to an object using an array as path', () => {
    expect(objects.set({}, ['lvl1', 'lvl2', 'lvl3'], 'test')).toEqual({
      lvl1: { lvl2: { lvl3: 'test' } },
    });
  });

  test('Get a value from object at level 3', () => {
    expect(
      objects.get(
        { lvl1: { lvl2: { lvl3: 'test' } } },
        'lvl1.lvl2.lvl3',
        'default'
      )
    ).toBe('test');
  });

  test('Get a value from object at level 3 that not exists', () => {
    expect(objects.get({ lvl1: 'test' }, 'lvl1.lvl2.lvl3', 'default')).toBe(
      'default'
    );
  });
});
