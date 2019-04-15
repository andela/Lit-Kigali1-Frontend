import currentUserReducer from '../../redux/reducers/currentUserReducer';
import { SET_CURRENT_USER } from '../../redux/actions-types/currentUserTypes';
import { signupUser } from '../../__mocks__/dummyData';

describe('Current User Reducer', () => {
  test('should return filed and its value', () => {
    const action = {
      type: SET_CURRENT_USER,
      payload: {
        ...signupUser,
      },
    };
    const res = currentUserReducer({}, action);
    expect(res.profile).toEqual(action.payload);
    expect(res.isLoggedIn).toEqual(true);
  });
});
