import React from 'react';
import { shallow } from 'enzyme';
import Login from '../../Auth/Login';

describe('<Login />', () => {
  test('should render the <Login />', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper).toMatchSnapshot();
  });
});
