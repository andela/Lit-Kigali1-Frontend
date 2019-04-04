import * as resetPasswordActions from '../../../redux/actions/forgotPasswordActions';
import { FORGOT_PASSWORD_FORM } from '../../../redux/actions-types/forgotPasswordTypes';

describe('forgotPassword', () => {
  test('should create an action to handle input', () => {
    const payload = { value: '12345', field: 'newPassword' };
    const expectedAction = {
      type: FORGOT_PASSWORD_FORM,
      payload,
    };
    expect(resetPasswordActions.handleForgotPasswordForm(payload)).toEqual(expectedAction);
  });
});
