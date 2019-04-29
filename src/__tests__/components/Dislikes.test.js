import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { Dislikes, mapDispatchToProps } from '../../components/Dislikes/Dislikes';
import { dislikeData } from '../../__mocks__/dummyData';

let wrapper;
const props = {
  dislikes: [dislikeData],
  onFetchDislikes: jest.fn().mockImplementation(() => Promise.resolve({ status: 200 })),
  match: {
    params: {
      articleSlug: 'article-slug',
    },
  },
  history: { push: jest.fn() },
};

describe('<Dislikes />', () => {
  beforeEach(() => {
    wrapper = mount(<Dislikes {...props} />);
  });
  test('should render the <Dislikes />', () => {
    const renderedValue = renderer.create(<Dislikes {...props} />).toJSON();
    expect(renderedValue).toMatchSnapshot();
  });

  test('should render have Dislikes', () => {
    expect(wrapper.props().dislikes.length).toBe(1);
  });

  test('should render have no Dislikes', () => {
    const newProps = {
      ...props,
      dislikes: [],
    };
    wrapper = mount(<Dislikes {...newProps} />);
    expect(wrapper.props().dislikes.length).toBe(0);
    expect(props.history.push).toHaveBeenCalled();
  });

  describe('actions creators', () => {
    test('should call getDislikes action', () => {
      const articleSlug = 'article-slug';
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).onFetchDislikes({ articleSlug });
      expect(dispatch).toHaveBeenCalled();
    });
  });
});
