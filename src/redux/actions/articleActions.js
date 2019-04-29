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
      dispatch(submitArticleFormSuccess(data.article));
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

export const setLikes = payload => ({
  type: articleTypes.SET_LIKES,
  payload,
});

export const setDislikes = payload => ({
  type: articleTypes.SET_DISLIKES,
  payload,
});

export const fetchLikes = articleSlug => dispatch => fetchAPI(`/articles/${articleSlug}/likes`, { method: 'GET' })
  .then((data) => {
    dispatch(setLikes(data));
  })
  .catch(err => err);

export const fetchDislikes = articleSlug => dispatch => fetchAPI(`/articles/${articleSlug}/dislikes`, { method: 'GET' })
  .then((data) => {
    dispatch(setDislikes(data));
  })
  .catch(err => err);

export const fetchArticle = slug => (dispatch) => {
  dispatch(fetchingArticle(true));
  return fetchAPI(`/articles/${slug}`)
    .then((data) => {
      dispatch(fetchingArticleSuccess(data.article));
      dispatch(fetchLikes(data.article.slug));
      dispatch(fetchDislikes(data.article.slug));
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

export const fetchArticles = ({ page = 1 }) => (dispatch) => {
  dispatch(fetchingArticle(true));
  return fetchAPI(`/articles?page=${page}`)
    .then((data) => {
      dispatch(fetchingAllArticleSuccess({ ...data, status: undefined }));
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

export const likeArticlefailure = payload => ({
  type: articleTypes.LIKE_ARTICLE_FAILURE,
  payload,
});

export const likeArticle = articleSlug => dispatch => fetchAPI(`/articles/${articleSlug}/like`, { method: 'POST' })
  .then(() => {
    dispatch(fetchLikes(articleSlug));
    dispatch(fetchDislikes(articleSlug));
  })
  .catch((err) => {
    dispatch(likeArticlefailure(err));
  });

export const dislikeArticlefailure = payload => ({
  type: articleTypes.DISLIKE_ARTICLE_FAILURE,
  payload,
});

export const dislikeArticle = articleSlug => dispatch => fetchAPI(`/articles/${articleSlug}/dislike`, { method: 'POST' })
  .then(() => {
    dispatch(fetchLikes(articleSlug));
    dispatch(fetchDislikes(articleSlug));
  })
  .catch((err) => {
    dispatch(dislikeArticlefailure(err));
  });
