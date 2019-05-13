import fetchAPI from '../../helpers/fetchAPI';
import {
  LOGIN_FAILURE,
  HANDLE_LOGIN_INPUT,
  INPUT_VALIDATION_FAILURE,
  INPUT_VALIDATION_SUCCESS,
  CLEAR_LOGIN,
  SUBMIT_LOGIN_FORM,
  SOCIAL_AUTH_SUBMIT,
  SOCIAL_AUTH_SUCCESS,
} from '../actions-types';

import { setCurrentUser, fetchNotifications } from './currentUserActions';

const API_URL = 'http://localhost:3000/api/v1';

export const clearLogin = () => ({
  type: CLEAR_LOGIN,
});

export const submitLoginForm = () => ({
  type: SUBMIT_LOGIN_FORM,
});

export const socialAuthLogin = () => ({
  type: SOCIAL_AUTH_SUBMIT,
});

export const loginUser = user => (dispatch) => {
  dispatch(submitLoginForm());
  return fetchAPI('/users/login', {
    method: 'POST',
    body: { user: { ...user } },
  })
    .then((data) => {
      dispatch(setCurrentUser(data.user));
      dispatch(clearLogin());
      localStorage.setItem('token', data.user.token);
      // dispatch(fetchNotifications(data.user.token));
      // console.log(data.user.token);
      return data;
    })
    .catch((err) => {
      dispatch({
        type: LOGIN_FAILURE,
        payload: err,
      });
      return err;
    });
};

export const inputHandler = ({ field, value }) => ({
  type: HANDLE_LOGIN_INPUT,
  payload: {
    value,
    field,
  },
});

export const validationResponse = (payload, type = INPUT_VALIDATION_FAILURE) => ({
  type,
  payload,
});

export const validateCredentials = ({ username, password }) => dispatch => new Promise((resolve) => {
  if (username.length === 0 && password.length === 0) {
    const payload = {
      response: {
        message: 'All fields are required',
      },
    };
    dispatch(validationResponse(payload));
    return resolve(payload.response);
  }
  if (username.length === 0) {
    const payload = {
      response: {
        usernameRequired: 'Required',
        message: undefined,
      },
    };
    dispatch(validationResponse(payload));
    return resolve(payload.response);
  }
  if (password.length === 0) {
    const payload = {
      response: {
        passwordRequired: 'Required',
        usernameRequired: undefined,
        message: undefined,
      },
    };
    dispatch(validationResponse(payload));
    return resolve(payload.response);
  }
  if (username.length < 6 || password.length < 6) {
    const payload = {
      response: {
        message: "Username and password don't match",
        passwordRequired: undefined,
        usernameRequired: undefined,
      },
    };
    dispatch(validationResponse(payload));
    return resolve(payload.response);
  }
  const payload = {
    response: {
      message: 'Ok',
      passwordRequired: undefined,
      usernameRequired: undefined,
    },
  };
  dispatch(validationResponse(payload, INPUT_VALIDATION_SUCCESS));
  return resolve(payload.response);
});

export const socialAuth = provider => (dispatch) => {
  dispatch(socialAuthLogin(SOCIAL_AUTH_SUCCESS));
  return window.open(`${API_URL}/users/${provider}`);
};
