import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { Ratings, mapStateToProps, mapDispatchToProps } from '../../components/Rating/Ratings';
import { ratingData } from '../../__mocks__/dummyData';
import initialState from '../../redux/initialState.json';

let wrapper;
const props = {
  loadingRatings: true,
  ratings: [ratingData],
  fetchRatings: jest.fn().mockImplementation(() => Promise.resolve({ status: 200 })),
  match: {
    params: {
      articleSlug: 'article-slug',
    },
  },
  history: { push: jest.fn() },
};

describe('<Ratings />', () => {
  beforeEach(() => {
    wrapper = mount(<Ratings {...props} />);
  });
  test('should render the <Ratings />', () => {
    const renderedValue = renderer.create(<Ratings {...props} />).toJSON();
    expect(renderedValue).toMatchSnapshot();
  });

  test('should render have ratings', () => {
    expect(wrapper.props().ratings.length).toBe(1);
  });

  test('should render <Ratings />', () => {
    props.loadingRatings = false;
    wrapper = mount(<Ratings {...props} />);
    expect(wrapper.props().loadingRatings).toBeFalsy();
  });

  describe('reducers', () => {
    test('should initialize the component state', () => {
      const state = mapStateToProps(initialState);
      expect(state).toHaveProperty('loadingRatings');
      expect(state).toHaveProperty('ratings');
    });
  });

  describe('actions creators', () => {
    test('should call getArticle action', () => {
      const articleSlug = 'article-slug';
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).fetchRatings({ articleSlug });
      expect(dispatch).toHaveBeenCalled();
    });
  });
});
