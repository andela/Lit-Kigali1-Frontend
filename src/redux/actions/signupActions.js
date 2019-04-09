import {
  SIGNUP_FORM,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_FORM_SUBMIT,
  CLEAR_SIGNUP_FORM,
} from '../actions-types';
import { setUserProfile } from './userActions';
import axios from '../../helpers/axios';

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

export const submitSignUp = ({
  username, email, password, ownProps,
}) => (dispatch) => {
  dispatch(submitSignUpForm({ submitting: true }));
  return axios
    .post('/users', { user: { username, email, password } })
    .then((res) => {
      if (res.data.status === 201) {
        console.log(res.data.user, 'fhfhhffhfffhffhfhfh');
        dispatch(setUserProfile(res.data.user));
        dispatch(clearSignup());
        if (ownProps) {
          ownProps.history.push('/home');
        }
        return;
      }
      dispatch(submitSignUpFailure(res.data));
    })
    .catch((err) => {
      dispatch(submitSignUpFailure(err.response.data));
    });
};
