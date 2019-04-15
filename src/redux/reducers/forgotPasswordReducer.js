import {
  FORGOT_PASSWORD_FORM,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
  CLEAR_FORGOT_PASSWORD_FORM,
  SUBMIT_FORGOT_PASSWORD_FORM,
} from '../actions-types/forgotPasswordTypes';
import { forgotPassword as initialState } from '../initialState.json';

const forgotPasswordReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CLEAR_FORGOT_PASSWORD_FORM:
      return initialState;
    case SUBMIT_FORGOT_PASSWORD_FORM:
      return {
        ...state,
        submitting: payload.submitting,
      };
    case FORGOT_PASSWORD_FORM:
      return {
        ...state,
        [payload.field]: payload.value,
        errors: [],
        message: '',
      };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        successMessage: payload.message,
        submitting: false,
      };
    case FORGOT_PASSWORD_FAILURE:
      return {
        ...state,
        message: payload.message,
        errors: payload.errors || [],
        submitting: false,
      };
    default:
      return state;
  }
};

export default forgotPasswordReducer;
