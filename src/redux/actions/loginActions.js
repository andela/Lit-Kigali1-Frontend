import fetchAPI from '../../helpers/fetchAPI';
import {
  LOGIN_FAILURE,
  HANDLE_LOGIN_INPUT,
  INPUT_VALIDATION_FAILURE,
  INPUT_VALIDATION_SUCCESS,
  CLEAR_LOGIN,
  SUBMIT_LOGIN_FORM,
} from '../actions-types';

import { setCurrentUserProfile } from '.';

export const clearLogin = () => ({
  type: CLEAR_LOGIN,
});

export const submitLoginForm = () => ({
  type: SUBMIT_LOGIN_FORM,
});

export const loginUser = user => (dispatch) => {
  dispatch(submitLoginForm());

  return fetchAPI('/users/login', {
    method: 'POST',
    body: { user: { ...user } },
  })
    .then((data) => {
      dispatch(setCurrentUserProfile(data.user));
      dispatch(clearLogin());
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
  if (username.length < 6 && password.length < 6) {
    const payload = {
      response: {
        message: 'Password and username must be at least 6 characters',
      },
    };
    dispatch(validationResponse(payload));
    return resolve(payload.response);
  }
  if (username.length < 6) {
    const payload = {
      response: {
        message: 'Username must be at least 6 characters',
      },
    };
    dispatch(validationResponse(payload));
    return resolve(payload.response);
  }
  if (password.length < 6) {
    const payload = {
      response: {
        message: 'Password must be at least 6 characters',
      },
    };
    dispatch(validationResponse(payload));
    return resolve(payload.response);
  }
  const payload = {
    response: {
      message: 'Ok',
    },
  };
  dispatch(validationResponse(payload, INPUT_VALIDATION_SUCCESS));
  return resolve(payload.response);
});
