import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  ArticlesCurrentUser,
  mapStateToProps,
  mapDispatchToProps,
} from '../../components/Article/ArticlesCurrentUser';
import { articleData } from '../../__mocks__/dummyData';
import initialState from '../../redux/initialState.json';

let wrapper;
const props = {
  deletingArticle: true,
  currentUser: {
    articles: [articleData],
  },
  deleteArticle: jest
    .fn({ articleSlug: 'article-slug', index: 0 })
    .mockImplementation(() => Promise.resolve('Article deleted successfully')),
};

describe('<ArticlesCurrentUser />', () => {
  beforeEach(() => {
    wrapper = mount(
      <Router>
        <ArticlesCurrentUser {...props} />
      </Router>,
    );
  });
  test('should render the <ArticlesCurrentUser />', () => {
    const renderedValue = renderer
      .create(
        <Router>
          <ArticlesCurrentUser {...props} />
        </Router>,
      )
      .toJSON();
    expect(renderedValue).toMatchSnapshot();
  });

  test('should render <ArticlesCurrentUser /> with articles', () => {
    expect(wrapper.find('ArticlesCurrentUser').props().currentUser).toBeDefined();
  });

  test('should not render delete model', () => {
    wrapper.setState({ modalActive: false });
    expect(wrapper.state().modalActive).toBeFalsy();
  });

  describe('when clicking on `Yes` from delete modal', () => {
    test('should render delete modal', () => {
      const component = wrapper.find('ArticlesCurrentUser');
      component.setState({ modalActive: true });
      expect(component.state().modalActive).toBeTruthy();
    });

    test('should call onDeleteArticle', () => {
      const newProps = {
        ...props,
        deleteArticle: jest
          .fn({ articleSlug: 'article-slug', index: 0 })
          .mockImplementation(() => Promise.reject('Failed')),
      };
      wrapper = mount(
        <Router>
          <ArticlesCurrentUser {...newProps} />
        </Router>,
      );
      wrapper.find('ArticlesCurrentUser').setState({ modalActive: true, article: articleData });
      wrapper.update();
      wrapper.find('Button[data-name="yes-btn"]').simulate('click');
      expect(wrapper.find('ArticlesCurrentUser').state().modalActive).toBe(true);
    });

    test('should call onDeleteArticle', () => {
      wrapper.find('ArticlesCurrentUser').setState({ modalActive: true, article: articleData });
      wrapper.update();
      wrapper.find('Button[data-name="yes-btn"]').simulate('click');
      expect(wrapper.find('ArticlesCurrentUser').state().modalActive).toBe(true);
    });
  });

  describe('when clicking on `draft tab`', () => {
    test('should call toggleArticleStatus', () => {
      wrapper.find('span[data-status="unpublished"]').simulate('click');
      expect(wrapper.find('ArticlesCurrentUser').state().articleStatus).toBe('unpublished');
    });
  });

  describe('when clicking on `delete` article', () => {
    test('should call `openModal`', () => {
      wrapper.find('Button[data-name="delete-btn"]').simulate('click');
      expect(wrapper.find('ArticlesCurrentUser').state().modalActive).toBeTruthy();
    });
  });

  describe('when clicking on `No` from delete modal', () => {
    test('should call clodeModal', () => {
      wrapper.find('ArticlesCurrentUser').setState({ modalActive: true, article: articleData });
      wrapper.update();
      wrapper.find('Button[data-name="no-btn"]').simulate('click');
      expect(wrapper.find('ArticlesCurrentUser').state().modalActive).toBeFalsy();
    });
  });

  describe('reducers', () => {
    test('should initialize the component state', () => {
      const state = mapStateToProps(initialState);
      expect(state).toHaveProperty('message');
      expect(state).toHaveProperty('following');
      expect(state).toHaveProperty('currentUser');
    });
  });

  describe('actions creators', () => {
    test('should call deleteArticle action', () => {
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).deleteArticle({ articleSlug: 'article-slug', index: 0 });
      expect(dispatch).toHaveBeenCalled();
    });
  });
});
