import { SET_CURRENT_USER } from '../actions-types';

const initialState = {
  isLoggedIn: false,
  profile: {},
  articles: [],
  favorites: [],
};

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_CURRENT_USER:
      return { 
          ...state,
          profile: payload,
          isLoggedIn: true 
        };
    default:
      return state;
  }
};

export default userReducer;
