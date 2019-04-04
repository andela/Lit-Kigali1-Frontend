import { ADD_ARTICLE } from '../actions-types';

const initialState = {
  articles: [],
};

const articleReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ARTICLE: {
      let articles = [action.payload];
      if (state.articles) {
        articles = [...state.articles, ...articles];
      }
      return { ...state, articles };
    }
    default:
      return state;
  }
};

export default articleReducer;
