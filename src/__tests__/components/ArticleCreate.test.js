import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import 'isomorphic-fetch';
import request from 'superagent';
import mock from 'superagent-mock';
import {
  convertToRaw, convertFromRaw, RichUtils, EditorState,
} from 'draft-js';
import {
  ArticleCreate,
  mapDispatchToProps,
  mapStateToProps,
} from '../../components/Article/ArticleCreate';
import {
  draftjsBody,
  entityMap1,
  article,
  file,
  urlValue,
  draftJsContentState,
  articleDataDraft,
} from '../../__mocks__/dummyData';
import {
  article as newArticle,
  currentUser,
} from '../../redux/initialState.json';

const API_URL = process.env.UPLOAD_URL;

describe('<ArticleCreate/>', () => {
  const props = {
    onInputChange: jest.fn(),
    onTagFormSubmit: jest.fn(),
    onTagRemove: jest.fn(),
    onUpdateEditorState: jest.fn(),
    postArticle: jest.fn(),
    history: {
      push: jest.fn(),
    },
    getArticle: jest
      .fn()
      .mockImplementation(() => Promise.resolve({
        status: 200,
        article: { body: articleDataDraft.body },
      })),
    onUpdateArticle: jest.fn(),
    isLoggedIn: true,
    match: {
      params: {},
    },
    createArticle: {
      body: {
        blocks: draftjsBody,
        entityMap: entityMap1,
      },
      tagList: ['hen', 'cow', 'dog'],
    },
  };

  test('should render the <createArticle />', () => {
    const wrapper = mount(<ArticleCreate {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('should fetch article', () => {
    jest.useFakeTimers();
    const newProps = props;
    newProps.match.params.articleSlug = 'article-slug';
    const wrapper = mount(<ArticleCreate {...newProps} />);
    jest.runAllTimers();
    wrapper.update();
    expect(wrapper.props().isLoggedIn).toBeTruthy();
  });

  test('should handle title input', () => {
    const event = { target: { name: 'title', value: 'hello world' } };
    const wrapper = mount(<ArticleCreate {...props} />);

    const titleInput = wrapper.find('[data-el="article-input"]');
    titleInput.simulate('change', event);
    expect(props.onInputChange).toHaveBeenCalled();
  });

  test('should handle editor state update', () => {
    const event = { target: { name: 'title', value: 'hello world' } };
    const wrapper = mount(<ArticleCreate {...props} />);
    const tagForm = wrapper.find('[data-test="tag-form"]');
    const tagInput = wrapper.find('[data-test="tag-input"]');
    tagInput.simulate('change', event);
    tagForm.simulate('submit');
    expect(props.onTagFormSubmit).toHaveBeenCalled();
  });

  test('should save and publish', () => {
    const newProps = { ...props, isLoggedIn: true };
    const wrapper = mount(<ArticleCreate {...newProps} />);
    wrapper.setState({ isEdit: false });
    const publishBtn = wrapper.find('[data-el="publish-btn"]');
    publishBtn.simulate('click');
    expect(props.postArticle).toHaveBeenCalled();
  });

  test('should save as drafft', () => {
    const newProps = { ...props, isLoggedIn: true };
    const wrapper = mount(<ArticleCreate {...newProps} />);
    wrapper.setState({ isEdit: false });
    const publishBtn = wrapper.find('[data-el="draft-btn"]');
    publishBtn.simulate('click');
    expect(props.postArticle).toHaveBeenCalled();
  });

  test('should redirect to auth page', () => {
    jest.useFakeTimers();
    const newProps = { ...props, isLoggedIn: false };
    const wrapper = mount(<ArticleCreate {...newProps} />);
    jest.runAllTimers();
    wrapper.update();
    expect(wrapper.props().isLoggedIn).toBeFalsy();
  });

  describe('Video handler', () => {
    const config = [
      {
        pattern: API_URL,
        fixtures: () => ({
          body: { secure_url: urlValue },
        }),
        post: (match, data) => data,
      },
    ];
    const event = {
      target: {
        files: [JSON.stringify(file)],
      },
    };
    mock(request, config);
    test('should open video input', (done) => {
      const wrapper = mount(<ArticleCreate {...props} />);
      const prevState = wrapper.state().editorState;
      const videoBtn = wrapper.find('[data-el="video-btn"]');
      videoBtn.simulate('click');
      wrapper.find('[data-el="video-input"]').simulate('change', event);
      wrapper.find('[data-el="video-input"]');
      const newState = wrapper.state().editorState;
      expect(prevState).toEqual(newState);
      done();
    });

    test('should add video', (done) => {
      const wrapper = mount(<ArticleCreate {...props} />);
      const prevState = wrapper.state();
      const instance = wrapper.instance();
      return instance.addVideo(event).then(() => {
        const newState = wrapper.state();
        expect(prevState).not.toEqual(newState);
        expect(
          convertToRaw(newState.editorState.getCurrentContent()).entityMap[0]
            .type,
        ).toEqual('video');
        done();
      });
    });
  });

  describe('Image handler', () => {
    const config = [
      {
        pattern: API_URL,
        fixtures: () => ({
          body: { secure_url: urlValue },
        }),
        post: (match, data) => data,
      },
    ];
    mock(request, config);
    const event = {
      target: {
        files: [JSON.stringify(file)],
      },
    };

    test('should open image file input', (done) => {
      const wrapper = mount(<ArticleCreate {...props} />);
      const prevState = wrapper.state().editorState;
      const imageBtn = wrapper.find('[data-el="image-btn"]');
      imageBtn.simulate('click');
      wrapper.find('[data-el="image-input"]').simulate('change', event);
      wrapper.update();
      const newState = wrapper.state().editorState;
      expect(wrapper).toMatchSnapshot();
      expect(prevState).toEqual(newState);
      done();
    });

    test('should add image', (done) => {
      const wrapper = mount(<ArticleCreate {...props} />);
      const prevState = wrapper.state();
      const instance = wrapper.instance();
      return instance.addImage(event).then(() => {
        const newState = wrapper.state();
        expect(prevState).not.toEqual(newState);
        expect(
          convertToRaw(newState.editorState.getCurrentContent()).entityMap[0]
            .type,
        ).toEqual('image');
        done();
      });
    });
  });

  test('should add bold', () => {
    const wrapper = mount(<ArticleCreate {...props} />);
    const boldBtn = wrapper.find('[data-el="bold-btn"]');
    boldBtn.simulate('click');
  });

  test('should open link input', () => {
    const wrapper = mount(<ArticleCreate {...props} />);
    const linkBtn = wrapper.find('[data-el="link-btn"]');
    linkBtn.simulate('click');
  });

  test('should add a link', () => {
    const event = {
      preventDefault: jest.fn(),
    };
    const wrapper = mount(<ArticleCreate {...props} />);
    wrapper.setState({ link: urlValue, isModel: true });
    const instance = wrapper.instance();
    const res = instance.addLink(event);
    const { isModel, link } = wrapper.state();
    expect(res).toEqual('handled');
    expect(isModel).toEqual(false);
    expect(link).toEqual(urlValue);
  });

  test('should add italic', () => {
    const wrapper = mount(<ArticleCreate {...props} />);
    const italicBtn = wrapper.find('[data-el="italic-btn"]');
    italicBtn.simulate('click');
  });

  test('should underline', () => {
    const wrapper = mount(<ArticleCreate {...props} />);
    const underlineBtn = wrapper.find('[data-el="underline-btn"]');
    underlineBtn.simulate('click');
  });

  test('should add heading', () => {
    const wrapper = mount(<ArticleCreate {...props} />);
    const titleBtn = wrapper.find('[data-el="title-btn"]');
    titleBtn.simulate('click');
  });

  test('should redirect', () => {
    const message = 'Article created successfully';
    const newProps = { ...props, message };
    mount(<ArticleCreate {...newProps} />);
    expect(newProps.history.push).toHaveBeenCalled();
  });

  test('should open model', () => {
    const event = { target: { name: 'title', value: 'hello world' } };
    const wrapper = mount(<ArticleCreate {...props} />);
    wrapper.setState({ isModel: true });
    const linkInput = wrapper.find('[data-el="link-input"]');
    linkInput.simulate('change', event);
    expect(wrapper.state().link).toEqual(event.target.value);
  });

  test('should edit an article', () => {
    const wrapper = mount(<ArticleCreate {...props} />);
    wrapper.setState({ isEdit: true });
    const editBtn = wrapper.find('[data-el="edit-btn"]');
    editBtn.simulate('click');
    expect(props.onUpdateArticle).toHaveBeenCalled();
  });

  test('should handle tag submit', () => {
    const event = {
      preventDefault: jest.fn(),
    };
    const wrapper = mount(<ArticleCreate {...props} />);
    const instance = wrapper.instance();
    instance.handleTagSubmit(event);
    expect(wrapper.props().onTagFormSubmit).toHaveBeenCalled();
    expect(wrapper.state().tag).toEqual('');
  });

  test('should not handle key command', () => {
    const command = 'highlight';
    const wrapper = mount(<ArticleCreate {...props} />);
    const instance = wrapper.instance();
    const { handleKeyCommand } = instance;
    const res = handleKeyCommand(command);
    expect(res).toEqual('not-handled');
  });

  test('should handle key command', () => {
    RichUtils.handleKeyCommand = jest
      .fn()
      .mockImplementation(() => EditorState.createWithContent(convertFromRaw(draftJsContentState)));
    const command = 'highlight';
    const wrapper = mount(<ArticleCreate {...props} />);
    const instance = wrapper.instance();
    const { handleKeyCommand } = instance;
    const res = handleKeyCommand(command);
    expect(res).toEqual('handled');
  });
});

describe('mapDispatchToprops', () => {
  const mockStore = configureMockStore();
  const store = mockStore({});
  test('should dispatch onArticleFormInput', () => {
    const target = {
      name: 'title',
      value: 'hello',
    };
    const { onInputChange } = mapDispatchToProps(store.dispatch);
    const res = onInputChange({ target });
    expect(res.type).toEqual('SET_ARTICLE_FORM_INPUT');
  });

  test('should dispatch onClearForm', () => {
    const { onClearForm } = mapDispatchToProps(store.dispatch);
    const res = onClearForm();
    expect(res.type).toEqual('CLEAR_ARTICLE_FORM');
  });

  test('should dispatch onTagFormSubmit', () => {
    const tag = 'hello';
    const { onTagFormSubmit } = mapDispatchToProps(store.dispatch);
    const res = onTagFormSubmit({ tag });
    expect(res.type).toEqual('SUBMIT_ARTICLE_TAG');
  });

  test('should dispatch onTagRemove', () => {
    const index = 0;
    const { onTagRemove } = mapDispatchToProps(store.dispatch);
    const res = onTagRemove({ index });
    expect(res.type).toEqual('REMOVE_ARTICLE_TAG');
  });

  test('should dispatch onUpdateEditorState', () => {
    const { onUpdateEditorState } = mapDispatchToProps(store.dispatch);
    const res = onUpdateEditorState();
    expect(res.type).toEqual('SET_ARTICLE_EDITOR');
  });

  test('should dispatch postArticle', () => {
    const dispatch = jest.fn();
    const { postArticle } = mapDispatchToProps(dispatch);
    postArticle(article);
    expect(dispatch).toHaveBeenCalled();
  });

  test('should dispatch getArticle', () => {
    const dispatch = jest.fn();
    const { getArticle } = mapDispatchToProps(dispatch);
    getArticle(article);
    expect(dispatch).toHaveBeenCalled();
  });

  test('should dispatch onUpdateArticle', () => {
    const dispatch = jest.fn();
    const { onUpdateArticle } = mapDispatchToProps(dispatch);
    onUpdateArticle(article);
    expect(dispatch).toHaveBeenCalled();
  });
});

describe('mapDispatchToProps', () => {
  test('', () => {
    const res = mapStateToProps({ article: newArticle, currentUser });
    expect(res).toHaveProperty('createArticle');
    expect(res).toHaveProperty('loading');
    expect(res).toHaveProperty('submitting');
    expect(res).toHaveProperty('message');
    expect(res).toHaveProperty('isLoggedIn');
  });
});
