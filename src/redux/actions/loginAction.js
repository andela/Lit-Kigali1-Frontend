import { SUBMIT_LOGIN_FORM, LOGIN_SUCCESS, LOGIN_FAILURE } from '../actions-types';

export const submitLoginForm = data => ({
  type: SUBMIT_LOGIN_FORM,
  payload: data,
});

export const loginSuccess = data => ({
  type: LOGIN_SUCCESS,
  payload: data,
});

export const loginFailure = data => ({
  type: LOGIN_FAILURE,
  payload: data,
});
