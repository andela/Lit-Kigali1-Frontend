import * as articleActions from '../../../redux/actions/articleActions';
import * as articleTypes from '../../../redux/actions-types/articleTypes';
import { article } from '../../../__mocks__/dummyData';

describe('articleActions', () => {
  test('should create an action to add article', () => {
    const expectedAction = {
      type: articleTypes.ADD_ARTICLE,
      payload: article,
    };
    expect(articleActions.addArticle(article)).toEqual(expectedAction);
  });
});
