import * as userActions from '../../../redux/actions/userActions';
import { signupUser } from '../../../__mocks__/dummyData';
import { LOGIN } from '../../../redux/actions-types';

describe('userActions', () => {
  test("should update user's data", () => {
    const expectedAction = {
      type: LOGIN,
      payload: signupUser,
    };
    expect(userActions.login(signupUser)).toEqual(expectedAction);
  });
});
