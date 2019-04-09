import { inputHandler } from '../../redux/actions/loginActions';
import { HANDLE_LOGIN_INPUT } from '../../redux/actions-types/loginTypes';

describe('Login Actions', () => {
  test('should return filed and its value', () => {
    const expectedAction = {
      type: HANDLE_LOGIN_INPUT,
      payload: {
        field: 'username',
        value: 'John',
      },
    };
    expect(inputHandler({ field: 'username', value: 'John' })).toEqual(expectedAction);
  });
});
