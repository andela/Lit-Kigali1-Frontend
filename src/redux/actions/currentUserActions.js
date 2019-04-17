import {
  SET_CURRENT_USER,
  SET_CURRENT_USER_FOLLOWING,
  SET_USER_ACTION_SUCCESS,
  SET_USER_ACTION_FAILURE,
  HANDLE_PROFILE_INPUT,
} from '../actions-types/currentUserTypes';
import fetchAPI from '../../helpers/fetchAPI';
import { setUserFollow } from './userActions';

export const setCurrentUser = payload => ({
  type: SET_CURRENT_USER,
  payload,
});

export const onUserActionSuccess = message => ({
  type: SET_USER_ACTION_SUCCESS,
  payload: message,
});

export const onUserActionFailure = message => ({
  type: SET_USER_ACTION_FAILURE,
  payload: message,
});

export const fetchCurrentUser = token => dispatch => fetchAPI('/user', { token })
  .then(({ user, token }) => {
    dispatch(setCurrentUser(user));
    return user;
  })
  .catch(err => dispatch(onUserActionFailure(err.message)));

export const setUserFollowing = payload => ({
  type: SET_CURRENT_USER_FOLLOWING,
  payload,
});

export const profileInputHandler = ({ field, value }) => ({
  type: HANDLE_PROFILE_INPUT,
  payload: {
    value,
    field,
  },
});

export const onFollow = ({ username, method }) => (dispatch) => {
  dispatch(setUserFollowing(true));
  return fetchAPI(`/profiles/${username}/follow`, { method })
    .then(({ message, user }) => {
      dispatch(setUserFollow(user));
      dispatch(onUserActionSuccess(message));
      dispatch(setUserFollowing(false));
      return message;
    })
    .catch(({ message }) => {
      dispatch(onUserActionFailure(message));
      dispatch(setUserFollowing(false));
      return message;
    });
};
