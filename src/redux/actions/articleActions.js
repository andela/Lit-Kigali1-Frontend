import dotenv from 'dotenv';
import * as articleTypes from '../actions-types/articleTypes';
import fetchAPI from '../../helpers/fetchAPI';

dotenv.config();
const { API_URL } = process.env;

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
  return fetchAPI('/articles', {
    method: 'POST',
    body: {
      article,
    },
  })
    .then((data) => {
      dispatch(submitArticleFormSuccess(data));
      return data;
    })
    .catch((err) => {
      dispatch(submitArticleFormFailure(err));
      return err;
    });
};

export const addTag = payload => ({
  type: articleTypes.SUBMIT_ARTICLE_TAG,
  payload,
});

export const removeTag = payload => ({
  type: articleTypes.REMOVE_ARTICLE_TAG,
  payload,
});
export const fetchingArticle = payload => ({
  type: articleTypes.FETCHING_ARTICLE,
  payload,
});

export const shareSocial = payload => ({
  type: articleTypes.SHARE_SOCIAL_SUCCESS,
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

export const fetchingAllArticleSuccess = payload => ({
  type: articleTypes.FETCHING_ALL_ARTICLE_SUCCESS,
  payload,
});

export const fetchingAllArticleFailure = payload => ({
  type: articleTypes.FETCHING_ALL_ARTICLE_FAILURE,
  payload,
});

export const fetchArticles = ({ words, filterBy, page = 1 } = {}) => (dispatch) => {
  dispatch(fetchingArticle(true));
  let url = `/articles?page=${page}`;
  if (words) {
    url = `${url}&${filterBy || 'title'}=${words}`;
  }
  return fetchAPI(url)
    .then((data) => {
      dispatch(
        fetchingAllArticleSuccess({
          page: data.page,
          pages: data.pages,
          articlesList: data.articles,
          articlesCount: data.articlesCount,
        }),
      );
      return data;
    })
    .catch((err) => {
      dispatch(fetchingAllArticleFailure(err.message));
      return err;
    });
};

export const updateEditorState = payload => ({
  type: articleTypes.SET_ARTICLE_EDITOR,
  payload,
});

export const setEditArticle = payload => ({
  type: articleTypes.SET_EDIT_ARTICLE,
  payload,
});

export const fetchAndUpdateArticle = slug => (dispatch) => {
  dispatch(fetchingArticle(true));
  return fetchAPI(`/articles/${slug}`)
    .then((data) => {
      dispatch(setEditArticle(data.article));
      return data;
    })
    .catch((err) => {
      dispatch(fetchingArticleFailure(err.message));
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

export const share = ({ on, articleSlug }) => (dispatch) => {
  dispatch(shareSocial(on));
  return window.open(`${API_URL}/articles/${articleSlug}/share/${on}`);
};

export const updateArticle = (slug, article) => (dispatch) => {
  dispatch(submitArticleForm({ submitting: true }));
  return fetchAPI(`/articles/${slug}`, {
    method: 'PUT',
    body: {
      article,
    },
  })
    .then((data) => {
      dispatch(submitArticleFormSuccess(data));
      return data;
    })
    .catch((err) => {
      dispatch(submitArticleFormFailure(err.message));
      return err;
    });
};
