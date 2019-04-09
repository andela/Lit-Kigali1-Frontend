import { SET_CURRENT_USER } from '../actions-types/currentUserTypes';

export const setCurrentUser = payload => ({
  type: SET_CURRENT_USER,
  payload,
});
