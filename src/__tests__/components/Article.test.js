import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { Article, mapStateToProps, mapDispatchToProps } from '../../components/Article/Article';
import { articleData } from '../../__mocks__/dummyData';
import initialState from '../../redux/initialState.json';

let wrapper;
const props = {
  loading: true,
  article: articleData,
  currentUser: {
    username: 'username',
  },
  getArticle: jest.fn().mockImplementation(() => Promise.resolve({ status: 200 })),
  rateArticle: jest.fn().mockImplementation(() => Promise.resolve({ status: 200 })),
  onLikeArticle: jest.fn().mockImplementation(() => Promise.resolve({ status: 200 })),
  onDislikeArticle: jest.fn().mockImplementation(() => Promise.resolve({ status: 200 })),
  nextPath: jest.fn().mockImplementation(() => Promise.resolve({ status: 200 })),
  match: {
    params: {
      articleSlug: 'article-slug',
    },
  },
  history: { push: jest.fn() },
  isLoggedIn: true,
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
    expect(wrapper.props().article.tagList).toBeDefined();
  });

  describe('should render different ratings', () => {
    test('should render <Article /> rated equals to 1', () => {
      props.article.rated = 1;
      wrapper = mount(<Article {...props} />);
      expect(wrapper.props().article.rated).toBe(1);
    });

    test('should render <Article /> rated equals to 2', () => {
      props.article.rated = 2;
      wrapper = mount(<Article {...props} />);
      expect(wrapper.props().article.rated).toBe(2);
    });

    test('should render <Article /> rated equals to 3', () => {
      props.article.rated = 3;
      wrapper = mount(<Article {...props} />);
      expect(wrapper.props().article.rated).toBe(3);
    });

    test('should render <Article /> rated equals to 4', () => {
      props.article.rated = 4;
      wrapper = mount(<Article {...props} />);
      expect(wrapper.props().article.rated).toBe(4);
    });

    test('should render <Article /> rated equals to 5', () => {
      props.article.rated = 5;
      wrapper = mount(<Article {...props} />);
      expect(wrapper.props().article.rated).toBe(5);
    });
  });

  describe('when clicking on rateArticle', () => {
    beforeEach(() => {
      wrapper = mount(<Article {...props} />);
    });
    test('should call onSelectedRating method instance', () => {
      wrapper.find('button[data-value="5"]').simulate('click');
      expect(props.rateArticle).toHaveBeenCalled();
    });
  });

  describe("when clicking article's rates", () => {
    beforeEach(() => {
      wrapper = mount(<Article {...props} />);
    });
    test('should call onSelectedRating method instance', () => {
      wrapper.find('span[data-name="rate-btn"]').simulate('click');
      expect(props.history.push).toHaveBeenCalled();
    });
  });

  describe('reducers', () => {
    test('should initialize the component state', () => {
      const state = mapStateToProps(initialState);
      expect(state).toHaveProperty('loading');
      expect(state).toHaveProperty('article');
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

    test('should call rateArticle action', () => {
      const articleSlug = 'article-slug';
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).rateArticle({ articleSlug, rate: 3 });
      expect(dispatch).toHaveBeenCalled();
    });

    test('should call likeArticle action', () => {
      const articleSlug = 'article-slug';
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).onLikeArticle({ articleSlug });
      expect(dispatch).toHaveBeenCalled();
    });

    test('should call dislikeArticle action', () => {
      const articleSlug = 'article-slug';
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).onDislikeArticle({ articleSlug });
      expect(dispatch).toHaveBeenCalled();
    });

    test('should call nextPath action', () => {
      const url = 'article-slug';
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).nextPath({ url });
      expect(dispatch).toHaveBeenCalled();
    });
  });

  describe('like and dislike an article when loggedIn', () => {
    beforeEach(() => {
      wrapper = mount(<Article {...props} />);
    });

    test('should like an article', () => {
      wrapper.find('button[data-value="like"]').simulate('click');
      expect(props.onLikeArticle).toHaveBeenCalled();
    });

    test('should dislike an article', () => {
      wrapper.find('button[data-value="dislike"]').simulate('click');
      expect(props.onDislikeArticle).toHaveBeenCalled();
    });
  });

  describe('like and dislike an article when not loggedIn', () => {
    beforeEach(() => {
      const newProps = {
        ...props,
        isLoggedIn: false,
        liked: true,
        disliked: true,
        likeCount: 1,
        dislikeCount: 1,
      };
      wrapper = mount(<Article {...newProps} />);
    });

    test('should like an article', () => {
      wrapper.find('button[data-value="like"]').simulate('click');
      expect(props.nextPath).toHaveBeenCalled();
    });

    test('should dislike an article', () => {
      wrapper.find('button[data-value="dislike"]').simulate('click');
      expect(props.nextPath).toHaveBeenCalled();
    });
  });
});
