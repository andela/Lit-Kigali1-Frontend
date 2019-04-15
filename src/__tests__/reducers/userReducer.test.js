import reducer from '../../redux/reducers/userReducer';
import {
  CLEAR_USER_PROFILE,
  SET_USER_PROFILE,
  SET_USER_FOLLOWED,
  SET_LOADING_PROFILE,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAILURE,
} from '../../redux/actions-types/userTypes';
import { signupUser } from '../../__mocks__/dummyData';
import store from '../../redux/store';

describe('userReducer', () => {
  it('should return the initial `state`', () => {
    expect(reducer(undefined, {})).toEqual(store.getState().user);
  });

  it('should handle `SET_USER_PROFILE`', () => {
    const expectedState = {
      type: SET_USER_PROFILE,
      payload: signupUser,
    };
    expect(reducer({}, expectedState)).toEqual({
      loading: false,
      profile: signupUser,
    });
  });

  it('should handle `SET_LOADING_PROFILE`', () => {
    const expectedState = {
      type: SET_LOADING_PROFILE,
      payload: true,
    };
    expect(reducer({}, expectedState)).toEqual({
      loading: true,
    });
  });

  it('should handle `SET_USER_FOLLOWED`', () => {
    const expectedState = {
      type: SET_USER_FOLLOWED,
      payload: {
        followers: 1,
        followees: 2,
        followed: true,
      },
    };
    expect(reducer({}, expectedState)).toEqual({
      profile: expectedState.payload,
    });
  });

  it('should handle `FETCH_PROFILE_FAILURE`', () => {
    const expectedState = {
      type: FETCH_PROFILE_FAILURE,
      payload: 'FAILURE',
    };
    expect(reducer({}, expectedState)).toEqual({
      success: false,
      message: 'FAILURE',
    });
  });

  it('should handle `FETCH_PROFILE_SUCCESS`', () => {
    const expectedState = {
      type: FETCH_PROFILE_SUCCESS,
      payload: true,
    };
    expect(reducer({}, expectedState)).toEqual({});
  });

  it('should handle `CLEAR_USER_PROFILE`', () => {
    const expectedState = {
      type: CLEAR_USER_PROFILE,
      payload: true,
    };
    expect(reducer({}, expectedState)).toEqual(store.getState().user);
  });
});
