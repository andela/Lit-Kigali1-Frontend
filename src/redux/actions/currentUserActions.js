import { SET_CURRENT_USER } from '../actions-types/currentUserTypes';

export const setUserProfile = payload => ({
  type: SET_CURRENT_USER,
  payload,
});
