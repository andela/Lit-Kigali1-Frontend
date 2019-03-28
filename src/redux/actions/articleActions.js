import { ADD_ARTICLE } from "../actions-types";

export const addArticle = payload => {
  return { type: ADD_ARTICLE, payload };
};
