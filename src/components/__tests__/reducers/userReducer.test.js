import reducer from '../../../redux/reducers/userReducer';
import { LOGIN } from '../../../redux/actions-types';
import { signupUser } from '../../../__mocks__/dummyData';
import store from '../../../redux/store';

describe('reducerReducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(store.getState().user);
  });

  it("should handle user' login", () => {
    const expectedState = {
      type: LOGIN,
      payload: signupUser,
    };
    expect(reducer({}, expectedState)).toEqual({
      user: signupUser,
    });
  });
});
