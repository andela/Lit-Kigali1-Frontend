import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import 'isomorphic-fetch';
import { ArticleCreate, mapDispatchToProps, mapStateToProps } from '../../components/Article/ArticleCreate';
import {
  draftjsBody,
  entityMap1,
  article,
} from '../../__mocks__/dummyData';
import { article as newArticle, currentUser } from '../../redux/initialState.json';

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
    getArticle: jest.fn(),
    onUpdateArticle: jest.fn(),
    isLoggedIn: true,
    match: {
      params: {
      },
    },
    createArticle: {
      body: {
        blocks: draftjsBody,
        entityMap: entityMap1,
      },
      tagList: [],
    },
  };
  test('should render the <createArticle />', () => {
    const wrapper = mount(<ArticleCreate {...props} />);
    expect(wrapper).toMatchSnapshot();
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
    const wrapper = mount(<ArticleCreate {...props} />);
    const publishBtn = wrapper.find('[data-el="publish-btn"]');
    publishBtn.simulate('click');
    expect(props.postArticle).toHaveBeenCalled();
  });

  test('should save as drafft', () => {
    const wrapper = mount(<ArticleCreate {...props} />);
    const publishBtn = wrapper.find('[data-el="draft-btn"]');
    publishBtn.simulate('click');
    expect(props.postArticle).toHaveBeenCalled();
  });

  test('should add video', () => {
    const wrapper = mount(<ArticleCreate {...props} />);
    const videoBtn = wrapper.find('[data-el="video-btn"]');
    videoBtn.simulate('click');
  });

  test('should add image', () => {
    const wrapper = mount(<ArticleCreate {...props} />);
    const imageBtn = wrapper.find('[data-el="image-btn"]');
    imageBtn.simulate('click');
  });

  test('should add bold', () => {
    const wrapper = mount(<ArticleCreate {...props} />);
    const boldBtn = wrapper.find('[data-el="bold-btn"]');
    boldBtn.simulate('click');
  });

  test('should add a link', () => {
    const wrapper = mount(<ArticleCreate {...props} />);
    const linkBtn = wrapper.find('[data-el="link-btn"]');
    linkBtn.simulate('click');
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
