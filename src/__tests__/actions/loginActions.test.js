import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import 'isomorphic-fetch';
import {
  inputHandler,
  validationResponse,
  submitLoginForm,
  clearLogin,
  validateCredentials,
  loginUser,
} from '../../redux/actions/loginActions';
import {
  LOGIN_FAILURE,
  HANDLE_LOGIN_INPUT,
  INPUT_VALIDATION_FAILURE,
  INPUT_VALIDATION_SUCCESS,
  CLEAR_LOGIN,
  SUBMIT_LOGIN_FORM,
} from '../../redux/actions-types/loginTypes';
import { SET_CURRENT_USER } from '../../redux/actions-types/currentUserTypes';
import { signupUser } from '../../__mocks__/dummyData';

const { API_URL = 'http://localhost:3000/api/v1' } = process.env;
const mockStore = configureStore([thunk]);
let store;
jest.setTimeout(30000);

describe('Login Actions', () => {
  beforeEach(() => {
    store = mockStore({});
  });
  test('should return field and its value', () => {
    const data1 = {
      field: 'username',
      value: 'John',
    };
    const data2 = {
      field: 'password',
      value: '123456',
    };
    const res1 = inputHandler(data1);
    const res2 = inputHandler(data2);
    expect(res1.type).toEqual(HANDLE_LOGIN_INPUT);
    expect(res1.payload.field).toEqual(data1.field);
    expect(res1.payload.value).toEqual(data1.value);
    expect(res2.type).toEqual(HANDLE_LOGIN_INPUT);
    expect(res2.payload.field).toEqual(data2.field);
    expect(res2.payload.value).toEqual(data2.value);
  });

  test('should return provide payload and type = INPUT_VALIDATION_FAILURE', () => {
    const payload = {
      response: {
        message: 'Password and username must be at least 6 characters',
      },
    };
    const res = validationResponse(payload);
    expect(res.type).toEqual(INPUT_VALIDATION_FAILURE);
    expect(res.payload).toEqual(payload);
  });

  test('should return provide payload and type as provide', () => {
    const payload = {
      response: {
        message: 'Password and username must be at least 6 characters',
      },
    };
    const res = validationResponse(payload, INPUT_VALIDATION_SUCCESS);
    expect(res.type).toEqual(INPUT_VALIDATION_SUCCESS);
    expect(res.payload).toEqual(payload);
  });

  test('should return CLEAR_LOGIN TYPE', () => {
    const res = clearLogin();
    expect(res.type).toEqual(CLEAR_LOGIN);
  });

  test('should return SUBMIT_LOGIN_FORM TYPE', () => {
    const res = submitLoginForm();
    expect(res.type).toEqual(SUBMIT_LOGIN_FORM);
  });

  test('should return usernameRequired', () => {
    const credentials = {
      username: '',
      password: '',
    };
    const payload = {
      response: {
        usernameRequired: 'required',
      },
    };
    return validateCredentials(credentials)(store.dispatch).then((res) => {
      expect(res).toEqual(payload.response);
    });
  });

  test('should return usernameRequired', () => {
    const credentials = {
      username: '',
      password: '123',
    };
    const payload = {
      response: {
        usernameRequired: 'required',
      },
    };
    return validateCredentials(credentials)(store.dispatch).then((res) => {
      expect(res).toEqual(payload.response);
    });
  });

  test('should return passwordRequired', () => {
    const credentials = {
      username: 'dan',
      password: '',
    };
    const payload = {
      response: {
        passwordRequired: 'required',
      },
    };
    return validateCredentials(credentials)(store.dispatch).then((res) => {
      expect(res).toEqual(payload.response);
    });
  });

  test('should return not validation failure', () => {
    const credentials = {
      username: 'daniel',
      password: '123456',
    };
    const payload = {
      response: {
        message: 'Ok',
      },
    };
    return validateCredentials(credentials)(store.dispatch).then((res) => {
      expect(res).toEqual(payload.response);
    });
  });

  test('should login a user', () => {
    const data = {
      username: 'daniel',
      password: '123456',
    };
    nock(API_URL)
      .post('/users/login', { user: { ...data } })
      .reply(200, {
        status: 200,
        user: {
          ...signupUser,
        },
      });
    return loginUser(data)(store.dispatch).then(() => {
      const actions = store.getActions();
      const expectedActions = [
        { type: SUBMIT_LOGIN_FORM },
        {
          type: SET_CURRENT_USER,
          payload: {
            ...signupUser,
          },
        },
        { type: CLEAR_LOGIN },
      ];
      expect(actions.length).toEqual(3);
      expect(actions).toEqual(expectedActions);
    });
  });

  test('should not login user', () => {
    const data = {
      username: 'daniel',
      password: '1234561',
    };
    const reply = {
      status: 404,
      message: 'Username and Password dont match',
    };
    nock(API_URL)
      .post('/users/login', { user: { ...data } })
      .reply(200, {
        ...reply,
      });
    return loginUser(data)(store.dispatch).then(() => {
      const expectedActions = [
        { type: SUBMIT_LOGIN_FORM },
        {
          type: LOGIN_FAILURE,
          payload: {
            ...reply,
          },
        },
      ];
      const actions = store.getActions();
      expect(actions.length).toEqual(2);
      expect(actions).toEqual(expectedActions);
    });
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
              message: 'Username and password don\'t match',
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

    test('Should dsipatch login failure', () => {
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
