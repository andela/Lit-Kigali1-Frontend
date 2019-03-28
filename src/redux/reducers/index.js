import { ADD_ARTICLE } from "../actions-types";
const initialState = {
  articles: []
};
const rootReducer = (state = initialState, action) => {
  if (action.type === ADD_ARTICLE) {
    return { ...state, articles: [...state.articles, action.payload] };
  }
  return state;
};
export default rootReducer;
