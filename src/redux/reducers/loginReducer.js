import {
  LOGIN_FAILURE,
  HANDLE_LOGIN_INPUT,
  INPUT_VALIDATION_FAILURE,
  INPUT_VALIDATION_SUCCESS,
  CLEAR_LOGIN,
} from '../actions-types';

const initialState = {
  credentials: {
    username: '',
    password: '',
  },
};

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CLEAR_LOGIN:
      return { ...initialState };
    case LOGIN_FAILURE:
      return { ...state, isLoggedIn: false, error: { ...state.error, ...payload.response } };
    case HANDLE_LOGIN_INPUT:
      return { ...state, credentials: { ...state.credentials, [payload.field]: payload.value } };
    case INPUT_VALIDATION_FAILURE:
      return { ...state, isLoggedIn: false, error: { ...state.error, ...payload.response } };
    case INPUT_VALIDATION_SUCCESS:
      return { ...state, isLoggedIn: false, error: {} };
    default:
      return { ...state };
  }
};

export default userReducer;
