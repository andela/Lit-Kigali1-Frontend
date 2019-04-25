import {
  SET_USER_PROFILE,
  CLEAR_USER_PROFILE,
  SET_LOADING_PROFILE,
  FETCH_PROFILE_FAILURE,
  SET_USER_FOLLOWED,
} from '../actions-types/userTypes';
import { user as initialState } from '../initialState';

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CLEAR_USER_PROFILE:
      return {
        ...initialState,
      };
    case SET_LOADING_PROFILE:
      return {
        ...state,
        loading: payload,
      };
    case SET_USER_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case SET_USER_FOLLOWED:
      return {
        ...state,
        profile: {
          ...state.profile,
          ...payload,
        },
      };
    case FETCH_PROFILE_FAILURE:
      return {
        ...state,
        success: false,
        message: payload,
      };
    default:
      return state;
  }
};

export default userReducer;
