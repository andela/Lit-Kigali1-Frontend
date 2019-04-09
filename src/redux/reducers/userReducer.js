import { 
  SET_PROFILE,
} from '../actions-types';

const initialState = {
  profile: {},
  articles: [],
  favorites: [],
};


const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_PROFILE:
      return {
        ...state,
        profile: payload
      };
    default:
      return { ...state };
  }
};

export default userReducer;

