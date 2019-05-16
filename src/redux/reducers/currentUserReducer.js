import * as types from '../actions-types/currentUserTypes';
import { currentUser as initialState } from '../initialState';

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
    case types.SET_RATING_ARTICLE:
      return {
        ...state,
        rating: payload,
      };
    case types.SET_NEXT_PATH:
      return {
        ...state,
        nextPath: payload,
      };
    case types.HANDLE_PROFILE_INPUT:
      return {
        ...state,
        profile: {
          ...state.profile,
          [payload.field]: payload.value,
        },
      };
    case types.SUBMIT_PROFILE_FORM:
      return {
        ...state,
        loading: true,
      };
    case types.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        profile: {
          ...state.profile,
          ...payload.user,
        },
        loading: false,
      };
    case types.UPDATE_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case types.SET_NOTIFICATION:
      return {
        ...state,
        notifications: {
          ...state.notifications,
          notificationList: payload.notifications,
          notificationsCount: payload.notificationsCount,
        },
      };
    default:
      return state;
  }
};

export default currentUserReducer;
