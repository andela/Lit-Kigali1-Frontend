import {
  SIGNUP_FORM,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_FORM_SUBMIT,
  CLEAR_SIGNUP_FORM,
} from '../actions-types';
import fetchAPI from '../../helpers/fetchAPI';
import { setCurrentUserProfile } from './currentUserActions';

export const clearSignup = () => ({
  type: CLEAR_SIGNUP_FORM,
});

export const handleSignUpForm = ({ field, value }) => ({
  type: SIGNUP_FORM,
  payload: { field, value },
});

export const submitSignUpForm = payload => ({
  type: SIGNUP_FORM_SUBMIT,
  payload,
});

export const submitSignUpSuccess = payload => ({ type: SIGNUP_SUCCESS, payload });
export const submitSignUpFailure = payload => ({ type: SIGNUP_FAILURE, payload });

export const submitSignUp = ({ username, email, password }) => (dispatch) => {
  dispatch(submitSignUpForm({ submitting: true }));
  return fetchAPI('/users', {
    method: 'POST',
    body: { user: { username, email, password } },
  })
    .then((data) => {
      dispatch(setCurrentUserProfile(data.user));
      dispatch(clearSignup());
      localStorage.setItem('token', data.user.token);
      return data;
    })
    .catch((err) => {
      dispatch(submitSignUpFailure({ message: err.message }));
      return err;
    });
};
