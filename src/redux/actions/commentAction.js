import {
  HANDLE_COMMENT_INPUT,
  SUBMIT_COMMENT_FORM,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  FETCH_ALL_COMMENTS_FAILURE,
  FETCH_ALL_COMMENTS_SUCCESS,
  DELETE_COMMENT_FAILURE,
  DELETE_COMMENT_SUCCESS,
  DELETING_COMMENT,
  UPDATE_COMMENT_FAILURE,
  UPDATE_COMMENT_SUCCESS,
  UPDATING_COMMENT,
  HANDLE_UPDATE_COMMENT_INPUT,
} from '../actions-types/commentTypes';
import fetchAPI from '../../helpers/fetchAPI';

export const handleCommentInput = payload => ({
  type: HANDLE_COMMENT_INPUT,
  payload,
});

export const submitCommentForm = () => ({
  type: SUBMIT_COMMENT_FORM,
});

export const addCommentSuccess = payload => ({
  type: ADD_COMMENT_SUCCESS,
  payload,
});

export const addCommentFailure = payload => ({
  type: ADD_COMMENT_FAILURE,
  payload,
});

export const fetchAllCommentSucess = payload => ({
  type: FETCH_ALL_COMMENTS_SUCCESS,
  payload,
});

export const fetchAllCommentFailure = payload => ({
  type: FETCH_ALL_COMMENTS_FAILURE,
  payload,
});

export const fetchAllComments = articleSlug => dispatch => fetchAPI(`/articles/${articleSlug}/comments`, {
  method: 'GET',
})
  .then((data) => {
    dispatch(fetchAllCommentSucess(data));
    return data;
  })
  .catch((err) => {
    dispatch(fetchAllCommentFailure(err));
    return err;
  });

export const submitComment = (body, articleSlug) => (dispatch) => {
  dispatch(submitCommentForm());
  return fetchAPI(`/articles/${articleSlug}/comments`, {
    method: 'POST',
    body: {
      comment: {
        body,
      },
    },
  })
    .then((data) => {
      dispatch(addCommentSuccess(data));
      dispatch(fetchAllComments(articleSlug));
      return data;
    })
    .catch((err) => {
      dispatch(addCommentFailure(err));
      return err;
    });
};

export const deleteCommentSuccess = payload => ({
  type: DELETE_COMMENT_SUCCESS,
  payload,
});

export const deleteCommentFailure = payload => ({
  type: DELETE_COMMENT_FAILURE,
  payload,
});

export const deletingComment = () => ({
  type: DELETING_COMMENT,
});

export const deleteComment = (id, articleSlug) => (dispatch) => {
  dispatch(deletingComment());
  return fetchAPI(`/articles/${articleSlug}/comments/${id}`, {
    method: 'DELETE',
  }).then((data) => {
    dispatch(deleteCommentSuccess(data));
    dispatch(fetchAllComments(articleSlug));
    return data;
  })
    .catch((err) => {
      dispatch(deleteCommentFailure(err));
      return err;
    });
};

export const updatingComment = () => ({
  type: UPDATING_COMMENT,
});

export const updatingCommentFailure = payload => ({
  type: UPDATE_COMMENT_FAILURE,
  payload,
});

export const updatingCommentSuccess = payload => ({
  type: UPDATE_COMMENT_SUCCESS,
  payload,
});

export const setUpdateCommentBody = payload => ({
  type: HANDLE_UPDATE_COMMENT_INPUT,
  payload,
});

export const updateComment = (id, articleSlug, body) => (dispatch) => {
  dispatch(updatingComment());
  return fetchAPI(`/articles/${articleSlug}/comments/${id}`, {
    method: 'PUT',
    body: {
      comment: {
        body,
      },
    },
  })
    .then((data) => {
      dispatch(updatingCommentSuccess(data));
      dispatch(fetchAllComments(articleSlug));
      return data;
    })
    .catch((err) => {
      dispatch(updatingCommentFailure(err));
      return err;
    });
};
