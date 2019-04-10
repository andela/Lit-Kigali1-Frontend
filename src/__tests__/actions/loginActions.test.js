import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import 'isomorphic-fetch';
import {
  inputHandler,
  validationResponse,
  validateCredentials,
  loginUser,
} from '../../redux/actions/loginActions';
import {
  HANDLE_LOGIN_INPUT,
  INPUT_VALIDATION_FAILURE,
  INPUT_VALIDATION_SUCCESS,
  CLEAR_LOGIN,
  LOGIN_FAILURE,
  SUBMIT_LOGIN_FORM,
} from '../../redux/actions-types/loginTypes';
import { SET_CURRENT_USER } from '../../redux/actions-types/currentUserTypes';

const { API_URL = 'http://localhost:3000/api/v1' } = process.env;
const mockStore = configureStore([thunk]);
let store;
jest.setTimeout(30000);

describe('Login Actions', () => {
  test('should return filed and its value', () => {
    const expectedAction = {
      type: HANDLE_LOGIN_INPUT,
      payload: {
        field: 'username',
        value: 'John',
      },
    };
    expect(inputHandler({ field: 'username', value: 'John' })).toEqual(expectedAction);
  });

  test('Should return validation response', () => {
    const expectedAction = {
      type: INPUT_VALIDATION_FAILURE,
      payload: 'Password must be greater than 6 characters',
    };
    expect(validationResponse('Password must be greater than 6 characters')).toEqual(
      expectedAction,
    );
  });

  describe('asynchronous actions', () => {
    beforeEach(() => {
      store = mockStore({});
    });

    test('Validation - should return validation response', () => {
      expect.assertions(1);
      const expectedAction = [
        {
          type: INPUT_VALIDATION_FAILURE,
          payload: {
            response: {
              message: 'Password and username must be at least 6 characters',
            },
          },
        },
      ];
      return store
        .dispatch(validateCredentials({ username: 'chris', password: 'chris' }))
        .then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
    });

    test('Validation - should return username validation response', () => {
      expect.assertions(1);
      const expectedAction = [
        {
          type: INPUT_VALIDATION_FAILURE,
          payload: {
            response: {
              message: 'Username must be at least 6 characters',
            },
          },
        },
      ];
      return store
        .dispatch(validateCredentials({ username: 'chris', password: 'christian' }))
        .then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
    });

    test('Validation - should return password validation response', () => {
      expect.assertions(1);
      const expectedAction = [
        {
          type: INPUT_VALIDATION_FAILURE,
          payload: {
            response: {
              message: 'Password must be at least 6 characters',
            },
          },
        },
      ];
      return store
        .dispatch(validateCredentials({ username: 'christian', password: 'chris' }))
        .then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
    });

    test('Validation - should return validation response', () => {
      expect.assertions(1);
      const expectedAction = [
        {
          type: INPUT_VALIDATION_SUCCESS,
          payload: {
            response: {
              message: 'Ok',
            },
          },
        },
      ];
      return store
        .dispatch(validateCredentials({ username: 'christian', password: 'christian' }))
        .then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
    });

    test('Should dsipatch login success', () => {
      const payload = { username: 'christian', password: '123456' };
      const expectedActions = [
        { type: SUBMIT_LOGIN_FORM },
        { type: SET_CURRENT_USER, payload },
        { type: CLEAR_LOGIN },
      ];
      nock(API_URL)
        .post('/users/login')
        .reply(201, {
          status: 201,
          user: {
            username: 'christian',
            password: '123456',
          },
        });
      return store.dispatch(loginUser({ username: 'christian', password: '123456' })).then(() => {
        const actions = store.getActions();
        expect(actions).toEqual(expectedActions);
      });
    });

    test('Should dsipatch login success', () => {
      const payload = { status: 404, message: 'Username and Password dont match' };
      const expectedActions = [{ type: SUBMIT_LOGIN_FORM }, { type: LOGIN_FAILURE, payload }];
      nock(API_URL)
        .post('/users/login')
        .reply(404, {
          status: 404,
          message: 'Username and Password dont match',
        });
      return store.dispatch(loginUser({ username: 'christina', password: '123456' })).then(() => {
        const actions = store.getActions();
        expect(actions).toEqual(expectedActions);
      });
    });
  });
});
