import loginReducer from '../../redux/reducers/loginReducer';
import {
  LOGIN_FAILURE,
  HANDLE_LOGIN_INPUT,
  INPUT_VALIDATION_FAILURE,
  INPUT_VALIDATION_SUCCESS,
  CLEAR_LOGIN,
  SUBMIT_LOGIN_FORM,
} from '../../redux/actions-types';

describe('Login Actions', () => {
  test('should return initial state on clear login type', () => {
    const expected = {
      submitting: false,
      credentials: {
        username: '',
        password: '',
      },
    };
    const action = {
      type: CLEAR_LOGIN,
      payload: {},
    };
    expect(loginReducer({}, action)).toEqual(expected);
  });

  test('should change submitting to true on SUBMIT_LOGIN_FORM', () => {
    const initial = {
      submitting: false,
      credentials: {
        username: '',
        password: '',
      },
    };
    const action = {
      type: SUBMIT_LOGIN_FORM,
      payload: {},
    };
    const res = loginReducer(initial, action);
    expect(res.submitting).toEqual(true);
    expect(res.credentials).toBe(initial.credentials);
  });

  test('should add error property to state on LOGIN_FAILURE', () => {
    const initial = {
      submitting: false,
      credentials: {
        username: '',
        password: '',
      },
    };
    const action = {
      type: LOGIN_FAILURE,
      payload: {
        status: 404,
        message: 'User not found',
      },
    };
    const res = loginReducer(initial, action);
    expect(res.error.message).toEqual(action.payload.message);
    expect(res.submitting).toEqual(false);
  });

  test('should update credentials on HANDLE_LOGIN_INPUT', () => {
    const initial = {
      submitting: false,
      credentials: {
        username: '',
        password: '',
      },
    };
    const action1 = {
      type: HANDLE_LOGIN_INPUT,
      payload: {
        field: 'username',
        value: 'daniel',
      },
    };
    const action2 = {
      type: HANDLE_LOGIN_INPUT,
      payload: {
        field: 'password',
        value: '123456',
      },
    };
    const res1 = loginReducer(initial, action1);
    const res2 = loginReducer(initial, action2);
    expect(res1.credentials.username).toEqual(action1.payload.value);
    expect(res2.credentials.password).toEqual(action2.payload.value);
  });

  test('should add error property to state on INPUT_VALIDATION_FAILURE', () => {
    const initial = {
      submitting: false,
      credentials: {
        username: '',
        password: '',
      },
    };
    const action = {
      type: INPUT_VALIDATION_FAILURE,
      payload: {
        response: {
          message: 'password must be at least 6 characters',
        },
      },
    };
    const res = loginReducer(initial, action);
    expect(res.error).toEqual(action.payload.response);
  });

  test('should remove error property to state on INPUT_VALIDATION_SUCCESS', () => {
    const initial = {
      submitting: false,
      credentials: {
        username: '',
        password: '',
      },
      error: {
        message: 'password must be at least 6 characters',
      },
    };
    const action = {
      type: INPUT_VALIDATION_SUCCESS,
      payload: {},
    };
    const res = loginReducer(initial, action);
    expect(res.error).toBeUndefined();
  });

  test('should previous state when no action type provided', () => {
    const initial = {
      submitting: false,
      credentials: {
        username: '',
        password: '',
      },
      error: {
        message: 'password must be at least 6 characters',
      },
    };
    const action = {
      payload: {},
    };
    const res = loginReducer(initial, action);
    expect(res).toEqual(initial);
  });
});
