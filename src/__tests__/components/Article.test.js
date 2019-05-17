import React from 'react';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { EditorState, convertFromRaw } from 'draft-js';
import Article, {
  mapStateToProps,
  mapDispatchToProps,
  Article as NonReduxArticle,
} from '../../components/Article/Article';
import { articleDataDraft } from '../../__mocks__/dummyData';
import initialState from '../../redux/initialState.json';

let wrapper;
const mockStore = configureMockStore([thunk]);
let store = mockStore(initialState);

const slug = 'fake-article-slug';
const props = {
  match: {
    params: {
      articleSlug: slug,
    },
  },
  getArticle: jest.fn().mockImplementation(() => Promise.resolve({
    status: 200,
    article: { body: articleDataDraft.body },
  })),
  rateArticle: jest.fn(),
  onShare: jest.fn(),
  onLikeArticle: jest.fn(),
  onDislikeArticle: jest.fn(),
  isLoggedIn: false,
  nextPath: jest.fn(),
  onHighlight: jest.fn(),
  singleArticle: {
    tagList: [],
  },
  handleInput: jest.fn(),
  onReportArticle: jest.fn(),
  onInvalid: jest.fn(),
};

describe('<Article />', () => {
  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <Article />
      </Provider>,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render the <Article />', () => {
    wrapper = shallow(
      <Provider store={store}>
        <Article />
      </Provider>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('should render the <Article />', () => {
    wrapper = mount(
      <Provider store={store}>
        <NonReduxArticle {...props} />
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

  describe('when clicking on share icon', () => {
    beforeEach(() => {
      wrapper = mount(
        <Provider store={store}>
          <Article />
        </Provider>,
      );
      jest.spyOn(console, 'error');
      // Mocking JSDOM virtual console errors
      console.error.mockImplementation(() => {});
    });

    afterEach(() => {
      console.error.mockRestore();
    });

    test('should call on socialShare', () => {
      wrapper.find('button[id="tw"]').simulate('click');
      expect(wrapper.find('Article').props().onShare).toBeDefined();
    });

    test('should call on socialShare', () => {
      wrapper.find('button[id="fb"]').simulate('click');
      expect(wrapper.find('Article').props().onShare).toBeDefined();
    });

    test('should call on socialShare', () => {
      wrapper.find('button[id="e"]').simulate('click');
      expect(wrapper.find('Article').props().onShare).toBeDefined();
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

    test('should call nextPath action', () => {
      const field = 'field';
      const value = 'value';
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).handleInput(field, value);
      expect(dispatch).toHaveBeenCalled();
    });

    test('should call nextPath action', () => {
      const articleSlug = 'fake-slug';
      const report = {
        reason: 'reason',
        description: 'description',
      };
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).onReportArticle(articleSlug, report);
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

    test('should not report an article', () => {
      wrapper
        .find('Article')
        .find('.report-btn')
        .simulate('click');
      expect(wrapper.find('Article').props().onReportArticle).toBeDefined();
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
          report: {
            reason: 'reason',
          },
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

    test('should call navigateToArticles instance function', () => {
      wrapper
        .find('Article')
        .find('span[className="tagged"]')
        .at(1)
        .simulate('click');
      expect(wrapper.find('Article').props().nextPath).toBeDefined();
    });

    test('should report an article', () => {
      wrapper
        .find('Article')
        .find('.report-btn')
        .simulate('click');
      setTimeout(() => {
        expect(wrapper.find('Article').props().onReportArticle).toBeDefined();
      }, 5000);
    });

    test('should call handleInput on change', () => {
      const event = { target: { name: 'description', value: 'description' } };
      wrapper
        .find('Article')
        .find('.large-input')
        .simulate('change', event);
      expect(wrapper.find('Article').props().handleInput).toBeDefined();
    });
  });

  describe('comment on highlightedText', () => {
    test('should highlight', () => {
      wrapper = mount(
        <Provider store={store}>
          <Article />
        </Provider>,
      );
      const { highlight } = wrapper.find('Article').instance();
      const draftFormatBody = convertFromRaw(JSON.parse(articleDataDraft.body));
      const editorState = EditorState.createWithContent(draftFormatBody);
      const selection = editorState.getSelection();
      const newSelection = selection.merge({
        anchorKey: 'crkve',
        anchorOffset: 1,
        focusKey: 'crkve',
        focusOffset: 5,
      });
      const newEditorState = EditorState.forceSelection(editorState, newSelection);
      highlight(newEditorState);
      expect(wrapper.find('Article').state().editorFromState).toHaveProperty('_immutable');
      expect(wrapper.find('Article').props().onHighlight).toBeDefined();
    });

    test('should not highlight', () => {
      wrapper = mount(
        <Provider store={store}>
          <Article />
        </Provider>,
      );
      const { highlight } = wrapper.find('Article').instance();
      const draftFormatBody = convertFromRaw(JSON.parse(articleDataDraft.body));
      const editorState = EditorState.createWithContent(draftFormatBody);
      highlight(editorState);
      expect(wrapper.find('Article').state().editorFromState).toHaveProperty('_immutable');
    });

    test('should call highlight', () => {
      wrapper = mount(
        <Provider store={store}>
          <Article />
        </Provider>,
      );
      const highlight = jest.spyOn(wrapper.find('Article').instance(), 'highlight');
      const { onChange } = wrapper.find('Article').instance();
      const draftFormatBody = convertFromRaw(JSON.parse(articleDataDraft.body));
      const editorState = EditorState.createWithContent(draftFormatBody);
      onChange(editorState);
      expect(highlight).toHaveBeenCalled();
    });

    test('should not call highlight', () => {
      wrapper = mount(
        <Provider store={store}>
          <Article />
        </Provider>,
      );
      const highlight = jest.spyOn(wrapper.find('Article').instance(), 'highlight');
      const { onChange } = wrapper.find('Article').instance();
      const draftFormatBody = convertFromRaw(JSON.parse(articleDataDraft.body));
      const editorState = EditorState.createWithContent(draftFormatBody);
      const selection = editorState.getSelection();
      const newSelection = selection.merge({
        anchorKey: 'crkve',
        anchorOffset: 1,
        focusKey: 'crkvf',
        focusOffset: 5,
      });
      const newEditorState = EditorState.forceSelection(editorState, newSelection);
      onChange(newEditorState);
      expect(highlight).not.toHaveBeenCalled();
    });

    test('should toggle Mode', () => {
      wrapper = mount(
        <Provider store={store}>
          <Article />
        </Provider>,
      );
      const { toggleMode } = wrapper.find('Article').instance();
      toggleMode();
      expect(wrapper.find('Article').state().isCommentingMode).toEqual(true);
    });

    test('should toggle Mode', () => {
      const state = initialState;
      state.article.singleArticle.body = JSON.parse(articleDataDraft.body);
      store = mockStore(state);
      wrapper = mount(
        <Provider store={store}>
          <Article />
        </Provider>,
      );
      wrapper.find('Article').state().editorFromState = articleDataDraft;
      wrapper.update();
      const { renderBody } = wrapper.find('Article').instance();
      const res = renderBody();
      expect(res.props['data-test']).toEqual('article-text');
    });

    test('should render showToaster', (done) => {
      jest.useFakeTimers();
      const state = initialState;
      store = mockStore(state);
      wrapper = mount(
        <Provider store={store}>
          <Article />
        </Provider>,
      );
      wrapper
        .find('Article')
        .instance()
        .showToast();
      jest.runAllTimers();
      done();
    });
  });
});
