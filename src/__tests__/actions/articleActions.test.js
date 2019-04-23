import configureStore from 'redux-mock-store'; // ES6 modules
import thunk from 'redux-thunk';
import nock from 'nock';
import 'isomorphic-fetch';
import * as articleActions from '../../redux/actions/articleActions';
import * as articleTypes from '../../redux/actions-types/articleTypes';
import { articleData } from '../../__mocks__/dummyData';

const { API_URL = 'http://localhost:3000/api/v1' } = process.env;
const mockStore = configureStore([thunk]);
let store;
jest.setTimeout(30000);
// export const CLEAR_ARTICLE_FORM = 'CLEAR_ARTICLE_FORM';
// export const SET_ARTICLE_FORM_INPUT = 'SET_ARTICLE_FORM_INPUT';
// export const SUBMIT_ARTICLE_FORM = 'SUBMIT_ARTICLE_FORM';
// export const SUBMIT_ARTICLE_FORM_SUCCESS = 'SUBMIT_ARTICLE_FORM_SUCCESS';
// export const SUBMIT_ARTICLE_FORM_FAILURE = 'SUBMIT_ARTICLE_FORM_FAILURE';
// export const FETCHING_ARTICLE = 'FETCHING_ARTICLE';
// export const FETCHING_ARTICLE_SUCCESS = 'FETCHING_ARTICLE_SUCCESS';
// export const FETCHING_ARTICLE_FAILURE = 'FETCHING_ARTICLE_FAILURE';
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
          payload: 'Unauthorized access',
        },
      ];
      return store.dispatch(articleActions.submitArticle(payload)).then((res) => {
        const actions = store.getActions();
        expect(actions).toEqual(expectedActions);
        expect(res.status).toBe(401);
        expect(res.message).toBe(expectedActions[1].payload);
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
        .get('/articles')
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
      return store.dispatch(articleActions.fetchArticles()).then((res) => {
        const actions = store.getActions();
        expect(actions).toEqual(expectedActions);
        expect(res.status).toBe(401);
        expect(res.message).toBe(expectedActions[1].payload);
      });
    });

    test('should dispatch fetchArticles action - SUCCESS', () => {
      expect.assertions(3);
      nock(API_URL)
        .get('/articles')
        .reply(200, { status: 200, articles: [articleData] });
      const expectedActions = [
        {
          type: articleTypes.FETCHING_ARTICLE,
          payload: true,
        },
        {
          type: articleTypes.FETCHING_ALL_ARTICLE_SUCCESS,
          payload: [articleData],
        },
      ];
      return store.dispatch(articleActions.fetchArticles()).then((res) => {
        const actions = store.getActions();
        expect(actions).toEqual(expectedActions);
        expect(res.status).toBe(200);
        expect(res.articles).toEqual(expectedActions[1].payload);
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
        expect(actions[0].type).toEqual(articleTypes.FETCHING_ARTICLE);
        expect(actions[1].type).toEqual(articleTypes.SET_EDIT_ARTICLE);
      });
    });
  });
});
