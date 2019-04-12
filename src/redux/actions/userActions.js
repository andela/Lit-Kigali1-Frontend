import {
  CLEAR_USER_PROFILE,
  SET_USER_PROFILE,
  SET_USER_FOLLOWED,
  SET_LOADING_PROFILE,
  FETCH_PROFILE_FAILURE,
} from '../actions-types/userTypes';
import fetchAPI from '../../helpers/fetchAPI';

export const clearUserProfile = () => ({
  type: CLEAR_USER_PROFILE,
});

export const setProfileLoading = payload => ({
  type: SET_LOADING_PROFILE,
  payload,
});

export const setUserProfile = payload => ({
  type: SET_USER_PROFILE,
  payload,
});

export const setUserFollow = payload => ({
  type: SET_USER_FOLLOWED,
  payload,
});

export const fetchUserProfileFailure = payload => ({
  type: FETCH_PROFILE_FAILURE,
  payload,
});

export const fetchUserProfile = username => (dispatch) => {
  dispatch(setProfileLoading(true));
  return fetchAPI(`/profiles/${username}`, { method: 'GET' })
    .then((data) => {
      dispatch(setUserProfile(data.user));
      return data;
    })
    .catch((err) => {
      dispatch(fetchUserProfileFailure(err.message));
      return err;
    });
};
