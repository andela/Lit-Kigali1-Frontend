import reducer from '../../../redux/reducers/articleReducer';
import { ADD_ARTICLE } from '../../../redux/actions-types';
import { article } from '../../../__mocks__/dummyData';
import store from '../../../redux/store';

describe('articleReducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(store.getState().articles);
  });

  it('should handle ADD_ARTICLE', () => {
    const expectedState = {
      type: ADD_ARTICLE,
      payload: article,
    };
    expect(reducer({}, expectedState)).toEqual({
      articles: [article],
    });
  });
});
