import reducer from '../../../redux/reducers/forgotPasswordReducer';
import {
  CLEAR_FORGOT_PASSWORD_FORM,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
  FORGOT_PASSWORD_FORM,
} from '../../../redux/actions-types';
import store from '../../../redux/store';

describe('forgotPasswordReducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(store.getState().forgotPassword);
  });

  it('should handle CLEAR_FORGOT_PASSWORD_FORM', () => {
    const expectedState = {
      type: CLEAR_FORGOT_PASSWORD_FORM,
    };
    expect(reducer({}, expectedState)).toEqual(store.getState().forgotPassword);
  });

  it('should handle FORGOT_PASSWORD_FORM', () => {
    const payload = {
      newPassword: '123456',
    };
    const expectedState = {
      type: FORGOT_PASSWORD_FORM,
      payload: { field: 'newPassword', value: '123456' },
    };
    expect(reducer({}, expectedState)).toEqual({ ...payload, errors: [], message: '' });
  });

  it('should handle FORGOT_PASSWORD_SUCCESS', () => {
    const payload = {
      message: 'Password reset link sent successfully. Please check your email.',
    };
    const expectedState = {
      type: FORGOT_PASSWORD_SUCCESS,
      payload,
    };
    expect(reducer({}, expectedState)).toEqual({
      successMessage: payload.message,
      submitting: false,
    });
  });

  it('should handle FORGOT_PASSWORD_FAILURE', () => {
    const payload = {
      message: 'Password reset link sent successfully. Please check your email.',
    };
    const expectedState = {
      type: FORGOT_PASSWORD_FAILURE,
      payload,
    };
    expect(reducer({}, expectedState)).toEqual({ ...payload, errors: [], submitting: false });
  });
});
