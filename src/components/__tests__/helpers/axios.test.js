import axios from '../../../helpers/axios';

describe('axios', () => {
  test('should not have authorization header', () => {
    expect(axios.defaults.headers.authorization).toBe(undefined);
  });
});
