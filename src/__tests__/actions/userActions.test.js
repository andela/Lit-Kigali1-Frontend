import * as userActions from '../../redux/actions/userActions';
import { signupUser } from '../../__mocks__/dummyData';
import { SET_PROFILE } from '../../redux/actions-types/userTypes';

describe('userActions', () => {
  test("should update user's data", () => {
    const expectedAction = {
      type: SET_PROFILE,
      payload: signupUser,
    };
    expect(userActions.setUserProfile(signupUser)).toEqual(expectedAction);
  });
});
