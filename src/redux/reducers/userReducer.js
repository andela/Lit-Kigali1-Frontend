import { LOGIN } from '../actions-types/userTypes';

const initialState = {
  loggedIn: false,
  user: {},
  articles: [],
  favorites: [],
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

export default userReducer;
