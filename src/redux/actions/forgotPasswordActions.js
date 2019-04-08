import {
  FORGOT_PASSWORD_FORM,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
  SUBMIT_FORGOT_PASSWORD_FORM,
} from '../actions-types/forgotPasswordTypes';
import fetchAPI from '../../helpers/fetchAPI';

export const handleForgotPasswordForm = ({ field, value }) => ({
  type: FORGOT_PASSWORD_FORM,
  payload: { field, value },
});

export const submitForgotPasswordForm = payload => ({
  type: SUBMIT_FORGOT_PASSWORD_FORM,
  payload,
});

export const submitForgotPasswordSuccess = payload => ({ type: FORGOT_PASSWORD_SUCCESS, payload });
export const submitForgotPasswordFailure = payload => ({ type: FORGOT_PASSWORD_FAILURE, payload });

export const submitForgotPassword = ({ email }) => (dispatch) => {
  dispatch(submitForgotPasswordForm({ submitting: true }));
  return fetchAPI('/users/forget', { method: 'POST', body: { user: { email } } })
    .then((data) => {
      dispatch(submitForgotPasswordSuccess(data));
      return data;
    })
    .catch((err) => {
      dispatch(submitForgotPasswordFailure({ message: err.message }));
      return err;
    });
};

export const submitResetPassword = ({
  userId,
  resetCode,
  newPassword,
  confirmNewpassword,
}) => (dispatch) => {
  dispatch(submitForgotPasswordForm({ submitting: true }));
  return fetchAPI(`/users/${userId}/reset/${resetCode}`, {
    method: 'PUT',
    body: { newPassword, confirmNewpassword },
  })
    .then((data) => {
      dispatch(submitForgotPasswordSuccess(data));
      return data;
    })
    .catch((err) => {
      dispatch(submitForgotPasswordFailure({ message: err.message }));
      return err;
    });
};
