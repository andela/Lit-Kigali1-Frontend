import configureStore from 'redux-mock-store'; // ES6 modules
import thunk from 'redux-thunk';
import nock from 'nock';
import 'isomorphic-fetch';
import * as currentUserActions from '../../redux/actions/currentUserActions';
import { signupUser } from '../../__mocks__/dummyData';
import {
  SET_CURRENT_USER,
  SET_CURRENT_USER_FOLLOWING,
  SET_USER_ACTION_SUCCESS,
  SET_USER_ACTION_FAILURE,
  SUBMIT_PROFILE_FORM,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILURE,
} from '../../redux/actions-types/currentUserTypes';
import { SET_USER_FOLLOWED } from '../../redux/actions-types/userTypes';

const { API_URL = 'http://localhost:3000/api/v1' } = process.env;
const mockStore = configureStore([thunk]);
let store;
jest.setTimeout(30000);

describe('currentUserActions', () => {
  describe('synchronous actions', () => {
    test('should dispatch `SET_CURRENT_USER`', () => {
      const expectedAction = {
        type: SET_CURRENT_USER,
        payload: signupUser,
      };
      expect(currentUserActions.setCurrentUser(signupUser)).toEqual(expectedAction);
    });

    test('should dispatch `SET_CURRENT_USER_FOLLOWING`', () => {
      const expectedAction = {
        type: SET_CURRENT_USER_FOLLOWING,
        payload: true,
      };
      expect(currentUserActions.setUserFollowing(true)).toEqual(expectedAction);
    });

    test('should dispatch `SET_USER_ACTION_FAILURE`', () => {
      const expectedAction = {
        type: SET_USER_ACTION_FAILURE,
        payload: 'FAILED',
      };
      expect(currentUserActions.onUserActionFailure('FAILED')).toEqual(expectedAction);
    });

    test('should dispatch `SET_USER_ACTION_SUCCESS`', () => {
      const expectedAction = {
        type: SET_USER_ACTION_SUCCESS,
        payload: 'SUCCESS',
      };
      expect(currentUserActions.onUserActionSuccess('SUCCESS')).toEqual(expectedAction);
    });
  });

  describe('asynchronous actions', () => {
    beforeEach(() => {
      store = mockStore({});
    });
    afterEach(() => {
      nock.cleanAll();
    });

    test('should dispatch fetchCurrentUser action - FAILED', () => {
      expect.assertions(2);
      nock(API_URL)
        .get('/user')
        .reply(401, { status: 401, message: 'Unauthorized access' });
      const expectedActions = [
        {
          type: SET_USER_ACTION_FAILURE,
          payload: 'Unauthorized access',
        },
      ];
      return store.dispatch(currentUserActions.fetchCurrentUser()).then((res) => {
        const actions = store.getActions();
        expect(actions).toEqual(expectedActions);
        expect(res.message).toBe(expectedActions.payload);
      });
    });

    test('should dispatch fetchCurrentUser action - SUCCESS', () => {
      expect.assertions(2);
      nock(API_URL)
        .get('/user')
        .reply(200, { status: 200, user: signupUser });
      const expectedActions = [{ type: 'SET_CURRENT_USER', payload: signupUser }];
      return store.dispatch(currentUserActions.fetchCurrentUser()).then((res) => {
        const actions = store.getActions();
        expect(actions).toEqual(expectedActions);
        expect(res.user).toEqual(expectedActions.payload);
      });
    });

    test('should dispatch fetchCurrentUser action - FAILED', () => {
      expect.assertions(2);
      nock(API_URL)
        .get('/user')
        .reply(401, { status: 401, message: 'Unauthorized access' });
      const expectedActions = [
        {
          type: SET_USER_ACTION_FAILURE,
          payload: 'Unauthorized access',
        },
      ];
      return store.dispatch(currentUserActions.fetchCurrentUser()).then((res) => {
        const actions = store.getActions();
        expect(actions).toEqual(expectedActions);
        expect(res.message).toBe(expectedActions.payload);
      });
    });

    test('should dispatch fetchCurrentUser action - SUCCESS', () => {
      expect.assertions(2);
      nock(API_URL)
        .get('/user')
        .reply(200, { status: 200, user: signupUser });
      const expectedActions = [{ type: 'SET_CURRENT_USER', payload: signupUser }];
      return store.dispatch(currentUserActions.fetchCurrentUser()).then((res) => {
        const actions = store.getActions();
        expect(actions).toEqual(expectedActions);
        expect(res.user).toEqual(expectedActions.payload);
      });
    });

    test('should dispatch onFollow action - FAILED', () => {
      expect.assertions(2);
      const payload = { username: 'username', method: 'POST' };
      nock(API_URL)
        .post(`/profiles/${payload.username}/follow`)
        .reply(404, { status: 404, message: 'User not found' });
      const expectedActions = [
        {
          type: SET_CURRENT_USER_FOLLOWING,
          payload: true,
        },
        {
          type: SET_USER_ACTION_FAILURE,
          payload: 'User not found',
        },
        {
          type: SET_CURRENT_USER_FOLLOWING,
          payload: false,
        },
      ];
      return store.dispatch(currentUserActions.onFollow(payload)).then((res) => {
        const actions = store.getActions();
        expect(actions).toEqual(expectedActions);
        expect(res.message).toBe(expectedActions.payload);
      });
    });

    test('should dispatch onFollow action - SUCCESS', () => {
      expect.assertions(2);
      const payload = { username: 'username', method: 'POST' };
      nock(API_URL)
        .post(`/profiles/${payload.username}/follow`)
        .reply(200, {
          status: 200,
          user: {
            followed: true,
            followers: 1,
            followees: 2,
          },
          message: `You followed ${payload.username}`,
        });
      const expectedActions = [
        {
          type: SET_CURRENT_USER_FOLLOWING,
          payload: true,
        },
        {
          type: SET_USER_FOLLOWED,
          payload: {
            followed: true,
            followers: 1,
            followees: 2,
          },
        },
        {
          type: SET_USER_ACTION_SUCCESS,
          payload: `You followed ${payload.username}`,
        },
        {
          type: SET_CURRENT_USER_FOLLOWING,
          payload: false,
        },
      ];
      return store.dispatch(currentUserActions.onFollow(payload)).then((res) => {
        const actions = store.getActions();
        expect(actions).toEqual(expectedActions);
        expect(res.message).toBe(expectedActions.payload);
      });
    });
  });
});
