import React from 'react';
import { mount, shallow } from 'enzyme';
import { EditorState } from 'draft-js';
import { CommentToolTip, mapStateToProps, mapDispatchToProps } from '../../components/Comment/CommentToolTip';
import initialState from '../../redux/initialState.json';
import { commentData } from '../../__mocks__/dummyData';


const props = {
  contentState: {
    getEntity: () => ({
      getData: () => ({
        highlighted: {
          text: '',
          startPoint: 0,
          endPoint: 0,
          slug: '',
        },
        article: EditorState.createEmpty(),
        anchorKey: 'jhsf5',
        history: {
          push: jest.fn(),
        },
        toggleMode: jest.fn(),
      }),
    }),
  },
  entityKey: '',
  children: '',
  currentUser: {},
  onSubmitComment: jest.fn().mockImplementation(() => Promise.resolve({
    status: 201,
    comment: { body: commentData[0] },
  })),
  onCommentInput: jest.fn(),
  onUpdateArticle: jest.fn(),
};
describe('<Article />', () => {
  test('should render the <CommentToolTip />', () => {
    const wrapper = shallow(<CommentToolTip {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('should change state', () => {
    const wrapper = mount(<CommentToolTip {...props} />);
    const { addComment } = wrapper.instance();
    addComment();
    expect(wrapper.props().onSubmitComment).toHaveBeenCalled();
  });

  test('mapStateToProps', () => {
    const res = mapStateToProps(initialState);
    expect(res).toBeDefined();
  });

  test('mapDispatchToProps', () => {
    const body = 'hello';
    const dispatch = jest.fn();
    const res = mapDispatchToProps(dispatch);
    res.onSubmitComment();
    res.onCommentInput({ body });
    res.onUpdateArticle();
    expect(dispatch).toHaveBeenCalled();
  });

  test('onEnterPress must not change state', () => {
    const event = {
      keyCode: 13,
      shiftKey: true,
    };
    const wrapper = mount(<CommentToolTip {...props} />);
    const { onEnterPress } = wrapper.instance();
    onEnterPress(event);
    expect(wrapper.state().hasCommentButton).toBeTruthy();
  });

  test('onEnterPress should not change state', () => {
    const event = {
      keyCode: 13,
      shiftKey: false,
      preventDefault: jest.fn(),
      target: {
        value: '',
      },
    };
    const wrapper = mount(<CommentToolTip {...props} />);
    const { onEnterPress } = wrapper.instance();
    onEnterPress(event);
    expect(wrapper.state().hasCommentButton).toBeTruthy();
    expect(event.preventDefault).toHaveBeenCalled();
  });

  test('onEnterPress should redirect', () => {
    const event = {
      keyCode: 13,
      shiftKey: false,
      preventDefault: jest.fn(),
      target: {
        value: 'hello',
      },
    };
    const wrapper = mount(<CommentToolTip {...props} />);
    const { onEnterPress } = wrapper.instance();
    onEnterPress(event);
    expect(wrapper.state().hasCommentButton).toBeTruthy();
    expect(event.preventDefault).toHaveBeenCalled();
  });

  test('onEnterPress should change state', () => {
    const event = {
      keyCode: 13,
      shiftKey: false,
      preventDefault: jest.fn(),
      target: {
        value: 'hello',
      },
    };
    const newProps = { ...props, isLoggedIn: true };
    const wrapper = mount(<CommentToolTip {...newProps} />);
    const { onEnterPress } = wrapper.instance();
    onEnterPress(event);
    expect(wrapper.state().hasCommentButton).toBeFalsy();
    expect(event.preventDefault).toHaveBeenCalled();
  });

  test('onchange', () => {
    const event = {
      keyCode: 13,
      shiftKey: false,
      preventDefault: jest.fn(),
      target: {
        value: 'hello',
      },
    };
    const newProps = { ...props, isLoggedIn: true };
    const wrapper = mount(<CommentToolTip {...newProps} />);
    const { onChange } = wrapper.instance();
    onChange(event);
    expect(event.preventDefault).toHaveBeenCalled();
    expect(wrapper.props().onCommentInput).toHaveBeenCalled();
  });
});
