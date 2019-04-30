import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import 'isomorphic-fetch';
import * as articleActions from '../../redux/actions/articleActions';
import * as articleTypes from '../../redux/actions-types/articleTypes';
import { articleData, likeData, dislikeData } from '../../__mocks__/dummyData';

const { API_URL = 'http://localhost:3000/api/v1' } = process.env;
const mockStore = configureStore([thunk]);
let store;
jest.setTimeout(30000);
describe('articleActions', () => {
  describe('actions creators', () => {
    test('should dispatch `CLEAR_ARTICLE_FORM`', () => {
      const expectedAction = {
        type: articleTypes.CLEAR_ARTICLE_FORM,
      };
      expect(articleActions.clearArticleForm()).toEqual(expectedAction);
    });

    test('should dispatch `SET_ARTICLE_FORM_INPUT`', () => {
      const payload = { field: 'username', value: 'username' };
      const expectedAction = {
        type: articleTypes.SET_ARTICLE_FORM_INPUT,
        payload,
      };
      expect(articleActions.onArticleFormInput(payload)).toEqual(expectedAction);
    });

    test('should dispatch `SUBMIT_ARTICLE_FORM`', () => {
      const expectedAction = {
        type: articleTypes.SUBMIT_ARTICLE_FORM,
        payload: true,
      };
      expect(articleActions.submitArticleForm(true)).toEqual(expectedAction);
    });

    test('should dispatch `SUBMIT_ARTICLE_FORM_SUCCESS`', () => {
      const payload = { message: 'SUCCESS' };
      const expectedAction = {
        type: articleTypes.SUBMIT_ARTICLE_FORM_SUCCESS,
        payload,
      };
      expect(articleActions.submitArticleFormSuccess(payload)).toEqual(expectedAction);
    });

    test('should dispatch `SUBMIT_ARTICLE_FORM_FAILURE`', () => {
      const payload = { message: 'FAILURE' };
      const expectedAction = {
        type: articleTypes.SUBMIT_ARTICLE_FORM_FAILURE,
        payload,
      };
      expect(articleActions.submitArticleFormFailure(payload)).toEqual(expectedAction);
    });

    test('should dispatch `FETCHING_ARTICLE`', () => {
      const expectedAction = {
        type: articleTypes.FETCHING_ARTICLE,
        payload: true,
      };
      expect(articleActions.fetchingArticle(true)).toEqual(expectedAction);
    });

    test('should dispatch `FETCHING_ARTICLE_SUCCESS`', () => {
      const expectedAction = {
        type: articleTypes.FETCHING_ARTICLE_SUCCESS,
        payload: articleData,
      };
      expect(articleActions.fetchingArticleSuccess(articleData)).toEqual(expectedAction);
    });

    test('should dispatch `FETCHING_ARTICLE_FAILURE`', () => {
      const payload = 'FAILED';
      const expectedAction = {
        type: articleTypes.FETCHING_ARTICLE_FAILURE,
        payload,
      };
      expect(articleActions.fetchingArticleFailure(payload)).toEqual(expectedAction);
    });

    test('should dispatch `SET_LIKES`', () => {
      const payload = 'SET_LIKES';
      const expectedAction = {
        type: articleTypes.SET_LIKES,
        payload,
      };
      expect(articleActions.setLikes(payload)).toEqual(expectedAction);
    });

    test('should dispatch `SET_DISLIKES`', () => {
      const payload = 'SET_DISLIKES';
      const expectedAction = {
        type: articleTypes.SET_DISLIKES,
        payload,
      };
      expect(articleActions.setDislikes(payload)).toEqual(expectedAction);
    });

    test('should dispatch `addTag`', () => {
      const payload = 'tag';
      const expectedAction = {
        type: articleTypes.SUBMIT_ARTICLE_TAG,
        payload,
      };
      expect(articleActions.addTag(payload)).toEqual(expectedAction);
    });

    test('should dispatch `REMOVE_ARTICLE_TAG`', () => {
      const payload = 'tag';
      const expectedAction = {
        type: articleTypes.REMOVE_ARTICLE_TAG,
        payload,
      };
      expect(articleActions.removeTag(payload)).toEqual(expectedAction);
    });

    test('should dispatch `SET_ARTICLE_EDITOR`', () => {
      const payload = 'EDITOR';
      const expectedAction = {
        type: articleTypes.SET_ARTICLE_EDITOR,
        payload,
      };
      expect(articleActions.updateEditorState(payload)).toEqual(expectedAction);
    });
  });

  describe('asynchronous actions', () => {
    beforeEach(() => {
      store = mockStore({});
    });
    afterEach(() => {
      nock.cleanAll();
    });

    test('should dispatch submitArticle action - FAILED', () => {
      expect.assertions(3);
      const payload = { article: articleData };
      nock(API_URL)
        .post('/articles', { article: articleData })
        .reply(401, { status: 401, message: 'Unauthorized access' });
      const expectedActions = [
        {
          type: articleTypes.SUBMIT_ARTICLE_FORM,
          payload: { submitting: true },
        },
        {
          type: articleTypes.SUBMIT_ARTICLE_FORM_FAILURE,
          payload: {
            status: 401,
            message: 'Unauthorized access',
          },
        },
      ];
      return store.dispatch(articleActions.submitArticle(payload)).then((res) => {
        const actions = store.getActions();
        expect(actions).toEqual(expectedActions);
        expect(res.status).toBe(401);
        expect(res.message).toBe(expectedActions[1].payload.message);
      });
    });

    test('should dispatch submitArticle action - SUCCESS', () => {
      expect.assertions(3);
      const payload = { article: articleData };
      nock(API_URL)
        .post('/articles', { article: articleData })
        .reply(200, { status: 200, article: articleData });
      const expectedActions = [
        {
          type: articleTypes.SUBMIT_ARTICLE_FORM,
          payload: { submitting: true },
        },
        {
          type: articleTypes.SUBMIT_ARTICLE_FORM_SUCCESS,
          payload: {
            article: articleData,
            status: 200,
          },
        },
      ];
      return store.dispatch(articleActions.submitArticle(payload)).then((res) => {
        const actions = store.getActions();
        expect(actions).toEqual(expectedActions);
        expect(res.status).toBe(200);
        expect(res.article).toEqual(expectedActions[1].payload.article);
      });
    });

    test('should dispatch fetchArticle action - FAILED', () => {
      expect.assertions(3);
      const articleSlug = 'fake-article-slug';
      nock(API_URL)
        .get(`/articles/${articleSlug}`)
        .reply(404, { status: 404, message: 'Article not found' });
      const expectedActions = [
        {
          type: articleTypes.FETCHING_ARTICLE,
          payload: true,
        },
        {
          type: articleTypes.FETCHING_ARTICLE_FAILURE,
          payload: 'Article not found',
        },
      ];
      return store.dispatch(articleActions.fetchArticle(articleSlug)).then((res) => {
        const actions = store.getActions();
        expect(actions).toEqual(expectedActions);
        expect(res.status).toBe(404);
        expect(res.message).toBe(expectedActions[1].payload);
      });
    });

    test('should dispatch fetchArticle action - SUCCESS', () => {
      expect.assertions(3);
      const articleSlug = 'fake-article-slug';
      nock(API_URL)
        .get(`/articles/${articleSlug}`)
        .reply(200, { status: 200, article: articleData });
      const expectedActions = [
        {
          type: articleTypes.FETCHING_ARTICLE,
          payload: true,
        },
        {
          type: articleTypes.FETCHING_ARTICLE_SUCCESS,
          payload: articleData,
        },
      ];
      return store.dispatch(articleActions.fetchArticle(articleSlug)).then((res) => {
        const actions = store.getActions();
        expect(actions).toEqual(expectedActions);
        expect(res.status).toBe(200);
        expect(res.article).toEqual(expectedActions[1].payload);
      });
    });

    test('should dispatch fetchArticles action - FAILED', () => {
      expect.assertions(3);
      nock(API_URL)
        .get('/articles?page=1')
        .reply(401, { status: 401, message: 'Unauthorized access' });
      const expectedActions = [
        {
          type: articleTypes.FETCHING_ARTICLE,
          payload: true,
        },
        {
          type: articleTypes.FETCHING_ALL_ARTICLE_FAILURE,
          payload: 'Unauthorized access',
        },
      ];
      return store.dispatch(articleActions.fetchArticles(1)).then((res) => {
        const actions = store.getActions();
        expect(actions).toEqual(expectedActions);
        expect(res.status).toBe(401);
        expect(res.message).toBe(expectedActions[1].payload);
      });
    });

    test('should dispatch fetchArticles action - SUCCESS', () => {
      nock(API_URL)
        .get('/articles?page=1')
        .reply(200, { status: 200, articles: [articleData] });
      return store.dispatch(articleActions.fetchArticles(1)).then((res) => {
        expect(res.status).toBe(200);
      });
    });

    test('should dispatch ratings action - FAILURE', () => {
      expect.assertions(1);
      const articleSlug = 'article-slug';
      nock(API_URL)
        .get(`/articles/${articleSlug}/rating`)
        .reply(404, { status: 404 });
      const expectedActions = [
        {
          type: articleTypes.SET_ARTICLE_RATINGS_LOADING,
          payload: true,
        },
        {
          type: articleTypes.SET_ARTICLE_RATINGS_LOADING,
          payload: false,
        },
      ];
      return store.dispatch(articleActions.fetchArticleRatings({ articleSlug })).then(() => {
        const actions = store.getActions();
        expect(actions).toEqual(expectedActions);
      });
    });

    test('should dispatch fetchArticles action - FAILURE', () => {
      expect.assertions(1);
      const articleSlug = 'article-slug';
      nock(API_URL)
        .get(`/articles/${articleSlug}/rating`)
        .reply(404, { status: 404 });
      const expectedActions = [
        {
          type: articleTypes.SET_ARTICLE_RATINGS_LOADING,
          payload: true,
        },
        {
          type: articleTypes.SET_ARTICLE_RATINGS_LOADING,
          payload: false,
        },
      ];
      return store.dispatch(articleActions.fetchArticleRatings({ articleSlug })).then(() => {
        const actions = store.getActions();
        expect(actions).toEqual(expectedActions);
      });
    });

    test('should dispatch ratings action - SUCCESS', () => {
      expect.assertions(1);
      const articleSlug = 'article-slug';
      nock(API_URL)
        .get(`/articles/${articleSlug}/rating`)
        .reply(200, { status: 200, article: {}, ratings: [] });
      const expectedActions = [
        {
          type: articleTypes.SET_ARTICLE_RATINGS_LOADING,
          payload: true,
        },
        {
          type: articleTypes.SET_ARTICLE_RATINGS,
          payload: { status: 200, ratings: [], article: {} },
        },
        {
          type: articleTypes.SET_ARTICLE_RATINGS_LOADING,
          payload: false,
        },
      ];
      return store.dispatch(articleActions.fetchArticleRatings({ articleSlug })).then(() => {
        const actions = store.getActions();
        expect(actions).toEqual(expectedActions);
      });
    });

    test('Should dispatch FetchLikes', () => {
      expect.assertions(1);
      const articleSlug = 'article-slug';
      nock(API_URL)
        .get(`/articles/${articleSlug}/likes`)
        .reply(200, { status: 200, likes: [likeData] });
      const expectedAction = [
        {
          type: articleTypes.SET_LIKES,
          payload: { status: 200, likes: [likeData] },
        },
      ];
      return store.dispatch(articleActions.fetchLikes(articleSlug)).then(() => {
        const action = store.getActions();
        expect(action).toEqual(expectedAction);
      });
    });

    test('Should dispatch FetchDislikes', () => {
      expect.assertions(1);
      const articleSlug = 'article-slug';
      nock(API_URL)
        .get(`/articles/${articleSlug}/dislikes`)
        .reply(200, { status: 200, dislikes: [dislikeData] });
      const expectedAction = [
        {
          type: articleTypes.SET_DISLIKES,
          payload: { status: 200, dislikes: [dislikeData] },
        },
      ];
      return store.dispatch(articleActions.fetchDislikes(articleSlug)).then(() => {
        const action = store.getActions();
        expect(action).toEqual(expectedAction);
      });
    });

    test('should dispatch likeArticle action - FAILED', () => {
      expect.assertions(1);
      const articleSlug = 'fake-article-slug';
      nock(API_URL)
        .post(`/articles/${articleSlug}/like`)
        .reply(404, { status: 404, message: 'Article not found' });
      const expectedActions = [
        {
          type: articleTypes.LIKE_ARTICLE_FAILURE,
          payload: { status: 404, message: 'Article not found' },
        },
      ];
      return store.dispatch(articleActions.likeArticle(articleSlug)).then((res) => {
        const actions = store.getActions();
        expect(actions).toEqual(expectedActions);
      });
    });

    test('should dispatch dislikeArticle action - FAILED', () => {
      expect.assertions(1);
      const articleSlug = 'fake-article-slug';
      nock(API_URL)
        .post(`/articles/${articleSlug}/dislike`)
        .reply(404, { status: 404, message: 'Article not found' });
      const expectedActions = [
        {
          type: articleTypes.DISLIKE_ARTICLE_FAILURE,
          payload: { status: 404, message: 'Article not found' },
        },
      ];
      return store.dispatch(articleActions.dislikeArticle(articleSlug)).then(() => {
        const actions = store.getActions();
        expect(actions).toEqual(expectedActions);
      });
    });

    test('should dispatch likeArticle action - SUCCESS', () => {
      expect.assertions(1);
      const articleSlug = 'article-slug';
      nock(API_URL)
        .post(`/articles/${articleSlug}/like`)
        .reply(201, { status: 201, message: 'Liked' });
      return store.dispatch(articleActions.likeArticle(articleSlug)).then(() => {
        const actions = store.getActions();
        expect(actions).toEqual([]);
      });
    });

    test('should dispatch dislikeArticle action - SUCCESS', () => {
      expect.assertions(1);
      const articleSlug = 'article-slug';
      nock(API_URL)
        .post(`/articles/${articleSlug}/dislike`)
        .reply(201, { status: 201, message: 'Disliked' });
      return store.dispatch(articleActions.dislikeArticle(articleSlug)).then(() => {
        const actions = store.getActions();
        expect(actions).toEqual([]);
      });
    });

    test('should dispatch fetchAndUpdateArticle - SUCCESS', () => {
      const articleSlug = 'mock-article-slug';
      nock(API_URL)
        .get(`/articles/${articleSlug}`)
        .reply(200, { status: 200, article: articleData });
      return store.dispatch(articleActions.fetchAndUpdateArticle(articleSlug)).then((res) => {
        const actions = store.getActions();
        expect(res.status).toBe(200);
        expect(res.article).toEqual(articleData);
        expect(actions[0].type).toEqual(articleTypes.FETCHING_ARTICLE);
        expect(actions[1].type).toEqual(articleTypes.SET_EDIT_ARTICLE);
      });
    });

    test('should dispatch fetchAndUpdateArticle - SUCCESS', () => {
      const articleSlug = 'mock-article-slug';
      nock(API_URL)
        .get(`/articles/${articleSlug}`)
        .reply(404, { status: 404, message: 'Article not found' });
      return store.dispatch(articleActions.fetchAndUpdateArticle(articleSlug)).then((res) => {
        const actions = store.getActions();
        expect(res.status).toBe(404);
        expect(res.message).toEqual('Article not found');
        expect(actions[0].type).toEqual(articleTypes.FETCHING_ARTICLE);
        expect(actions[1].type).toEqual(articleTypes.FETCHING_ARTICLE_FAILURE);
      });
    });

    test('should dispatch fetchAndUpdateArticle - SUCCESS', () => {
      const articleSlug = 'mock-article-slug';
      nock(API_URL)
        .put(`/articles/${articleSlug}`)
        .reply(200, { status: 200, article: articleData });
      return store.dispatch(articleActions.updateArticle(articleSlug)).then((res) => {
        const actions = store.getActions();
        expect(res.status).toBe(200);
        expect(res.article).toEqual(articleData);
        expect(actions[0].type).toEqual(articleTypes.SUBMIT_ARTICLE_FORM);
        expect(actions[1].type).toEqual(articleTypes.SUBMIT_ARTICLE_FORM_SUCCESS);
      });
    });

    test('should dispatch fetchAndUpdateArticle - FAILURE', () => {
      const articleSlug = 'mock-article-slug';
      nock(API_URL)
        .put(`/articles/${articleSlug}`)
        .reply(404, { status: 404, message: 'article not found' });
      return store.dispatch(articleActions.updateArticle(articleSlug)).then((res) => {
        const actions = store.getActions();
        expect(res.status).toBe(404);
        expect(res.message).toEqual('article not found');
        expect(actions[0].type).toEqual(articleTypes.SUBMIT_ARTICLE_FORM);
        expect(actions[1].type).toEqual(articleTypes.SUBMIT_ARTICLE_FORM_FAILURE);
      });
    });
  });
});
