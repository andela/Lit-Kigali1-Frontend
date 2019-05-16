import nock from 'nock';
import 'isomorphic-fetch';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  handleCommentInput,
  submitCommentForm,
  addCommentSuccess,
  addCommentFailure,
  fetchAllCommentSucess,
  fetchAllCommentFailure,
  fetchAllComments,
  submitComment,
  deleteCommentSuccess,
  deleteCommentFailure,
  deletingComment,
  deleteComment,
  updatingComment,
  updatingCommentFailure,
  updatingCommentSuccess,
  setUpdateCommentBody,
  updateComment,
  commentLike,
  commentDislike,
  fetchCommentLikes,
  fetchCommentDislikes,
  fetchHistory,
} from '../../redux/actions/commentAction';
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
  FETCH_COMMENT_LIKES_SUCCESS,
  FETCH_COMMENT_DISLIKES_SUCCESS,
  COMMENT_LIKES_FAILURE,
  COMMENT_DISLIKES_FAILURE,
  FETCH_COMMENT_HISTORY_SUCCESS,
  FETCH_COMMENT_HISTORY_FAILURE,
} from '../../redux/actions-types/commentTypes';
import { commentData } from '../../__mocks__/dummyData';

const { API_URL = 'http://localhost:3000/api/v1' } = process.env;

