import {
  SET_CURRENT_USER,
  SET_CURRENT_USER_FOLLOWING,
  SET_USER_ACTION_SUCCESS,
  SET_USER_ACTION_FAILURE,
  HANDLE_PROFILE_INPUT,
  UPDATE_PROFILE_FAILURE,
  UPDATE_PROFILE_SUCCESS,
  SUBMIT_PROFILE_FORM,
} from '../actions-types/currentUserTypes';
import { currentUser as initialState } from '../initialState.json';

const currentUserReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_USER_ACTION_FAILURE:
      return {
        ...state,
        message: payload,
        success: false,
        loading: false,
      };
    case SET_USER_ACTION_SUCCESS:
      return {
        ...state,
        message: payload,
        success: true,
        loading: false,
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        profile: payload,
        isLoggedIn: true,
      };
    case SET_CURRENT_USER_FOLLOWING:
      return {
        ...state,
        following: payload,
      };
    case HANDLE_PROFILE_INPUT:
      return {
        ...state,
        profile: {
          ...state.profile,
          [payload.field]: payload.value,
        },
      };
    case SUBMIT_PROFILE_FORM:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        profile: {
          ...state.profile,
          ...payload.user,
        },
        message: payload.message,
        loading: false,
      };
    case UPDATE_PROFILE_FAILURE:
      return {
        ...state,
        message: 'Failed To Edit Your Profile',
        loading: false,
      };
    default:
      return state;
  }
};

export default currentUserReducer;
