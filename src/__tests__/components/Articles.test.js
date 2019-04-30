import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { Articles, mapStateToProps, mapDispatchToProps } from '../../components/Article/Articles';
import { articleData } from '../../__mocks__/dummyData';
import initialState from '../../redux/initialState.json';

let wrapper;
const props = {
  loading: true,
  articles: [articleData],
  currentUser: {
    username: 'username',
  },
  getArticles: jest.fn().mockImplementation(() => Promise.resolve({ status: 200 })),
  match: {
    params: {
      articleSlug: 'article-slug',
    },
  },
  history: { push: jest.fn() },
  location: {
    search: '?page=1',
  },
};

describe('<Articles />', () => {
  beforeEach(() => {
    wrapper = mount(<Articles {...props} />);
  });
  test('should render the <Article />', () => {
    const renderedValue = renderer.create(<Articles {...props} />).toJSON();
    expect(renderedValue).toMatchSnapshot();
  });

  test('should render <Article /> with articles', () => {
    wrapper = mount(<Articles {...props} />);
    wrapper.instance().renderArticles();
    expect(wrapper.props().articles).toBeDefined();
  });

  describe('reducers', () => {
    test('should initialize the component state', () => {
      const state = mapStateToProps(initialState);
      expect(state).toHaveProperty('loading');
      expect(state).toHaveProperty('articles');
      expect(state).toHaveProperty('submitting');
      expect(state).toHaveProperty('currentUser');
    });
  });

  describe('actions creators', () => {
    test('should call getArticle action', () => {
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).getArticles(1);
      expect(dispatch).toHaveBeenCalled();
    });
  });
});
