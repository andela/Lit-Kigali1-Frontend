import reducer from '../../redux/reducers/currentUserReducer';
import {
  SET_CURRENT_USER,
  SET_CURRENT_USER_FOLLOWING,
  SET_USER_ACTION_SUCCESS,
  SET_USER_ACTION_FAILURE,
  SET_CURRENT_USER_DELETING_ARTICLE,
  DELETE_CURRENT_USER_ARTICLE,
  SET_RATING_ARTICLE,
  SET_NEXT_PATH,
  HANDLE_PROFILE_INPUT,
  SUBMIT_PROFILE_FORM,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILURE,
  SET_NOTIFICATION,
  UPDATE_NOTIFICATION_FAILURE,
  UPDATE_NOTIFICATION_SUCCESS,
} from '../../redux/actions-types/currentUserTypes';
import { signupUser } from '../../__mocks__/dummyData';
import store from '../../redux/store';
import { currentUser as initialState } from '../../redux/initialState';

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

  it('should handle `SET_CURRENT_USER_DELETING_ARTICLE`', () => {
    const expectedState = {
      type: SET_CURRENT_USER_DELETING_ARTICLE,
      payload: true,
    };
    expect(reducer({}, expectedState)).toEqual({
      deletingArticle: true,
    });
  });

  it('should handle `DELETE_CURRENT_USER_ARTICLE`', () => {
    const expectedState = {
      type: DELETE_CURRENT_USER_ARTICLE,
      payload: { articleSlug: 'article-slug', index: 0, message: 'Deleteted successfully' },
    };
    expect(
      reducer(
        {
          ...initialState,
          profile: { articles: [{ slug: 'article-slug' }] },
        },
        expectedState,
      ),
    ).toEqual({
      ...initialState,
      profile: { articles: [{ slug: 'article-slug' }] },
    });
  });

  it('should handle `SET_RATING_ARTICLE`', () => {
    const expectedState = {
      type: SET_RATING_ARTICLE,
      payload: true,
    };
    expect(reducer({}, expectedState)).toEqual({
      rating: true,
    });
  });

  it('should handle `SET_NEXT_PATH`', () => {
    const expectedState = {
      type: SET_NEXT_PATH,
      payload: 'url',
    };
    expect(reducer({}, expectedState)).toEqual({
      nextPath: 'url',
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

  it('should handle `UPDATE_PROFILE_FAILURE`', () => {
    const expectedState = {
      type: UPDATE_PROFILE_FAILURE,
      loading: false,
    };
    expect(reducer({}, expectedState)).toEqual({ loading: false });
  });

  it('should handle `SET_NOTIFICATION`', () => {
    const expectedState = {
      type: SET_NOTIFICATION,
      payload: {
        notifications: [],
        notificationsCount: 0,
      },
    };
    expect(reducer({}, expectedState)).toEqual({
      notifications: {
        notificationList: [],
        notificationsCount: 0,
      },
    });
  });

  it('should handle `UPDATE_NOTIFICATION_SUCCESS,` ', () => {
    const expectedState = {
      type: UPDATE_NOTIFICATION_SUCCESS,
      payload: true,
    };
    expect(reducer({}, expectedState)).toEqual({
      profile: { notification: true },
      loading: false,
    });
  });

  it('should handle `UPDATE_NOTIFICATION_FAILURE`', () => {
    const expectedState = {
      type: UPDATE_NOTIFICATION_FAILURE,
      loading: false,
    };
    expect(reducer({}, expectedState)).toEqual({ loading: false });
  });
});
