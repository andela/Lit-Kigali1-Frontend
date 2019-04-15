import reducer from '../../redux/reducers/currentUserReducer';
import {
  SET_CURRENT_USER,
  SET_CURRENT_USER_FOLLOWING,
  SET_USER_ACTION_SUCCESS,
  SET_USER_ACTION_FAILURE,
} from '../../redux/actions-types/currentUserTypes';
import { signupUser } from '../../__mocks__/dummyData';
import store from '../../redux/store';

describe('currentUserReducer', () => {
  it('should return the initial `state`', () => {
    expect(reducer(undefined, {})).toEqual(store.getState().currentUser);
  });

  it('should handle `SET_CURRENT_USER`', () => {
    const expectedState = {
      type: SET_CURRENT_USER,
      payload: signupUser,
    };
    expect(reducer({}, expectedState)).toEqual({
      isLoggedIn: true,
      profile: signupUser,
    });
  });

  it('should handle `SET_USER_ACTION_FAILURE`', () => {
    const expectedState = {
      type: SET_USER_ACTION_FAILURE,
      payload: 'FAILED',
    };
    expect(reducer({}, expectedState)).toEqual({
      message: 'FAILED',
      success: false,
      loading: false,
    });
  });

  it('should handle `SET_USER_ACTION_SUCCESS`', () => {
    const expectedState = {
      type: SET_USER_ACTION_SUCCESS,
      payload: 'SUCCESS',
    };
    expect(reducer({}, expectedState)).toEqual({
      message: 'SUCCESS',
      success: true,
      loading: false,
    });
  });

  it('should handle `SET_CURRENT_USER_FOLLOWING`', () => {
    const expectedState = {
      type: SET_CURRENT_USER_FOLLOWING,
      payload: true,
    };
    expect(reducer({}, expectedState)).toEqual({
      following: true,
    });
  });
});
