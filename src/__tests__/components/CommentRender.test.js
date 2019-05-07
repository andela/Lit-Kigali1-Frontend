import React from 'react';
import { mount, shallow } from 'enzyme';
import { CommentRender } from '../../components/Comment/CommentRender';
import { commentData } from '../../__mocks__/dummyData';

const props = {
  articleSlug: '',
  comment: {
    ...commentData[0],
    id: 'fake-id',
  },
  currentUser: {},
  onDeleteComment: jest.fn(),
  updateComment: jest.fn(),
  enterPress: jest.fn(),
  inputHandler: jest.fn(),
  updateBody: '',
  fetchLikes: jest.fn(),
  fetchDislikes: jest.fn(),
  onLikeComment: jest.fn(),
  onDislikeComment: jest.fn(),
  originalComment: {
    commentId: 'fake-id',
  },
  onFetchHistory: jest.fn().mockImplementation(() => Promise.resolve({ status: 200 })),
};

describe('<CommentRender />', () => {
  test('should render CommentRender', () => {
    const comment = shallow(<CommentRender {...props} />);
    expect(comment).toMatchSnapshot();
  });

  test('onChange should call inputHandler', () => {
    const event = {
      target: {
        value: 'hello',
      },
    };
    const wrapper = mount(<CommentRender {...props} />);
    const { onChange } = wrapper.instance();
    onChange(event);
    expect(wrapper.props().inputHandler).toHaveBeenCalled();
  });

  test('closeCommentInput should call e.preventDefault', () => {
    const event = {
      target: {
        value: '',
      },
      preventDefault: jest.fn(),
      keyCode: 13,
      shiftKey: false,
    };
    const wrapper = mount(<CommentRender {...props} />);
    const { closeCommentInput } = wrapper.instance();
    closeCommentInput(event);
    expect(event.preventDefault).toHaveBeenCalled();
  });

  test('closeCommentInput should call e.preventDefault', () => {
    const event = {
      target: {
        value: 'hello',
      },
      preventDefault: jest.fn(),
      keyCode: 13,
      shiftKey: false,
    };
    const wrapper = mount(<CommentRender {...props} />);
    const spy = jest.spyOn(wrapper.instance(), 'onFocusOut');
    const { closeCommentInput } = wrapper.instance();
    closeCommentInput(event);
    expect(spy).toHaveBeenCalled();
  });

  test('onEditComment should call inputHandler', () => {
    const body = 'hello';
    const wrapper = mount(<CommentRender {...props} />);
    const { onEditComment } = wrapper.instance();
    onEditComment(body);
    expect(wrapper.props().inputHandler).toHaveBeenCalled();
    expect(wrapper.state().isEdit).toBeTruthy();
  });

  test('onKeyDown should call inputHandler', () => {
    const event = {
      keyCode: 13,
      shiftKey: false,
      preventDefault: jest.fn(),
      target: {
        value: ' ',
      },
    };
    const wrapper = mount(<CommentRender {...props} />);
    wrapper.setState({
      isEdit: true,
    });
    wrapper.find('textarea').simulate('keydown', event);
    expect(wrapper.props().enterPress).toHaveBeenCalled();
  });

  test('onClick of delete btn should call onDeleteComment', () => {
    const wrapper = mount(<CommentRender {...props} />);
    wrapper.setProps({
      currentUser: {
        id: 'fake-id',
      },
      comment: {
        ...commentData[0],
        userId: 'fake-id',
      },
    });
    wrapper.find('[data-el="delete-btn"]').simulate('click');
    expect(wrapper.props().onDeleteComment).toHaveBeenCalled();
  });

  test('onClick of edit btn should call onEditComment', () => {
    const wrapper = mount(<CommentRender {...props} />);
    wrapper.setProps({
      currentUser: {
        id: 'fake-id',
      },
      comment: {
        ...commentData[0],
        userId: 'fake-id',
      },
    });
    const spy = jest.spyOn(wrapper.instance(), 'onEditComment');
    wrapper.find('[data-el="edit-btn"]').simulate('click');
    expect(spy).toHaveBeenCalled();
  });

  test('onClick of edit btn should call onEditComment', () => {
    const wrapper = mount(<CommentRender {...props} />);
    wrapper.setProps({
      currentUser: {
        id: 'fake-id',
      },
      comment: {
        ...commentData[0],
        userId: 'fake-id',
      },
    });
    const spy = jest.spyOn(wrapper.instance(), 'onEditComment');
    wrapper.find('[data-el="comment-container"]').simulate('doubleclick');
    expect(spy).toHaveBeenCalled();
  });

  test('Should like a comment', () => {
    const wrapper = mount(<CommentRender {...props} />);
    wrapper.find('.like-btn').simulate('click');
    expect(wrapper.props().onLikeComment).toHaveBeenCalled();
  });

  test('Should dislike a comment', () => {
    const wrapper = mount(<CommentRender {...props} />);
    wrapper.find('.dislike-btn').simulate('click');
    expect(wrapper.props().onDislikeComment).toHaveBeenCalled();
  });

  test('Should display likes and dislikes', () => {
    const newProps = {
      ...props,
      comment: {
        ...commentData[0],
        author: {
          username: 'chris',
          image: 'image',
        },
        version: 'edited',
        likesCount: 0,
        dislikesCount: 0,
        liked: true,
        disliked: true,
      },
    };
    const comment = shallow(<CommentRender {...newProps} />);
    expect(comment).toMatchSnapshot();
  });
});
