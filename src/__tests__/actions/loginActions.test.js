import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  inputHandler,
  validationResponse,
  validateCredentials,
} from '../../redux/actions/loginActions';
import {
  HANDLE_LOGIN_INPUT,
  INPUT_VALIDATION_FAILURE,
  INPUT_VALIDATION_SUCCESS,
} from '../../redux/actions-types/loginTypes';

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
  });
});
