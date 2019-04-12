import {
  SET_CURRENT_USER,
  SET_CURRENT_USER_FOLLOWING,
  SET_USER_ACTION_SUCCESS,
  SET_USER_ACTION_FAILURE,
} from '../actions-types/currentUserTypes';
import { currentUser as initialState } from '../initialState.json';

const userReducer = (state = initialState, { type, payload }) => {
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
<<<<<<< HEAD
=======
    case SET_CURRENT_USER_FOLLOWING:
      return {
        ...state,
        following: payload,
      };
>>>>>>> feat: implement follow a user feature
    default:
      return state;
  }
};

<<<<<<< HEAD
export default currentUserReducer;
=======
export default userReducer;
>>>>>>> feat: implement follow a user feature
