import React from 'react';
import { shallow } from 'enzyme';
import Tag from '../../components/Tag/Tag';

describe('<Tag />', () => {
  const props = {
    children: 'hello',
    onClick: () => { },
  };
  let wrapper;

  test('should render default state', () => {
    wrapper = shallow(<Tag {...props} />);
    expect(wrapper.props).toBeDefined();
  });
});
