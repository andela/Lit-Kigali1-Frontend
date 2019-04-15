import reducer from '../../redux/reducers/userReducer';
import { SET_PROFILE } from '../../redux/actions-types/userTypes';
import { signupUser } from '../../__mocks__/dummyData';
import store from '../../redux/store';

describe('reducerReducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(store.getState().user);
  });

  it("should handle user' login", () => {
    const action = {
      type: SET_PROFILE,
      payload: signupUser,
    };
    const expected = {
      profile: { ...signupUser },
      articles: [],
      favorites: [],
    };
    expect(reducer(undefined, action)).toEqual({
      ...expected,
    });
  });
});
