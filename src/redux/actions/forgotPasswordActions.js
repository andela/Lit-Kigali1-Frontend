import {
  FORGOT_PASSWORD_FORM,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
  SUBMIT_FORGOT_PASSWORD_FORM,
} from '../actions-types/forgotPasswordTypes';
import {} from '../reducers';
import axios from '../../helpers/axios';

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

export const submitForgotPassword = ({ email, ownProps }) => (dispatch) => {
  dispatch(submitForgotPasswordForm({ submitting: true }));
  return axios
    .post('/users/forget', { user: { email } })
    .then((res) => {
      if (res.data.status === 201) {
        dispatch(submitForgotPasswordSuccess(res.data));
        if (ownProps) {
          ownProps.history.push('/forgot-password-message');
        }
        return;
      }
      dispatch(submitForgotPasswordFailure(res.data));
    })
    .catch((err) => {
      dispatch(submitForgotPasswordFailure(err.response.data));
    });
};
export const submitResetPassword = ({
  userId,
  resetCode,
  newPassword,
  confirmNewpassword,
  ownProps,
}) => (dispatch) => {
  dispatch(submitForgotPasswordForm({ submitting: true }));
  return axios
    .put(`/users/${userId}/reset/${resetCode}`, { newPassword, confirmNewpassword })
    .then((res) => {
      if (res.data.status === 200) {
        dispatch(submitForgotPasswordSuccess(res.data));
        ownProps.history.push('/login');
      } else {
        dispatch(submitForgotPasswordFailure(res.data));
      }
    })
    .catch(err => dispatch(submitForgotPasswordFailure({ message: err.message })));
};
