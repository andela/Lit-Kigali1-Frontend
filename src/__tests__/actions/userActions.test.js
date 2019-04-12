import configureStore from 'redux-mock-store'; // ES6 modules
import thunk from 'redux-thunk';
import nock from 'nock';
import 'isomorphic-fetch';
import * as userActions from '../../redux/actions/userActions';
import { signupUser } from '../../__mocks__/dummyData';
import {
  SET_USER_PROFILE,
  CLEAR_USER_PROFILE,
  SET_LOADING_PROFILE,
  FETCH_PROFILE_FAILURE,
  SET_USER_FOLLOWED,
} from '../../redux/actions-types/userTypes';

const { API_URL = 'http://localhost:3000/api/v1' } = process.env;
const mockStore = configureStore([thunk]);
let store;
jest.setTimeout(30000);

describe('userActions', () => {
  describe('synchronous', () => {
    beforeEach(() => {
      store = mockStore({});
    });

    test('should dispatch CLEAR_USER_PROFILE', () => {
      const expectedAction = {
        type: CLEAR_USER_PROFILE,
      };
      expect(userActions.clearUserProfile()).toEqual(expectedAction);
    });

    test('should dispatch SET_USER_PROFILE', () => {
      const expectedAction = {
        type: SET_USER_PROFILE,
        payload: signupUser,
      };
      expect(userActions.setUserProfile(signupUser)).toEqual(expectedAction);
    });

    test('should dispatch SET_LOADING_PROFILE', () => {
      const expectedAction = {
        type: SET_LOADING_PROFILE,
        payload: true,
      };
      expect(userActions.setProfileLoading(true)).toEqual(expectedAction);
    });

    test('should dispatch SET_USER_FOLLOWED', () => {
      const expectedAction = {
        type: SET_USER_FOLLOWED,
        payload: true,
      };
      expect(userActions.setUserFollow(true)).toEqual(expectedAction);
    });

    test('should dispatch FETCH_PROFILE_FAILURE', () => {
      const expectedAction = {
        type: FETCH_PROFILE_FAILURE,
        payload: 'FAILED',
      };
      expect(userActions.fetchUserProfileFailure('FAILED')).toEqual(expectedAction);
    });
  });

  describe('asynchronous actions', () => {
    beforeEach(() => {
      store = mockStore({});
    });
    afterEach(() => {
      nock.cleanAll();
    });
    test('should dispatch fetchUserProfile action - FAILED', () => {
      expect.assertions(2);
      const payload = 'username';
      nock(API_URL)
        .get(`/profiles/${payload}`)
        .reply(404, { status: 404, message: 'User not found' });
      const expectedActions = [
        { type: 'SET_LOADING_PROFILE', payload: true },
        {
          type: 'FETCH_PROFILE_FAILURE',
          payload: 'User not found',
        },
      ];
      return store.dispatch(userActions.fetchUserProfile(payload)).then((res) => {
        const actions = store.getActions();
        expect(actions).toEqual(expectedActions);
        expect(res.message).toBe(expectedActions[1].payload);
      });
    });

    test('should dispatch fetchUserProfile action - SUCCESS', () => {
      expect.assertions(2);
      const payload = 'olivier';
      nock(API_URL)
        .get(`/profiles/${payload}`)
        .reply(200, { status: 200, user: signupUser });
      const expectedActions = [
        { type: 'SET_LOADING_PROFILE', payload: true },
        {
          type: 'SET_USER_PROFILE',
          payload: signupUser,
        },
      ];
      return store.dispatch(userActions.fetchUserProfile(payload)).then((res) => {
        const actions = store.getActions();
        expect(actions).toEqual(expectedActions);
        expect(res.user).toEqual(expectedActions[1].payload);
      });
    });
  });
});
