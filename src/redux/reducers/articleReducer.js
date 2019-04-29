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
        errors: [],
        submitting: false,
        success: true,
      };
    case articleTypes.SUBMIT_ARTICLE_FORM_FAILURE:
      return {
        ...state,
        message: payload.message,
        errors: payload.errors || [],
        submitting: false,
        success: false,
      };
    case articleTypes.FETCHING_ARTICLE:
      return {
        ...state,
        loading: payload,
      };
    case articleTypes.FETCHING_ARTICLE_SUCCESS:
      return {
        ...state,
        article: payload,
        loading: false,
        success: true,
      };
    case articleTypes.FETCHING_ARTICLE_FAILURE:
      return {
        ...state,
        article: {},
        loading: false,
        success: false,
        message: payload,
      };
    case articleTypes.FETCHING_ALL_ARTICLE_SUCCESS:
      return {
        ...state,
        ...payload,
        loading: false,
        success: true,
      };
    case articleTypes.FETCHING_ALL_ARTICLE_FAILURE:
      return {
        ...state,
        articles: [],
        loading: false,
        success: false,
        message: payload,
      };
    case articleTypes.SET_ARTICLE_RATE:
      return {
        ...state,
        article: {
          ...state.article,
          ...payload,
        },
      };
    case articleTypes.SET_ARTICLE_RATINGS_LOADING:
      return {
        ...state,
        loadingRatings: payload,
      };
    case articleTypes.SET_ARTICLE_RATINGS:
      return {
        ...state,
        ratings: payload.ratings,
        article: {
          ...state.article,
          ...payload.article,
        },
      };
    case articleTypes.SET_LIKES:
      return {
        ...state,
        likes: payload.likes,
        likeCount: payload.count,
        liked: payload.liked,
      };
    case articleTypes.SET_DISLIKES:
      return {
        ...state,
        dislikes: payload.dislikes,
        dislikeCount: payload.count,
        disliked: payload.disliked,
      };
    case articleTypes.LIKE_ARTICLE_FAILURE:
      return {
        ...state,
        error: payload,
      };
    case articleTypes.DISLIKE_ARTICLE_FAILURE:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};

export default articleReducer;
