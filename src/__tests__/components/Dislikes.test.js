import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { Dislikes, mapDispatchToProps, mapStateToProps } from '../../components/Dislikes/Dislikes';
import { dislikeData } from '../../__mocks__/dummyData';
import initialState from '../../redux/initialState';

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

  describe('reducers', () => {
    test('should initialize the component state', () => {
      const state = mapStateToProps(initialState);
      expect(state).toHaveProperty('article');
      expect(state).toHaveProperty('dislikes');
    });
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
