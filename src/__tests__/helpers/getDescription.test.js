import getDescription from '../../helpers/getDescription';
import { draftjsBody } from '../../__mocks__/dummyData';

describe('Get Description', () => {
  test('should return description', () => {
    const description = getDescription(draftjsBody);
    expect(description.length).toEqual(500);
  });
});
