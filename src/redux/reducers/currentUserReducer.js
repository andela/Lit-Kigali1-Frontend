import { SET_CURRENT_USER } from '../actions-types';
import initialState from '../initialState';

const { currentUser } = initialState;

const currentUserReducer = (state = currentUser, { type, payload }) => {
  switch (type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        profile: payload,
        isLoggedIn: true,
      };
    default:
      return state;
  }
};

export default currentUserReducer;
