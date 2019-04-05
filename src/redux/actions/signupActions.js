import {
  SIGNUP_FORM, SIGNUP_SUCCESS, SIGNUP_FAILURE, SIGNUP_FORM_SUBMIT,
} from '../actions-types';
import {} from '../reducers';
import axios from '../../helpers/axios';

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

export const submitSignUp = ({
  username, email, password, ownProps,
}) => (dispatch) => {
  dispatch(submitSignUpForm({ submitting: true }));
  return axios
    .post('/users', { user: { username, email, password } })
    .then((res) => {
      if (res.data.status === 201) {
        dispatch(submitSignUpSuccess(res.data));
        if (ownProps) {
          ownProps.history.push('/sign-up-message');
        }
        return;
      }
      dispatch(submitSignUpFailure(res.data));
    })
    .catch((err) => {
      dispatch(submitSignUpFailure(err.response.data));
    });
};
