import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { Likes, mapDispatchToProps } from '../../components/Likes/Likes';
import { likeData } from '../../__mocks__/dummyData';

let wrapper;
const props = {
  likes: [likeData],
  onFetchLikes: jest.fn().mockImplementation(() => Promise.resolve({ status: 200 })),
  match: {
    params: {
      articleSlug: 'article-slug',
    },
  },
  history: { push: jest.fn() },
};

describe('<Likes />', () => {
  beforeEach(() => {
    wrapper = mount(<Likes {...props} />);
  });
  test('should render the <Likes />', () => {
    const renderedValue = renderer.create(<Likes {...props} />).toJSON();
    expect(renderedValue).toMatchSnapshot();
  });

  test('should render have Likes', () => {
    expect(wrapper.props().likes.length).toBe(1);
  });

  test('should render have no Likes', () => {
    const newProps = {
      ...props,
      likes: [],
    };
    wrapper = mount(<Likes {...newProps} />);
    expect(wrapper.props().likes.length).toBe(0);
    expect(props.history.push).toHaveBeenCalled();
  });

  describe('actions creators', () => {
    test('should call getLikes action', () => {
      const articleSlug = 'article-slug';
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).onFetchLikes({ articleSlug });
      expect(dispatch).toHaveBeenCalled();
    });
  });
});
