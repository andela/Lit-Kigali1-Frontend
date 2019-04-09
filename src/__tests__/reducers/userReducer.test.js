import reducer from '../../redux/reducers/userReducer';
import { SET_PROFILE } from '../../redux/actions-types/userTypes';
import { signupUser } from '../../__mocks__/dummyData';
import store from '../../redux/store';

describe('userReducer', () => {
  it('should return the initial `state`', () => {
    expect(reducer(undefined, {})).toEqual(store.getState().user);
  });

  it('should handle `SET_PROFILE`', () => {
    const expectedState = {
      type: SET_PROFILE,
      payload: signupUser,
    };
    expect(reducer({}, expectedState)).toEqual({
      profile: signupUser,
    });
  });
});
