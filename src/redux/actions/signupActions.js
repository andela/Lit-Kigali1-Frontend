import {
  SIGNUP_FORM,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_FORM_SUBMIT,
  CLEAR_SIGNUP_FORM,
  EMAIL_VERIFICATION_SUCCESS,
  EMAIL_VERIFICATION_ERROR,
} from '../actions-types';
import fetchAPI from '../../helpers/fetchAPI';
import { setCurrentUser } from './currentUserActions';

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

export const emailVericationSuccess = payload => ({
  type: EMAIL_VERIFICATION_SUCCESS,
  payload,
});
export const emailVericationError = payload => ({
  type: EMAIL_VERIFICATION_ERROR,
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
      dispatch(setCurrentUser(data.user));
      dispatch(clearSignup());
      localStorage.setItem('token', data.user.token);
      return data;
    })
    .catch((err) => {
      dispatch(submitSignUpFailure({ message: err.message }));
      return err;
    });
};

export const fetchConfirmEmail = ({ userId, confirmationCode }) => dispatch => fetchAPI(`/users/${userId}/confirm_email/${confirmationCode}`, {
  method: 'GET',
})
  .then(({ message }) => {
    dispatch(emailVericationSuccess(message));
  })
  .catch(({ message }) => {
    dispatch(emailVericationError(message));
  });
