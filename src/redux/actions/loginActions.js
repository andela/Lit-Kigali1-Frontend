import axios from 'axios';
import {
  LOGIN_FAILURE,
  HANDLE_LOGIN_INPUT,
  INPUT_VALIDATION_FAILURE,
  INPUT_VALIDATION_SUCCESS,
  CLEAR_LOGIN,
  SUBMIT_LOGIN_FORM
} from '../actions-types';

import { setUserProfile } from '.';

export const clearLogin = () => ({
  type: CLEAR_LOGIN,
});

export const submitLoginForm = () => ({
  type: SUBMIT_LOGIN_FORM
})

export const loginUser = data => (dispatch) => {
  dispatch(submitLoginForm());
  axios
    .post('http://localhost:3000/api/v1/users/login', { user: { ...data } })
    .then((res) => {
      if (res.status === 200) {
        dispatch(setUserProfile(res.data.user));
        dispatch(clearLogin());
        return;
      }
      dispatch({
        type: LOGIN_FAILURE,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: LOGIN_FAILURE,
        payload: err,
      });
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
