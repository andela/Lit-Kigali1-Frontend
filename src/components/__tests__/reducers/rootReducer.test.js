import reducer from '../../../redux/reducers';
import initialState from '../../../redux/reducers/initialState';
import { ADD_ARTICLE } from '../../../redux/actions-types';
import { article } from '../../../__mocks__/dummyData';

describe('root-reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle ADD_ARTICLE', () => {
    const expectedState = {
      type: ADD_ARTICLE,
      payload: article,
    };
    expect(reducer(initialState, expectedState)).toEqual({
      ...initialState,
      articles: [...initialState.articles, article],
    });
  });
});
