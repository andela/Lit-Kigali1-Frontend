import { SET_PROFILE } from '../actions-types';
import { user as initialState } from '../initialState.json';

const userReducer = (state = initialState, { type, payload }) => {
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
