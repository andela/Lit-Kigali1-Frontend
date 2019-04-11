import { SET_PROFILE } from '../actions-types';
import { user } from '../initialState.json';

const userReducer = (state = user, { type, payload }) => {
  switch (type) {
    case SET_PROFILE:
      return {
        ...state,
        profile: payload,
      };
    default:
      return state;
  }
};

export default userReducer;
