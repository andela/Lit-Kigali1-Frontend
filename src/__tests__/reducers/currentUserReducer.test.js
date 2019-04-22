import reducer from '../../redux/reducers/currentUserReducer';
import {
  SET_CURRENT_USER,
  SET_CURRENT_USER_FOLLOWING,
  SET_USER_ACTION_SUCCESS,
  SET_USER_ACTION_FAILURE,
  HANDLE_PROFILE_INPUT,
  SUBMIT_PROFILE_FORM,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILURE,
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

  it('should handle `HANDLE_PROFILE_INPUT`', () => {
    const expectedState = {
      type: HANDLE_PROFILE_INPUT,
      payload: true,
    };
    expect(reducer({}, expectedState)).toEqual({ profile: { undefined } });
  });

  it('should handle `SUBMIT_PROFILE_FORM`', () => {
    const expectedState = {
      type: SUBMIT_PROFILE_FORM,
      payload: true,
    };
    expect(reducer({}, expectedState)).toEqual({ loading: true });
  });

  it('should handle `UPDATE_PROFILE_SUCCESS,` ', () => {
    const expectedState = {
      type: UPDATE_PROFILE_SUCCESS,
      payload: true,
    };
    expect(reducer({}, expectedState)).toEqual({ profile: {}, message: undefined, loading: false });
  });

  it('should hande ``', () => {
    const expectedState = {
      type: UPDATE_PROFILE_FAILURE,
      payload: true,
    };
    expect(reducer({}, expectedState)).toEqual({
      message: 'Failed To Edit Your Profile',
      loading: false,
    });
  });
});
