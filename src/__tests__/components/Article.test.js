import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { Article, mapStateToProps, mapDispatchToProps } from '../../components/Article/Article';
import { articleData, articleDataDraft } from '../../__mocks__/dummyData';
import initialState from '../../redux/initialState';

let wrapper;
const props = {
  loading: true,
  singleArticle: articleData,
  currentUser: {
    username: 'username',
  },
  getArticle: jest.fn().mockImplementation(() => Promise.resolve({ status: 200 })),
  match: {
    params: {
      articleSlug: 'article-slug',
    },
  },
};

describe('<Article />', () => {
  beforeEach(() => {
    wrapper = mount(<Article {...props} />);
  });
  test('should render the <Article />', () => {
    const renderedValue = renderer.create(<Article {...props} />).toJSON();
    expect(renderedValue).toMatchSnapshot();
  });

  test('should render <Article /> with tags', () => {
    wrapper = mount(<Article {...props} />);
    expect(wrapper.props().singleArticle.tagList).toBeDefined();
  });

  test('should render <Article /> with cover', () => {
    props.singleArticle.cover = 'https://picsum.photos/200/300';
    wrapper = mount(<Article {...props} />);
    expect(wrapper.props().singleArticle.cover).toBeDefined();
  });

  test('should render <Article /> the Editor', () => {
    const newProps = props;
    newProps.singleArticle = articleDataDraft;
    wrapper = mount(<Article {...newProps} />);
    expect(wrapper.props().singleArticle.tagList).toBeDefined();
  });

  describe('reducers', () => {
    test('should initialize the component state', () => {
      const state = mapStateToProps(initialState);
      expect(state).toHaveProperty('loading');
      expect(state).toHaveProperty('singleArticle');
      expect(state).toHaveProperty('submitting');
      expect(state).toHaveProperty('currentUser');
    });
  });

  describe('actions creators', () => {
    test('should call getArticle action', () => {
      const articleSlug = 'article-slug';
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).getArticle(articleSlug);
      expect(dispatch).toHaveBeenCalled();
    });
  });
});
