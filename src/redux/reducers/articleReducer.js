import * as articleTypes from '../actions-types/articleTypes';
import { article as initialState } from '../initialState';

const articleReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case articleTypes.CLEAR_ARTICLE_FORM:
      return {
        ...state,
      };
    case articleTypes.SET_ARTICLE_FORM_INPUT:
      return {
        ...state,
        createArticle: {
          ...state.createArticle,
          [payload.field]: payload.value,
        },
        errors: [],
        message: '',
      };

    case articleTypes.SUBMIT_ARTICLE_FORM_SUCCESS:
      return {
        ...state,
        createArticle: {
          ...state.createArticle,
          slug: payload.article.slug,
        },
        message: payload.message,
        errors: [],
        submitting: false,
        success: true,
      };
    case articleTypes.SUBMIT_ARTICLE_FORM_FAILURE:
      return {
        ...state,
        createArticle: {
          ...state.createArticle,
        },
        message: payload.message,
        errors: payload,
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
        singleArticle: payload,
        loading: false,
        success: true,
      };
    case articleTypes.FETCHING_ARTICLE_FAILURE:
      return {
        ...state,
        singleArticle: {},
        loading: false,
        success: false,
        message: payload,
      };
    case articleTypes.FETCHING_ALL_ARTICLE_SUCCESS:
      return {
        ...state,
        articlesList: payload.articles,
        loading: false,
        success: true,
      };
    case articleTypes.FETCHING_ALL_ARTICLE_FAILURE:
      return {
        ...state,
        articlesList: [],
        loading: false,
        success: false,
        message: payload,
      };
    case articleTypes.SET_ARTICLE_RATE:
      return {
        ...state,
        singleArticle: {
          ...state.singleArticle,
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
        singleArticle: {
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
    case articleTypes.SUBMIT_ARTICLE_TAG:
      return {
        ...state,
        createArticle: {
          ...state.createArticle,
          tagList: [...state.createArticle.tagList, payload.tag],
        },
      };
    case articleTypes.REMOVE_ARTICLE_TAG:
      state.createArticle.tagList.splice(payload.index, 1);
      return {
        ...state,
        createArticle: {
          ...state.createArticle,
          tagList: [...state.createArticle.tagList],
        },
      };
    case articleTypes.SET_ARTICLE_EDITOR:
      return {
        ...state,
        createArticle: {
          ...state.createArticle,
          body: payload,
        },
      };
    case articleTypes.SET_EDIT_ARTICLE:
      return {
        ...state,
        createArticle: {
          ...state.createArticle,
          body: JSON.parse(payload.body),
          title: payload.title,
          tagList: payload.tagList,
        },
      };

    case articleTypes.SET_SEARCHING_ARTICLE:
      return {
        ...state,
        searching: payload,
      };

    default:
      return state;
  }
};

export default articleReducer;
