import { setCurrentUserProfile } from '../../redux/actions/currentUserActions';
import { signupUser } from '../../__mocks__/dummyData';
import { SET_CURRENT_USER } from '../../redux/actions-types/currentUserTypes';

describe('Current User Action', () => {
  test("should return current's data", () => {
    const expectedAction = {
      type: SET_CURRENT_USER,
      payload: signupUser,
    };
    expect(setCurrentUserProfile(signupUser)).toEqual(expectedAction);
  });
});
