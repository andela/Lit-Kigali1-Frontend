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
        singleArticle: {
          ...state.singleArticle,
          [payload.field]: payload.value,
        },
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
    case articleTypes.SUBMIT_ARTICLE_TAG:
      return {
        ...state,
        singleArticle: {
          ...state.singleArticle,
          tagList: [...state.singleArticle.tagList, payload.tag],
        },
      };
    case articleTypes.REMOVE_ARTICLE_TAG:
      state.singleArticle.tagList.splice(payload.index, 1);
      return {
        ...state,
        singleArticle: {
          ...state.singleArticle,
          tagList: [...state.singleArticle.tagList],
        },
      };
    default:
      return state;
  }
};

export default articleReducer;
