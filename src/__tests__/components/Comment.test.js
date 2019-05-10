import React from 'react';
import { mount, shallow } from 'enzyme';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { Comment, mapDispatchToProps } from '../../components/Comment/Comment';
import initialState from '../../redux/initialState.json';
import { commentData } from '../../__mocks__/dummyData';

const props = {
  body: '',
  onCommentInput: jest.fn(),
  onSubmitComment: jest.fn(),
  articleSlug: '',
  commentList: [],
  currentUser: {},
  onDeleteComment: jest.fn(),
  onUpdateComment: jest.fn(),
  updateBody: '',
  onUpdateCommentInput: jest.fn(),
  isLoggedIn: false,
  history: {
    push: jest.fn(),
  },
  fetching: true,
  onLikeComment: jest.fn(),
  onDislikeComment: jest.fn(),
};
const mockStore = configureMockStore([thunk]);
const store = mockStore(initialState);

describe('<Comment />', () => {
  test('should render comment component', () => {
    const comment = shallow(<Comment {...props} />);
    expect(comment).toMatchSnapshot();
  });

  test('should display comments', () => {
    const newProps = { ...props, commentList: commentData };
    const wrapper = mount(
      <Provider store={store}>
        <Comment {...newProps} />
      </Provider>,
    );
    const comment = wrapper.find('Comment');
    const { displayComments } = comment.instance();
    const comments = displayComments();
    expect(comments.length).toEqual(3);
  });

  test('should update comment', () => {
    const fakeId = 'fake-id';
    const wrapper = mount(
      <Provider store={store}>
        <Comment {...props} />
      </Provider>,
    );
    const comment = wrapper.find('Comment');
    const { onEditComment } = comment.instance();
    onEditComment(fakeId);
    expect(comment.props().onUpdateComment).toHaveBeenCalled();
  });

  test('should add comment', () => {
    const wrapper = mount(
      <Provider store={store}>
        <Comment {...props} />
      </Provider>,
    );
    const comment = wrapper.find('Comment');
    const { addComment } = comment.instance();
    addComment();
    expect(comment.props().onSubmitComment).toHaveBeenCalled();
  });

  test('should update input as user type', () => {
    const event = {
      preventDefault: jest.fn(),
      target: {
        value: ' ',
      },
    };
    const wrapper = mount(
      <Provider store={store}>
        <Comment {...props} />
      </Provider>,
    );
    const comment = wrapper.find('Comment');
    const { onChange } = comment.instance();
    onChange(event);
    expect(comment.props().onCommentInput).toHaveBeenCalled();
    expect(event.preventDefault).toHaveBeenCalled();
  });

  test('should update input as user type', () => {
    const event = {
      preventDefault: jest.fn(),
      target: {
        value: ' ',
      },
    };
    const wrapper = mount(
      <Provider store={store}>
        <Comment {...props} />
      </Provider>,
    );
    const comment = wrapper.find('Comment');
    const mockFn = jest.spyOn(comment.instance(), 'onEnterPress');
    const commentInput = comment.find('textarea');
    commentInput.simulate('keydown', event);
    expect(mockFn).toHaveBeenCalled();
  });

  describe('onEnterPress', () => {
    const event = {
      keyCode: 13,
      shiftKey: false,
      preventDefault: jest.fn(),
      target: {
        value: ' ',
      },
    };

    test('should prevent default onEnterPress', () => {
      const fakeId = 'fake-id';
      const wrapper = mount(
        <Provider store={store}>
          <Comment {...props} />
        </Provider>,
      );
      const comment = wrapper.find('Comment');
      const { onEnterPress } = comment.instance();
      onEnterPress(event, jest.fn(), fakeId);
      expect(event.preventDefault).toHaveBeenCalled();
    });

    test('should redirect onEnterPress', () => {
      const mockFn = jest.fn();
      event.target.value = 'hello';
      const fakeId = 'fake-id';
      const wrapper = mount(
        <Provider store={store}>
          <Comment {...props} />
        </Provider>,
      );
      const comment = wrapper.find('Comment');
      const { onEnterPress } = comment.instance();
      onEnterPress(event, mockFn, fakeId);
      expect(event.preventDefault).toHaveBeenCalled();
      expect(comment.props().history.push).toHaveBeenCalled();
    });

    test('should submit onEnterPress', () => {
      const mockFn = jest.fn();
      event.target.value = 'hello';
      const fakeId = 'fake-id';
      const newProps = { ...props, isLoggedIn: true };
      const wrapper = mount(
        <Provider store={store}>
          <Comment {...newProps} />
        </Provider>,
      );
      const comment = wrapper.find('Comment');
      const { onEnterPress } = comment.instance();
      onEnterPress(event, mockFn, fakeId);
      expect(event.preventDefault).toHaveBeenCalled();
      expect(mockFn).toHaveBeenCalled();
    });
  });

  describe('mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const fakeId = 'fake-id';
    const fakeSlug = 'fake-slug';
    test('should dispatch onDeleteComment', () => {
      const { onDeleteComment } = mapDispatchToProps(dispatch);
      onDeleteComment(fakeId, fakeSlug);
      expect(dispatch).toHaveBeenCalled();
    });

    test('should dispatch onUpdateComment', () => {
      const body = 'fake-body';
      const { onUpdateComment } = mapDispatchToProps(dispatch);
      onUpdateComment(fakeId, fakeSlug, body);
      expect(dispatch).toHaveBeenCalled();
    });

    test('should dispatch onSubmitComment', () => {
      const body = 'fake-body';
      const { onSubmitComment } = mapDispatchToProps(dispatch);
      onSubmitComment(body, fakeSlug);
      expect(dispatch).toHaveBeenCalled();
    });

    test('should dispatch onUpdateCommentInput', () => {
      const value = 'fake-value';
      const { onUpdateCommentInput } = mapDispatchToProps(dispatch);
      onUpdateCommentInput(value);
      expect(dispatch).toHaveBeenCalled();
    });

    test('should dispatch onCommentInput', () => {
      const body = 'fake-body';
      const { onCommentInput } = mapDispatchToProps(dispatch);
      onCommentInput({ body });
      expect(dispatch).toHaveBeenCalled();
    });

    test('should dispatch onLikeComment', () => {
      const articleSlug = 'fake-slug';
      const commentId = 'fake-id';
      const { onLikeComment } = mapDispatchToProps(dispatch);
      onLikeComment(articleSlug, commentId);
      expect(dispatch).toHaveBeenCalled();
    });

    test('should dispatch onDislikeComment', () => {
      const articleSlug = 'fake-slug';
      const commentId = 'fake-id';
      const { onDislikeComment } = mapDispatchToProps(dispatch);
      onDislikeComment(articleSlug, commentId);
      expect(dispatch).toHaveBeenCalled();
    });
  });
});
