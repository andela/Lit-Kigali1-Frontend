import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import 'isomorphic-fetch';
import {
  handleSignUpForm,
  submitSignUpSuccess,
  submitSignUpFailure,
  submitSignUp,
  fetchConfirmEmail,
} from '../../redux/actions/signupActions';
import {
  SIGNUP_FORM,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_FORM_SUBMIT,
  EMAIL_VERIFICATION_SUCCESS,
  EMAIL_VERIFICATION_ERROR,
} from '../../redux/actions-types';

const { API_URL = 'http://localhost:3000/api/v1' } = process.env;

const mockStore = configureStore([thunk]);
let store;
jest.setTimeout(40000);

describe('signUp', () => {
  describe('synchronous actions', () => {
    beforeEach(() => {
      store = mockStore({});
    });

    test('should dispatch SIGNUP_FORM action', () => {
      const payload = { field: 'username', value: 'testusername' };
      const expectedPayload = {
        type: SIGNUP_FORM,
        payload,
      };

      store.dispatch(handleSignUpForm(payload));

      const actions = store.getActions();
      expect(actions).toEqual([expectedPayload]);
    });

    test('should dispatch SIGNUP_SUCCESS action', () => {
      const payload = { message: 'SUCCESS' };
      const expectedPayload = {
        type: SIGNUP_SUCCESS,
        payload,
      };

      store.dispatch(submitSignUpSuccess(payload));

      const actions = store.getActions();
      expect(actions).toEqual([expectedPayload]);
    });

    test('should dispatch SIGNUP_FAILURE action', () => {
      const payload = { message: 'FAILURE' };
      const expectedPayload = {
        type: SIGNUP_FAILURE,
        payload,
      };

      store.dispatch(submitSignUpFailure(payload));

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

    test('should dispatch submitSignUp action - FAILURE', () => {
      const payload = {
        username: 'testusername',
        email: 'test@email.com',
        password: '1234',
      };
      return store.dispatch(submitSignUp(payload)).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toEqual(SIGNUP_FORM_SUBMIT);
        expect(actions[1].type).toEqual(SIGNUP_FAILURE);
      });
    });

    test('should dispatch submitSignUp action - SUCCESS', () => {
      const payload = {
        username: 'testuser1',
        email: 'test@email21.com',
        password: '123456',
      };
      const expectedActions = [
        { type: 'SIGNUP_FORM_SUBMIT', payload: { submitting: true } },
        {
          type: 'SET_CURRENT_USER',
          payload: {
            token: '4777vvcvhe7e77vb',
          },
        },
        {
          type: 'CLEAR_SIGNUP_FORM',
        },
      ];
      nock(API_URL)
        .post('/users')
        .reply(201, {
          status: 201,
          message: 'Account created sucessfully. Please check your email for confirmation',
          user: {
            token: '4777vvcvhe7e77vb',
          },
        });
      return store.dispatch(submitSignUp(payload)).then(() => {
        const actions = store.getActions();
        expect(actions).toEqual(expectedActions);
      });
    });
  });

  describe('confirm emailactions', () => {
    beforeEach(() => {
      store = mockStore({});
    });
    afterEach(() => {
      nock.cleanAll();
    });
    test('should dispatch fetchConfirmEmail action - SUCCESS', () => {
      expect.assertions(1);
      const payload = {
        userId: 'b2d3f3d8-5893-47df-b715-6f10f451bf92',
        resetCode: '0382040a-f609-49b6-a43a-f1878ae1b5fd',
        newPassword: '123456',
        confirmNewPassword: '123456',
      };
      nock(API_URL)
        .get(`/users/${payload.userId}/confirm_email/${payload.confirmationCode}`)
        .reply(201, {
          status: 201,
          message: 'Your email has been confirmed successfully!',
        });
      const expectedActions = [
        {
          type: EMAIL_VERIFICATION_SUCCESS,
          payload: 'Your email has been confirmed successfully!',
        },
      ];
      return store.dispatch(fetchConfirmEmail(payload)).then(() => {
        const actions = store.getActions();
        expect(actions).toEqual(expectedActions);
      });
    });

    test('should dispatch fetchConfirmEmail action - SUCCESS', () => {
      expect.assertions(1);
      const payload = {
        userId: 'b2d3f3d8-5893-47df-b715-6f10f451bf92',
        resetCode: '0382040a-f609-49b6-a43a-f1878ae1b5fd',
        newPassword: '123456',
        confirmNewPassword: '123456',
      };
      nock(API_URL)
        .get(`/users/${payload.userId}/confirm_email/${payload.confirmationCode}`)
        .reply(401, {
          status: 401,
          message: 'Your email is already confirmed!',
        });
      const expectedActions = [
        {
          type: EMAIL_VERIFICATION_ERROR,
          payload: 'Your email is already confirmed!',
        },
      ];
      return store.dispatch(fetchConfirmEmail(payload)).then(() => {
        const actions = store.getActions();
        expect(actions).toEqual(expectedActions);
      });
    });
  });
});
