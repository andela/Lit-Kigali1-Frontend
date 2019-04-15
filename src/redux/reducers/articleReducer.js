import * as articleTypes from '../actions-types/articleTypes';
import { article as initialState } from '../initialState.json';

const articleReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case articleTypes.CLEAR_ARTICLE_FORM:
      return {
        ...state,
      };

    case articleTypes.SET_ARTICLE_FORM_INPUT:
      return {
        ...state,
        [payload.field]: payload.value,
        errors: [],
        message: '',
      };
    case articleTypes.SUBMIT_ARTICLE_FORM_SUCCESS:
      return {
        ...state,
        message: payload.message,
        submitting: false,
      };
    case articleTypes.SUBMIT_ARTICLE_FORM_FAILURE:
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

export default articleReducer;
