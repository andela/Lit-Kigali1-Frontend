import * as types from '../actions-types/currentUserTypes';
import { currentUser as initialState } from '../initialState.json';

const currentUserReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.SET_USER_ACTION_FAILURE:
      return {
        ...state,
        message: payload,
        success: false,
        loading: false,
      };
    case types.SET_USER_ACTION_SUCCESS:
      console.log(payload);
      return {
        ...state,
        message: payload,
        success: true,
        loading: false,
      };
    case types.SET_CURRENT_USER:
      return {
        ...state,
        profile: payload,
        isLoggedIn: true,
      };
    case types.SET_CURRENT_USER_FOLLOWING:
      return {
        ...state,
        following: payload,
      };
    case types.SET_CURRENT_USER_DELETING_ARTICLE:
      return {
        ...state,
        deletingArticle: payload,
      };
    case types.DELETE_CURRENT_USER_ARTICLE:
      return {
        ...state,
        profile: {
          ...state.profile,
          articles: state.profile.articles.filter(article => article.slug !== payload.articleSlug),
        },
        message: payload.message,
      };
    default:
      return state;
  }
};

export default currentUserReducer;
