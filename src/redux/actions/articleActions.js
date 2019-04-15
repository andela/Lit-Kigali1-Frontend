import * as articleTypes from '../actions-types/articleTypes';
import fetchAPI from '../../helpers/fetchAPI';

export const clearArticleForm = () => ({
  type: articleTypes.CLEAR_ARTICLE_FORM,
});

export const onArticleFormInput = payload => ({
  type: articleTypes.SET_ARTICLE_FORM_INPUT,
  payload,
});

export const submitArticleForm = payload => ({
  type: articleTypes.SUBMIT_ARTICLE_FORM,
  payload,
});

export const submitArticleFormSuccess = payload => ({
  type: articleTypes.SUBMIT_ARTICLE_FORM_SUCCESS,
  payload,
});

export const submitArticleFormFailure = payload => ({
  type: articleTypes.SUBMIT_ARTICLE_FORM_FAILURE,
  payload,
});

export const submitArticle = ({ article }) => (dispatch) => {
  dispatch(submitArticleForm({ submitting: true }));
  return fetchAPI('/articles', { method: 'POST', body: { article } })
    .then((data) => {
      dispatch(submitArticleFormSuccess(data));
      return data;
    })
    .catch((err) => {
      dispatch(submitArticleFormFailure(err.message));
      return err;
    });
};

export const fetchingArticle = payload => ({
  type: articleTypes.FETCHING_ARTICLE,
  payload,
});

/* Fetching article actions and thunk */

export const fetchingArticleSuccess = payload => ({
  type: articleTypes.FETCHING_ARTICLE_SUCCESS,
  payload,
});

export const fetchingArticleFailure = payload => ({
  type: articleTypes.FETCHING_ARTICLE_FAILURE,
  payload,
});

export const fetchArticle = slug => (dispatch) => {
  dispatch(fetchingArticle(true));
  return fetchAPI(`/articles/${slug}`)
    .then((data) => {
      dispatch(fetchingArticleSuccess(data.article));
      return data;
    })
    .catch((err) => {
      dispatch(fetchingArticleFailure(err.message));
      return err;
    });
};

export const fetchingAllArticleSuccess = payload => ({
  type: articleTypes.FETCHING_ALL_ARTICLE_SUCCESS,
  payload,
});

export const fetchingAllArticleFailure = payload => ({
  type: articleTypes.FETCHING_ALL_ARTICLE_FAILURE,
  payload,
});

export const fetchArticles = () => (dispatch) => {
  dispatch(fetchingArticle(true));
  return fetchAPI('/articles')
    .then((data) => {
      dispatch(fetchingAllArticleSuccess(data.articles));
      return data;
    })
    .catch((err) => {
      dispatch(fetchingAllArticleFailure(err.message));
      return err;
    });
};

export const setArticleRate = payload => ({
  type: articleTypes.SET_ARTICLE_RATE,
  payload,
});

export const setRatingLoading = payload => ({
  type: articleTypes.SET_ARTICLE_RATINGS_LOADING,
  payload,
});

export const setRatings = payload => ({
  type: articleTypes.SET_ARTICLE_RATINGS,
  payload,
});

export const fetchArticleRatings = ({ articleSlug }) => (dispatch) => {
  dispatch(setRatingLoading(true));
  return fetchAPI(`/articles/${articleSlug}/rating`, { method: 'GET' })
    .then((data) => {
      dispatch(setRatings(data));
      dispatch(setRatingLoading(false));
      return data;
    })
    .catch((err) => {
      dispatch(setRatingLoading(false));
      return err;
    });
};
