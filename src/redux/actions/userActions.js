import { SET_PROFILE } from '../actions-types/userTypes';

export const setUserProfile = payload => ({
  type: SET_PROFILE,
  payload,
});
