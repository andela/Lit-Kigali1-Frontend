import configureStore from 'redux-mock-store'; // ES6 modules
import thunk from 'redux-thunk';
import nock from 'nock';
import 'isomorphic-fetch';
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

const { API_URL = 'http://localhost:3000/api/v1' } = process.env;

const mockStore = configureStore([thunk]);
let store;
jest.setTimeout(30000);

describe('forgotPassword', () => {
  describe('synchronous actions', () => {
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
      store = mockStore({});
    });
    afterEach(() => {
      nock.cleanAll();
    });

    test('should dispatch submitForgotPassword action - FAILURE', () => {
      expect.assertions(2);
      const payload = { email: { email: 'olivier@email.com' } };
      return store.dispatch(submitForgotPassword(payload)).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toEqual(SUBMIT_FORGOT_PASSWORD_FORM);
        expect(actions[1].type).toEqual(FORGOT_PASSWORD_FAILURE);
      });
    });

    test('should dispatch submitForgotPassword action - SUCCESS', () => {
      expect.assertions(1);
      const payload = { email: 'olivier@email.com' };
      const expectedActions = [
        { type: 'SUBMIT_FORGOT_PASSWORD_FORM', payload: { submitting: true } },
        {
          type: 'FORGOT_PASSWORD_SUCCESS',
          payload: {
            status: 201,
            message: 'Password reset link sent sucessfully. Please check your email!',
          },
        },
      ];
      nock(API_URL)
        .post('/users/forget')
        .reply(201, {
          status: 201,
          message: 'Password reset link sent sucessfully. Please check your email!',
        });
      return store.dispatch(submitForgotPassword(payload)).then(() => {
        const actions = store.getActions();
        expect(actions).toEqual(expectedActions);
      });
    });

    test('should dispatch submitResetPassword action - FAILURE', () => {
      expect.assertions(1);
      const payload = {
        userId: 'b2d3f3d8-5893-47df-b715-6f10f451bf92',
        resetCode: '0382040a-f609-49b6-a43a-f1878ae1b5fd',
        newPassword: '123456',
        confirmNewPassword: '1234569',
      };
      const expectedActions = [
        { type: 'SUBMIT_FORGOT_PASSWORD_FORM', payload: { submitting: true } },
        {
          type: 'FORGOT_PASSWORD_FAILURE',
          payload: { status: 400, message: "Passwords don't match" },
        },
      ];
      return store.dispatch(submitResetPassword(payload)).then(() => {
        const actions = store.getActions();
        expect(actions[1].type).toEqual(expectedActions[1].type);
      });
    });

    test('should dispatch submitResetPassword action - SUCCESS', () => {
      expect.assertions(2);
      const payload = {
        userId: 'b2d3f3d8-5893-47df-b715-6f10f451bf92',
        resetCode: '0382040a-f609-49b6-a43a-f1878ae1b5fd',
        newPassword: '123456',
        confirmNewPassword: '123456',
      };
      nock(API_URL)
        .put(`/users/${payload.userId}/reset/${payload.resetCode}`)
        .reply(200, {
          status: 200,
          message: 'Your password has been reset successfully!',
        });
      const expectedActions = [
        { type: 'SUBMIT_FORGOT_PASSWORD_FORM', payload: { submitting: true } },
        {
          type: 'FORGOT_PASSWORD_SUCCESS',
          payload: { status: 200, message: 'Your password has been reset successfully!' },
        },
      ];
      return store.dispatch(submitResetPassword(payload)).then((res) => {
        const actions = store.getActions();
        expect(actions).toEqual(expectedActions);
        expect(res.message).toBe('Your password has been reset successfully!');
      });
    });
  });
});
