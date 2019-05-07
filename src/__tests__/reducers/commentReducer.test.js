import commentReducer from '../../redux/reducers/commentReducer';
import {
  HANDLE_COMMENT_INPUT,
  SUBMIT_COMMENT_FORM,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  FETCH_ALL_COMMENTS_SUCCESS,
  FETCH_ALL_COMMENTS_FAILURE,
  FETCHING_COMMENTS,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAILURE,
  DELETING_COMMENT,
  UPDATING_COMMENT,
  UPDATE_COMMENT_SUCCESS,
  UPDATE_COMMENT_FAILURE,
  HANDLE_UPDATE_COMMENT_INPUT,
  FETCH_COMMENT_HISTORY_SUCCESS,
  FETCH_COMMENT_HISTORY_FAILURE,
} from '../../redux/actions-types/commentTypes';

import { comment as initialState } from '../../redux/initialState.json';

describe('commentReducer Test', () => {
  test('should dispatch "HANDLE_COMMENT_INPUT"', () => {
    const action = {
      type: HANDLE_COMMENT_INPUT,
      payload: {
        body: 'Hello miss john good article',
      },
    };
    const res = commentReducer(initialState, action);
    expect(res).toEqual({
      ...initialState,
      body: action.payload.body,
    });
  });

  test('should dispatch "SUBMIT_COMMENT_FORM"', () => {
    const action = {
      type: SUBMIT_COMMENT_FORM,
    };
    const res = commentReducer(initialState, action);
    expect(res).toEqual({
      ...initialState,
      submitting: true,
    });
  });

  test('should dispatch "ADD_COMMENT_FAILURE"', () => {
    const action = {
      type: ADD_COMMENT_FAILURE,
      payload: {
        status: 404,
        message: 'not found',
      },
    };
    const res = commentReducer(initialState, action);
    expect(res).toEqual({
      ...initialState,
      submitting: false,
      success: false,
      error: action.payload,
    });
  });

  test('should dispatch "ADD_COMMENT_SUCCESS"', () => {
    const action = {
      type: ADD_COMMENT_SUCCESS,
      payload: {
        comment: {},
        message: 'comment added',
      },
    };
    const res = commentReducer(initialState, action);
    expect(res).toEqual({
      ...initialState,
      success: true,
      submitting: false,
      body: '',
      message: action.payload.message,
      newComment: action.payload.comment,
    });
  });

  test('should dispatch "FETCH_ALL_COMMENTS_FAILURE"', () => {
    const action = {
      type: FETCH_ALL_COMMENTS_FAILURE,
      payload: {
        message: 'article not found',
      },
    };
    const res = commentReducer(initialState, action);
    expect(res).toEqual({
      ...initialState,
      submitting: false,
      message: action.payload.message,
      fetching: false,
    });
  });

  test('should dispatch "FETCH_ALL_COMMENTS_SUCCESS"', () => {
    const action = {
      type: FETCH_ALL_COMMENTS_SUCCESS,
      payload: {
        message: 'article not found',
        comments: ['allcomments'],
      },
    };
    const res = commentReducer(initialState, action);
    expect(res).toEqual({
      ...initialState,
      message: action.payload.message,
      commentList: action.payload.comments,
      fetching: false,
    });
  });

  test('should dispatch "FETCHING_COMMENTS"', () => {
    const action = {
      type: FETCHING_COMMENTS,
    };
    const res = commentReducer(initialState, action);
    expect(res).toEqual({
      ...initialState,
      fetching: true,
    });
  });

  test('should dispatch "DELETING_COMMENT"', () => {
    const action = {
      type: DELETING_COMMENT,
    };
    const res = commentReducer(initialState, action);
    expect(res).toEqual({
      ...initialState,
      deleting: true,
    });
  });

  test('should dispatch "DELETE_COMMENT_SUCCESS"', () => {
    const action = {
      type: DELETE_COMMENT_SUCCESS,
      payload: {
        message: 'comment deleted',
      },
    };
    const res = commentReducer(initialState, action);
    expect(res).toEqual({
      ...initialState,
      deleting: false,
      message: action.payload.message,
    });
  });

  test('should dispatch "DELETE_COMMENT_FAILURE"', () => {
    const action = {
      type: DELETE_COMMENT_FAILURE,
      payload: {
        message: 'comment not found',
      },
    };
    const res = commentReducer(initialState, action);
    expect(res).toEqual({
      ...initialState,
      deleting: false,
      message: action.payload.message,
    });
  });

  test('should dispatch "UPDATING_COMMENT"', () => {
    const action = {
      type: UPDATING_COMMENT,
      payload: {
        message: 'comment not found',
      },
    };
    const res = commentReducer(initialState, action);
    expect(res).toEqual({
      ...initialState,
      updating: true,
    });
  });

  test('should dispatch "UPDATE_COMMENT_FAILURE"', () => {
    const action = {
      type: UPDATE_COMMENT_FAILURE,
      payload: {
        message: 'comment not found',
        status: '404',
      },
    };
    const res = commentReducer(initialState, action);
    expect(res).toEqual({
      ...initialState,
      message: action.payload.message,
      error: action.payload,
      updating: false,
    });
  });

  test('should dispatch "UPDATE_COMMENT_SUCCESS"', () => {
    const action = {
      type: UPDATE_COMMENT_SUCCESS,
      payload: {
        message: 'comment updated',
        status: '404',
      },
    };
    const res = commentReducer(initialState, action);
    expect(res).toEqual({
      ...initialState,
      message: action.payload.message,
      updating: false,
    });
  });

  test('should dispatch "HANDLE_UPDATE_COMMENT_INPUT"', () => {
    const action = {
      type: HANDLE_UPDATE_COMMENT_INPUT,
      payload: 'Nono I was mistaken',
    };
    const res = commentReducer(initialState, action);
    expect(res).toEqual({
      ...initialState,
      updateBody: action.payload,
    });
  });

  test('should dispatch "FETCH_COMMENT_HISTORY_SUCCESS"', () => {
    const payload = {
      editedComment: {
        commentId: '1231234',
        body: 'asasfdasdf',
      },
    };
    const action = {
      type: FETCH_COMMENT_HISTORY_SUCCESS,
      payload,
    };
    const res = commentReducer(initialState, action);
    expect(res).toEqual({ ...initialState, originalComment: payload.editedComment });
  });

  test('should dispatch "FETCH_COMMENT_HISTORY_FAILURE"', () => {
    const payload = {
      message: 'some error message',
    };
    const action = {
      type: FETCH_COMMENT_HISTORY_FAILURE,
      payload,
    };
    const res = commentReducer(initialState, action);
    expect(res).toEqual({ ...initialState, message: payload.message });
  });
});
