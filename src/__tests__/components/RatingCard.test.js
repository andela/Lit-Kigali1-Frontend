import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import RatingCard from '../../components/Rating/RatingCard';
import { ratingData } from '../../__mocks__/dummyData';

let wrapper;
const props = {
  rate: ratingData,
};

describe('<RatingCard />', () => {
  test('should render the <RatingCard />', () => {
    const renderedValue = renderer.create(<RatingCard {...props} />).toJSON();
    expect(renderedValue).toMatchSnapshot();
  });

  test('should render the <RatingCard /> rating equals to 5', () => {
    props.rate.rating = 5;
    wrapper = mount(<RatingCard {...props} />);
    expect(wrapper.props().rate.rating).toBe(5);
  });

  test('should render the <RatingCard /> rating equals to 4', () => {
    props.rate.rating = 4;
    wrapper = mount(<RatingCard {...props} />);
    expect(wrapper.props().rate.rating).toBe(4);
  });

  test('should render the <RatingCard /> rating equals to 3', () => {
    props.rate.rating = 3;
    wrapper = mount(<RatingCard {...props} />);
    expect(wrapper.props().rate.rating).toBe(3);
  });

  test('should render the <RatingCard /> rating equals to 2', () => {
    props.rate.rating = 2;
    wrapper = mount(<RatingCard {...props} />);
    expect(wrapper.props().rate.rating).toBe(2);
  });

  test('should render the <RatingCard /> rating equals to 1', () => {
    props.rate.rating = 1;
    wrapper = mount(<RatingCard {...props} />);
    expect(wrapper.props().rate.rating).toBe(1);
  });
});
