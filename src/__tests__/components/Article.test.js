import React from 'react';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import Article, { mapStateToProps, mapDispatchToProps } from '../../components/Article/Article';
import { articleDataDraft } from '../../__mocks__/dummyData';
import initialState from '../../redux/initialState.json';

let wrapper;

const mockStore = configureMockStore([thunk]);
let store = mockStore(initialState);
describe('<Article />', () => {
  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <Article />
      </Provider>,
    );
  });

  test('should render the <Article />', () => {
    wrapper = shallow(
      <Provider store={store}>
        <Article />
      </Provider>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('should render <Article /> with tags', () => {
    expect(wrapper.find('Article').props().singleArticle.tagList).toBeDefined();
  });

  describe('should render different ratings', () => {
    test('should render <Article /> rated equals to 1', () => {
      const state = initialState;
      state.article.singleArticle.rated = 1;
      store = mockStore(state);
      wrapper = mount(
        <Provider store={store}>
          <Article />
        </Provider>,
      );
      expect(wrapper.find('Article').props().singleArticle.rated).toBe(1);
    });

    test('should render <Article /> rated equals to 2', () => {
      const state = initialState;
      state.article.singleArticle.rated = 2;
      store = mockStore(state);
      wrapper = mount(
        <Provider store={store}>
          <Article />
        </Provider>,
      );
      expect(wrapper.find('Article').props().singleArticle.rated).toBe(2);
    });

    test('should render <Article /> rated equals to 3', () => {
      const state = initialState;
      state.article.singleArticle.rated = 3;
      store = mockStore(state);
      wrapper = mount(
        <Provider store={store}>
          <Article />
        </Provider>,
      );
      expect(wrapper.find('Article').props().singleArticle.rated).toBe(3);
    });

    test('should render <Article /> rated equals to 4', () => {
      const state = initialState;
      state.article.singleArticle.rated = 4;
      store = mockStore(state);
      wrapper = mount(
        <Provider store={store}>
          <Article />
        </Provider>,
      );
      expect(wrapper.find('Article').props().singleArticle.rated).toBe(4);
    });

    test('should render <Article /> rated equals to 5', () => {
      const state = initialState;
      state.article.singleArticle.rated = 5;
      store = mockStore(state);
      wrapper = mount(
        <Provider store={store}>
          <Article />
        </Provider>,
      );
      expect(wrapper.find('Article').props().singleArticle.rated).toBe(5);
    });
  });

  describe('when clicking on rateArticle', () => {
    beforeEach(() => {
      wrapper = mount(
        <Provider store={store}>
          <Article />
        </Provider>,
      );
    });
    test('should call onSelectedRating method instance', () => {
      wrapper.find('button[data-value="5"]').simulate('click');
      expect(wrapper.find('Article').props().rateArticle).toBeDefined();
    });
  });

  describe("when clicking article's rates", () => {
    test('should call onSelectedRating method instance', () => {
      const state = { ...initialState, history: { push: jest.fn() } };
      store = mockStore(state);
      wrapper = mount(
        <Provider store={store}>
          <Article />
        </Provider>,
      );
      wrapper.find('span[data-name="rate-btn"]').simulate('click');
      expect(wrapper.find('Article').props().history.push).toBeDefined();
    });
  });

  test('should render <Article /> with cover', () => {
    const state = initialState;
    state.article.singleArticle.cover = 'https://picsum.photos/200/300';
    store = mockStore(state);
    wrapper = mount(
      <Provider store={store}>
        <Article />
      </Provider>,
    );
    expect(wrapper.find('Article').props().singleArticle.cover).toBeDefined();
  });

  test('should render <Article /> the Editor', () => {
    const state = initialState;
    state.article.singleArticle = articleDataDraft;
    store = mockStore(state);
    wrapper = mount(
      <Provider store={store}>
        <Article />
      </Provider>,
    );
    expect(wrapper.find('Article').props().singleArticle.tagList).toBeDefined();
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
      const state = {
        ...initialState,
        currentUser: {
          isLoggedIn: true,
        },
      };
      const store1 = mockStore(state);
      wrapper = mount(
        <Provider store={store1}>
          <Article />
        </Provider>,
      );
    });

    test('should like an article', () => {
      wrapper
        .find('Article')
        .find('button[data-value="like"]')
        .simulate('click');
      expect(wrapper.find('Article').props().onLikeArticle).toBeDefined();
    });

    test('should dislike an article', () => {
      wrapper
        .find('Article')
        .find('button[data-value="dislike"]')
        .simulate('click');
      expect(wrapper.find('Article').props().onDislikeArticle).toBeDefined();
    });
  });

  describe('like and dislike an article when not loggedIn', () => {
    beforeEach(() => {
      const state = {
        ...initialState,
        article: {
          ...initialState.article,
          isLoggedIn: false,
          liked: true,
          disliked: true,
          likeCount: 1,
          dislikeCount: 1,
        },
      };
      const store2 = mockStore(state);
      wrapper = mount(
        <Provider store={store2}>
          <Article />
        </Provider>,
      );
    });

    test('should like an article', () => {
      wrapper
        .find('Article')
        .find('button[data-value="like"]')
        .simulate('click');
      expect(wrapper.find('Article').props().nextPath).toBeDefined();
    });

    test('should dislike an article', () => {
      wrapper
        .find('Article')
        .find('button[data-value="dislike"]')
        .simulate('click');
      expect(wrapper.find('Article').props().nextPath).toBeDefined();
    });
  });
});
