import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import 'isomorphic-fetch';
import {
  clearSignup,
  handleSignUpForm,
  submitSignUpForm,
  submitSignUpSuccess,
  submitSignUpFailure,
  submitSignUp,
} from '../../redux/actions/signupActions';
import {
  SIGNUP_FORM,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_FORM_SUBMIT,
} from '../../redux/actions-types';

const { API_URL = 'http://localhost:3000/api/v1' } = process.env;

const mockStore = configureStore([thunk]);
let store;
jest.setTimeout(30000);

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
          type: 'SET_PROFILE',
          payload: {
            status: 201,
            message: 'Account created sucessfully. Please check your email for confirmation',
          },
        },
      ];
      nock(API_URL)
        .post('/users')
        .reply(201, {
          status: 201,
          message: 'Account created sucessfully. Please check your email for confirmation',
        });
      return store.dispatch(submitSignUp(payload)).then(() => {
        const actions = store.getActions();
        expect(actions).toEqual(expectedActions);
      });
    });
  });
});
