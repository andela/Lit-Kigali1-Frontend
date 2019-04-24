import { entityMap1, entityMap2 } from '../../__mocks__/dummyData';
import getCover from '../../helpers/getCover';

describe('Get cover', () => {
  test('should return cover url', () => {
    const cover = getCover(entityMap1);
    expect(cover).toEqual(entityMap1[1].data.src);
  });

  test('should return no cover url', () => {
    const cover = getCover(entityMap2);
    expect(cover).toEqual(undefined);
  });
});
