import configureStore from 'redux-mock-store'; // ES6 modules
import thunk from 'redux-thunk';
import {
  submitForgotPasswordFailure,
  submitForgotPasswordSuccess,
  handleForgotPasswordForm,
  submitResetPassword,
  submitForgotPassword,
} from '../../../redux/actions/forgotPasswordActions';
import {
  FORGOT_PASSWORD_FORM,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
  SUBMIT_FORGOT_PASSWORD_FORM,
} from '../../../redux/actions-types/forgotPasswordTypes';

let middlewares;
let mockStore;
let store;

describe('forgotPassword', () => {
  describe('synchronous actions', () => {
    beforeAll(() => {
      middlewares = [];
      mockStore = configureStore(middlewares);
    });
    beforeEach(() => {
      store = mockStore({});
    });
    test('should dispatch FORGOT_PASSWORD_SUCCESS action', () => {
      const payload = { field: 'newPassword', value: '123456' };
      const expectedPayload = {
        type: FORGOT_PASSWORD_FORM,
        payload,
      };

      store.dispatch(handleForgotPasswordForm(payload));

      const actions = store.getActions();
      expect(actions).toEqual([expectedPayload]);
    });
    test('should dispatch FORGOT_PASSWORD_SUCCESS action', () => {
      const payload = { message: 'SUCCESS' };
      const expectedPayload = {
        type: FORGOT_PASSWORD_SUCCESS,
        payload,
      };

      store.dispatch(submitForgotPasswordSuccess(payload));

      const actions = store.getActions();
      expect(actions).toEqual([expectedPayload]);
    });

    test('should dispatch FORGOT_PASSWORD_FAILURE action', () => {
      const payload = { message: 'FAILURE' };
      const expectedPayload = {
        type: FORGOT_PASSWORD_FAILURE,
        payload,
      };

      store.dispatch(submitForgotPasswordFailure(payload));

      const actions = store.getActions();
      expect(actions).toEqual([expectedPayload]);
    });
  });

  describe('async actions', () => {
    beforeEach(() => {
      middlewares = [thunk];
      mockStore = configureStore(middlewares);
      store = mockStore({});
    });
    test('should dispatch submitResetPassword action', () => {
      const payload = { email: 'olivier@email.com' };
      return store.dispatch(submitForgotPassword(payload)).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toEqual(SUBMIT_FORGOT_PASSWORD_FORM);
      });
    });
  });
});
