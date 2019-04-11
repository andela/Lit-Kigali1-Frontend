import { SET_CURRENT_USER } from '../actions-types';
import { currentUser } from '../initialState.json';

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