describe('Comment Action Test', () => {
  const mockStore = configureStore([thunk]);
  let store;

  test('should dispatch "handleCommentInput"', () => {
    const payload = 'hello world';
    const res = handleCommentInput(payload);
    expect(res).toEqual({
      type: HANDLE_COMMENT_INPUT,
      payload,
    });
  });

  test('should dispatch "submitCommentForm"', () => {
    const res = submitCommentForm();
    expect(res).toEqual({
      type: SUBMIT_COMMENT_FORM,
    });
  });

  test('should dispatch "addCommentSuccess"', () => {
    const payload = {
      message: 'comment added',
      comment: 'hello worlf',
    };
    const res = addCommentSuccess(payload);
    expect(res).toEqual({
      type: ADD_COMMENT_SUCCESS,
      payload,
    });
  });

  test('should dispatch "addCommentFailure("', () => {
    const payload = {
      message: 'article not found',
      comment: 'hello worlf',
    };
    const res = addCommentFailure(payload);
    expect(res).toEqual({
      type: ADD_COMMENT_FAILURE,
      payload,
    });
  });

  test('should dispatch "fetchAllCommentSucess"', () => {
    const payload = {
      status: 200,
      comments: ['hello worlf'],
    };
    const res = fetchAllCommentSucess(payload);
    expect(res).toEqual({
      type: FETCH_ALL_COMMENTS_SUCCESS,
      payload,
    });
  });

  test('should dispatch "fetchAllCommentFailure"', () => {
    const payload = {
      message: 'comment added',
      comment: 'hello worlf',
    };
    const res = fetchAllCommentFailure(payload);
    expect(res).toEqual({
      type: FETCH_ALL_COMMENTS_FAILURE,
      payload,
    });
  });

  test('should dispatch "deleteCommentSuccess"', () => {
    const payload = {
      message: 'comment added',
      comment: 'hello worlf',
    };
    const res = deleteCommentSuccess(payload);
    expect(res).toEqual({
      type: DELETE_COMMENT_SUCCESS,
      payload,
    });
  });

  test('should dispatch "deleteCommentFailure"', () => {
    const payload = {
      message: 'comment added',
      comment: 'hello worlf',
    };
    const res = deleteCommentFailure(payload);
    expect(res).toEqual({
      type: DELETE_COMMENT_FAILURE,
      payload,
    });
  });

  test('should dispatch "deletingComment"', () => {
    const res = deletingComment();
    expect(res).toEqual({
      type: DELETING_COMMENT,
    });
  });

  test('should dispatch "updatingComment"', () => {
    const res = updatingComment();
    expect(res).toEqual({
      type: UPDATING_COMMENT,
    });
  });

  test('should dispatch "updatingCommentFailure"', () => {
    const payload = {
      message: 'comment added',
      comment: 'hello worlf',
    };
    const res = updatingCommentFailure(payload);
    expect(res).toEqual({
      type: UPDATE_COMMENT_FAILURE,
      payload,
    });
  });

  test('should dispatch "updatingCommentSuccess"', () => {
    const payload = {
      message: 'comment added',
      comment: 'hello worlf',
    };
    const res = updatingCommentSuccess(payload);
    expect(res).toEqual({
      type: UPDATE_COMMENT_SUCCESS,
      payload,
    });
  });

  test('should dispatch "setUpdateCommentBody"', () => {
    const payload = {
      message: 'comment added',
      comment: 'hello worlf',
    };
    const res = setUpdateCommentBody(payload);
    expect(res).toEqual({
      type: HANDLE_UPDATE_COMMENT_INPUT,
      payload,
    });
  });

  test('should get all comments', () => {
    const fakeSlug = 'fake-slug';
    store = mockStore({});

    nock(API_URL)
      .get(`/articles/${fakeSlug}/comments`)
      .reply(200, { status: 200, comments: commentData });
    return store.dispatch(fetchAllComments(fakeSlug)).then((res) => {
      const actions = store.getActions();
      expect(actions[0].type).toEqual(FETCH_ALL_COMMENTS_SUCCESS);
      expect(res.comments).toEqual(commentData);
    });
  });

  test('should not get all comments', () => {
    const fakeSlug = 'fake-slug';
    store = mockStore({});

    nock(API_URL)
      .get(`/articles/${fakeSlug}/comments`)
      .reply(404, { status: 404, message: 'comments not found' });
    return store.dispatch(fetchAllComments(fakeSlug)).then((res) => {
      const actions = store.getActions();
      expect(actions[0].type).toEqual(FETCH_ALL_COMMENTS_FAILURE);
      expect(res.message).toEqual('comments not found');
    });
  });

  test('should add comment', () => {
    const fakeSlug = 'fake-slug';
    const body = 'I like it';
    store = mockStore({});
    nock(API_URL)
      .post(`/articles/${fakeSlug}/comments`)
      .reply(201, { status: 201, comment: commentData[0] });
    return store.dispatch(submitComment(body, fakeSlug)).then((res) => {
      const actions = store.getActions();
      expect(actions[0].type).toEqual(SUBMIT_COMMENT_FORM);
      expect(actions[1].type).toEqual(ADD_COMMENT_SUCCESS);
      expect(res.comment).toEqual(commentData[0]);
    });
  });

  test('should not add comment', () => {
    const fakeSlug = 'fake-slug';
    const body = 'I like it';
    store = mockStore({});
    nock(API_URL)
      .post(`/articles/${fakeSlug}/comments`)
      .reply(404, { status: 404, message: 'article not found' });
    return store.dispatch(submitComment(body, fakeSlug)).then((res) => {
      const actions = store.getActions();
      expect(actions[0].type).toEqual(SUBMIT_COMMENT_FORM);
      expect(actions[1].type).toEqual(ADD_COMMENT_FAILURE);
      expect(res.message).toEqual('article not found');
    });
  });

  test('should delete comment', () => {
    const fakeSlug = 'fake-slug';
    const fakeId = 'fake-comment-id';
    store = mockStore({});
    nock(API_URL)
      .delete(`/articles/${fakeSlug}/comments/${fakeId}`)
      .reply(200, { status: 200, message: 'comment deleted successfully' });
    return store.dispatch(deleteComment(fakeId, fakeSlug)).then((res) => {
      const actions = store.getActions();
      expect(actions[0].type).toEqual(DELETING_COMMENT);
      expect(actions[1].type).toEqual(DELETE_COMMENT_SUCCESS);
      expect(res.message).toEqual('comment deleted successfully');
    });
  });

  test('should not delete comment', () => {
    const fakeSlug = 'fake-slug';
    const fakeId = 'fake-comment-id';
    store = mockStore({});
    nock(API_URL)
      .delete(`/articles/${fakeSlug}/comments/${fakeId}`)
      .reply(404, { status: 404, message: 'comment not found' });
    return store.dispatch(deleteComment(fakeId, fakeSlug)).then((res) => {
      const actions = store.getActions();
      expect(actions[0].type).toEqual(DELETING_COMMENT);
      expect(actions[1].type).toEqual(DELETE_COMMENT_FAILURE);
      expect(res.message).toEqual('comment not found');
    });
  });

  test('should update comment', () => {
    const body = 'I was mistaken, this is what I meant';
    const fakeSlug = 'fake-slug';
    const fakeId = 'fake-comment-id';
    store = mockStore({});
    nock(API_URL)
      .put(`/articles/${fakeSlug}/comments/${fakeId}`)
      .reply(200, { status: 200, message: 'comment update successfully' });
    return store.dispatch(updateComment(fakeId, fakeSlug, body)).then((res) => {
      const actions = store.getActions();
      expect(actions[0].type).toEqual(UPDATING_COMMENT);
      expect(actions[1].type).toEqual(UPDATE_COMMENT_SUCCESS);
      expect(res.message).toEqual('comment update successfully');
    });
  });

  test('should not update comment', () => {
    const body = 'I was mistaken, this is what I meant';
    const fakeSlug = 'fake-slug';
    const fakeId = 'fake-comment-id';
    store = mockStore({});
    nock(API_URL)
      .put(`/articles/${fakeSlug}/comments/${fakeId}`)
      .reply(404, { status: 404, message: 'comment not found' });
    return store.dispatch(updateComment(fakeId, fakeSlug, body)).then((res) => {
      const actions = store.getActions();
      expect(actions[0].type).toEqual(UPDATING_COMMENT);
      expect(actions[1].type).toEqual(UPDATE_COMMENT_FAILURE);
      expect(res.message).toEqual('comment not found');
    });
  });

  test('Should like a comment', () => {
    const articleSlug = 'fake-slug';
    const commentId = 'comment-id';
    store = mockStore({});
    nock(API_URL)
      .post(`/articles/${articleSlug}/comments/${commentId}/like`)
      .reply(201, { status: 201, message: 'Liked' });
    return store.dispatch(commentLike(articleSlug, commentId)).then(() => {
      expect(store.getActions()).toEqual([]);
    });
  });

  test('Should not like a comment', () => {
    const articleSlug = 'fake-slug';
    const commentId = 'comment-id';
    store = mockStore({});
    const expectedAction = [
      {
        type: COMMENT_LIKES_FAILURE,
        payload: { status: 404, message: 'Comment not found' },
      },
    ];
    nock(API_URL)
      .post(`/articles/${articleSlug}/comments/${commentId}/like`)
      .reply(404, { status: 404, message: 'Comment not found' });
    return store.dispatch(commentLike(articleSlug, commentId)).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  test('Should dislike a comment', () => {
    const articleSlug = 'fake-slug';
    const commentId = 'comment-id';
    store = mockStore({});
    nock(API_URL)
      .post(`/articles/${articleSlug}/comments/${commentId}/dislike`)
      .reply(201, { status: 201, message: 'Disliked' });
    return store.dispatch(commentDislike(articleSlug, commentId)).then(() => {
      expect(store.getActions()).toEqual([]);
    });
  });

  test('Should not dislike a comment', () => {
    const articleSlug = 'fake-slug';
    const commentId = 'comment-id';
    store = mockStore({});
    const expectedAction = [
      {
        type: COMMENT_DISLIKES_FAILURE,
        payload: { status: 404, message: 'Comment not found' },
      },
    ];
    nock(API_URL)
      .post(`/articles/${articleSlug}/comments/${commentId}/dislike`)
      .reply(404, { status: 404, message: 'Comment not found' });
    return store.dispatch(commentDislike(articleSlug, commentId)).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  test('Should fetch likes', () => {
    const articleSlug = 'fake-slug';
    const commentId = 'comment-id';
    store = mockStore({});
    const expectedAction = [
      {
        type: FETCH_COMMENT_LIKES_SUCCESS,
        payload: { status: 201, message: 'likes' },
      },
    ];
    nock(API_URL)
      .get(`/articles/${articleSlug}/comments/${commentId}/like`)
      .reply(201, { status: 201, message: 'likes' });
    return store.dispatch(fetchCommentLikes(articleSlug, commentId)).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  test('Should fetch dislikes', () => {
    const articleSlug = 'fake-slug';
    const commentId = 'comment-id';
    store = mockStore({});
    const expectedAction = [
      {
        type: FETCH_COMMENT_DISLIKES_SUCCESS,
        payload: { status: 201, message: 'dislikes' },
      },
    ];
    nock(API_URL)
      .get(`/articles/${articleSlug}/comments/${commentId}/dislike`)
      .reply(201, { status: 201, message: 'dislikes' });
    return store.dispatch(fetchCommentDislikes(articleSlug, commentId)).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  test('should fetch comment history', () => {
    const articleSlug = 'fake-slug';
    const commentId = 'fake-comment-id';
    store = mockStore({});
    nock(API_URL)
      .get(`/articles/${articleSlug}/comments/${commentId}/edited`)
      .reply(200, { status: 200, editedComment: {} });
    return store.dispatch(fetchHistory(articleSlug, commentId)).then((res) => {
      const actions = store.getActions();
      expect(actions[0].type).toEqual(FETCH_COMMENT_HISTORY_SUCCESS);
      expect(res.status).toEqual(200);
    });
  });

  test('should not fetch comment history', () => {
    const articleSlug = 'fake-slug';
    const commentId = 'fake-comment-id';
    store = mockStore({});
    nock(API_URL)
      .get(`/articles/${articleSlug}/comments/${commentId}/edited`)
      .reply(404, { status: 404, message: '' });
    return store.dispatch(fetchHistory(articleSlug, commentId)).then((res) => {
      const actions = store.getActions();
      expect(actions[0].type).toEqual(FETCH_COMMENT_HISTORY_FAILURE);
      expect(res.status).toEqual(404);
    });
  });
});
