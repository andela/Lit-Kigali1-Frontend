import {
  SET_CURRENT_USER,
  SET_CURRENT_USER_FOLLOWING,
  SET_USER_ACTION_SUCCESS,
  SET_USER_ACTION_FAILURE,
  HANDLE_PROFILE_INPUT,
  UPDATE_PROFILE_FAILURE,
  UPDATE_PROFILE_SUCCESS,
  SUBMIT_PROFILE_FORM,
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

export const profileUpdateSuccess = ({ message, user }) => ({
  type: UPDATE_PROFILE_SUCCESS,
  payload: {
    message,
    user,
  },
});

export const profileUpdateFailure = ({ message }) => ({
  type: UPDATE_PROFILE_FAILURE,
  payload: {
    message,
  },
});

export const submitProfileForm = () => ({ type: SUBMIT_PROFILE_FORM });

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

export const updateProfile = userData => (dispatch) => {
  dispatch(submitProfileForm());
  return fetchAPI('/user', {
    method: 'PUT',
    body: {
      user: {
        ...userData,
      },
    },
  })
    .then((data) => {
      dispatch(profileUpdateSuccess(data));
      return data;
    })
    .catch(({ message }) => {
      dispatch(profileUpdateFailure({ message }));
      return message;
    });
};
