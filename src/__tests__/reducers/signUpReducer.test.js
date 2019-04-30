import reducer from '../../redux/reducers/signUpReducer';
import {
  SIGNUP_FORM,
  CLEAR_SIGNUP_FORM,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_FORM_SUBMIT,
  EMAIL_VERIFICATION_ERROR,
  EMAIL_VERIFICATION_SUCCESS,
} from '../../redux/actions-types';
import store from '../../redux/store';

describe('signUpReducer', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(store.getState().signUp);
  });

  test('should handle CLEAR_FORGOT_PASSWORD_FORM', () => {
    const expectedState = {
      type: CLEAR_SIGNUP_FORM,
    };
    expect(reducer({}, expectedState)).toEqual(store.getState().signUp);
  });

  test('should handle SIGNUP_FORM', () => {
    const payload = {
      username: 'testusername',
    };
    const expectedState = {
      type: SIGNUP_FORM,
      payload: { field: 'username', value: 'testusername' },
    };
    expect(reducer({}, expectedState)).toEqual({ ...payload, errors: [], message: '' });
  });

  test('should handle SIGNUP_SUCCESS', () => {
    const payload = {
      message: 'Account created sucessfully. Please check your email for confirmation',
    };
    const expectedState = {
      type: SIGNUP_SUCCESS,
      payload,
    };
    expect(reducer({}, expectedState)).toEqual({
      successMessage: payload.message,
      submitting: false,
    });
  });

  test('should handle SIGNUP_FAILURE', () => {
    const payload = {
      message: 'Account already exist.',
    };
    const expectedState = {
      type: SIGNUP_FAILURE,
      payload,
    };
    expect(reducer({}, expectedState)).toEqual({ ...payload, errors: [], submitting: false });
  });

  test('should handle EMAIL_VERIFICATION_ERROR', () => {
    const confirmMessage = {};
    const expectedState = {
      type: EMAIL_VERIFICATION_ERROR,
      confirmMessage,
    };
    expect(reducer({}, expectedState)).toEqual({ ...confirmMessage });
  });

  test('should handle EMAIL_VERIFICATION_ERROR', () => {
    const confirmMessage = {};
    const expectedState = {
      type: EMAIL_VERIFICATION_SUCCESS,
      confirmMessage,
    };
    expect(reducer({}, expectedState)).toEqual({ ...confirmMessage });
  });

  test('should handle SIGNUP_FORM_SUBMIT', () => {
    const payload = {
      submitting: false,
    };
    const expectedState = {
      type: SIGNUP_FORM_SUBMIT,
      payload,
    };
    expect(reducer({}, expectedState)).toEqual(payload);
  });
});
