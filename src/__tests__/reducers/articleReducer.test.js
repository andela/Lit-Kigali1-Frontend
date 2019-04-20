import reducer from '../../redux/reducers/articleReducer';
import * as articleTypes from '../../redux/actions-types/articleTypes';
import { articleData, draftjsBody, jsonFormat } from '../../__mocks__/dummyData';
import store from '../../redux/store';

describe('articleReducer', () => {
  it('should return the initial `state`', () => {
    expect(reducer(undefined, {})).toEqual(store.getState().article);
  });

  it('should handle `CLEAR_ARTICLE_FORM`', () => {
    const expectedState = {
      type: articleTypes.CLEAR_ARTICLE_FORM,
    };
    expect(reducer({}, expectedState)).toEqual({});
  });

  it('should handle `SET_ARTICLE_FORM_INPUT`', () => {
    const payload = { field: 'username', value: 'usernane' };
    const expectedState = {
      type: articleTypes.SET_ARTICLE_FORM_INPUT,
      payload,
    };
    expect(reducer({}, expectedState)).toEqual({
      errors: [],
      message: '',
      createArticle: {
        [payload.field]: payload.value,
      },
    });
  });

  it('should handle `SUBMIT_ARTICLE_FORM_SUCCESS`', () => {
    const payload = {
      message: 'SUCCESS',
      article: {
        slug: 'hello-world',
      },
    };
    const expectedState = {
      type: articleTypes.SUBMIT_ARTICLE_FORM_SUCCESS,
      payload,
    };
    expect(reducer({}, expectedState)).toEqual({
      createArticle: {
        slug: 'hello-world',
      },
      message: 'SUCCESS',
      errors: [],
      submitting: false,
      success: true,
    });
  });

  it('should handle `SUBMIT_ARTICLE_FORM_FAILURE`', () => {
    const payload = { message: 'FAILURE' };
    const expectedState = {
      type: articleTypes.SUBMIT_ARTICLE_FORM_FAILURE,
      payload,
    };
    expect(reducer({}, expectedState)).toEqual({
      ...payload,
      createArticle: {},
      errors: payload,
      submitting: false,
      success: false,
    });
  });

  it('should handle `FETCHING_ARTICLE`', () => {
    const expectedState = {
      type: articleTypes.FETCHING_ARTICLE,
      payload: true,
    };
    expect(reducer({}, expectedState)).toEqual({
      loading: true,
    });
  });

  it('should handle `FETCHING_ARTICLE_SUCCESS`', () => {
    const payload = articleData;
    const expectedState = {
      type: articleTypes.FETCHING_ARTICLE_SUCCESS,
      payload,
    };
    expect(reducer({}, expectedState)).toEqual({
      singleArticle: payload,
      loading: false,
      success: true,
    });
  });

  it('should handle `FETCHING_ARTICLE_FAILURE`', () => {
    const payload = 'FAILURE';
    const expectedState = {
      type: articleTypes.FETCHING_ARTICLE_FAILURE,
      payload,
    };
    expect(reducer({}, expectedState)).toEqual({
      singleArticle: {},
      loading: false,
      success: false,
      message: payload,
    });
  });

  it('should handle `FETCHING_ALL_ARTICLE_SUCCESS`', () => {
    const payload = [articleData];
    const expectedState = {
      type: articleTypes.FETCHING_ALL_ARTICLE_SUCCESS,
      payload,
    };
    expect(reducer({}, expectedState)).toEqual({
      articles: payload,
      loading: false,
      success: true,
    });
  });

  it('should handle `FETCHING_ALL_ARTICLE_FAILURE`', () => {
    const payload = 'FAILURE';
    const expectedState = {
      type: articleTypes.FETCHING_ALL_ARTICLE_FAILURE,
      payload,
    };
    expect(reducer({}, expectedState)).toEqual({
      articlesList: [],
      loading: false,
      success: false,
      message: payload,
    });
  });

  it('should handle `SET_ARTICLE_RATE`', () => {
    const expectedState = {
      type: articleTypes.SET_ARTICLE_RATE,
      payload: articleData,
    };
    expect(reducer({}, expectedState)).toEqual({
      singleArticle: articleData,
    });
  });

  it('should handle `SET_ARTICLE_RATINGS_LOADING`', () => {
    const expectedState = {
      type: articleTypes.SET_ARTICLE_RATINGS_LOADING,
      payload: true,
    };
    expect(reducer({}, expectedState)).toEqual({
      loadingRatings: true,
    });
  });

  it('should handle `SET_ARTICLE_RATINGS`', () => {
    const expectedState = {
      type: articleTypes.SET_ARTICLE_RATINGS,
      payload: { ratings: [], article: {} },
    };
    expect(reducer({}, expectedState)).toEqual({
      ratings: [],
      singleArticle: {},
    });
  });

  it('should handle `SET_LIKES`', () => {
    const expectedState = {
      type: articleTypes.SET_LIKES,
      payload: { likes: [], count: 1, liked: true },
    };
    expect(reducer({}, expectedState)).toEqual({
      likes: [],
      likeCount: 1,
      liked: true,
    });
  });

  it('should handle `SET_DISLIKES`', () => {
    const expectedState = {
      type: articleTypes.SET_DISLIKES,
      payload: { dislikes: [], count: 1, disliked: true },
    };
    expect(reducer({}, expectedState)).toEqual({
      dislikes: [],
      dislikeCount: 1,
      disliked: true,
    });
  });

  it('should handle `LIKE_ARTICLE_FAILURE`', () => {
    const expectedState = {
      type: articleTypes.LIKE_ARTICLE_FAILURE,
      payload: 'Like Article Failed',
    };
    expect(reducer({}, expectedState)).toEqual({
      error: 'Like Article Failed',
    });
  });

  it('should handle `DISLIKE_ARTICLE_FAILURE`', () => {
    const expectedState = {
      type: articleTypes.DISLIKE_ARTICLE_FAILURE,
      payload: 'Dislike Article Failed',
    };
    expect(reducer({}, expectedState)).toEqual({
      error: 'Dislike Article Failed',
    });
  });

  it('should handle `SUBMIT_ARTICLE_TAG`', () => {
    const initialState = {
      loading: true,
      submitting: false,
      success: true,
      createArticle: {
        title: '',
        body: '',
        tagList: [],
      },
      articlesList: [],
    };
    const expectedState = {
      type: articleTypes.SUBMIT_ARTICLE_TAG,
      payload: {
        tag: 'headset',
      },
    };
    expect(reducer(initialState, expectedState)).toEqual({
      loading: true,
      submitting: false,
      success: true,
      createArticle: {
        title: '',
        body: '',
        tagList: [expectedState.payload.tag],
      },
      articlesList: [],
    });
  });

  it('should handle `SUBMIT_ARTICLE_TAG`', () => {
    const initialState = {
      loading: true,
      submitting: false,
      success: true,
      createArticle: {
        title: '',
        body: '',
        tagList: ['headset'],
      },
      articlesList: [],
    };
    const expectedState = {
      type: articleTypes.REMOVE_ARTICLE_TAG,
      payload: {
        index: 0,
      },
    };
    expect(reducer(initialState, expectedState)).toEqual({
      loading: true,
      submitting: false,
      success: true,
      createArticle: {
        title: '',
        body: '',
        tagList: [],
      },
      articlesList: [],
    });
  });

  it('should handle `SET_ARTICLE_EDITOR`', () => {
    const initialState = {
      loading: true,
      submitting: false,
      success: true,
      createArticle: {
        title: '',
        body: '',
        tagList: [],
      },
      articlesList: [],
    };
    const expectedState = {
      type: articleTypes.SET_ARTICLE_EDITOR,
      payload: {
        blocks: [],
        entityMap: {},
      },
    };
    expect(reducer(initialState, expectedState)).toEqual({
      loading: true,
      submitting: false,
      success: true,
      createArticle: {
        title: '',
        body: expectedState.payload,
        tagList: [],
      },
      articlesList: [],
    });
  });

  it('should handle `SET_EDIT_ARTICLE`', () => {
    const initialState = {
      loading: true,
      submitting: false,
      success: true,
      createArticle: {
        title: '',
        body: '',
        tagList: [],
      },
      articlesList: [],
    };
    const expectedState = {
      type: articleTypes.SET_EDIT_ARTICLE,
      payload: {
        body: jsonFormat,
        title: articleData.title,
        tagList: articleData.tagList,
      },
    };
    expect(reducer(initialState, expectedState)).toEqual({
      loading: true,
      submitting: false,
      success: true,
      createArticle: {
        title: articleData.title,
        body: draftjsBody[0],
        tagList: articleData.tagList,
      },
      articlesList: [],
    });
  });

  it('should handle `SET_SEARCHING_ARTICLE`', () => {
    const expectedState = {
      type: articleTypes.SET_SEARCHING_ARTICLE,
      payload: true,
    };
    expect(reducer({}, expectedState)).toEqual({
      searching: true,
    });
  });
});
