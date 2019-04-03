import React from 'react';
import { shallow } from 'enzyme';
import ForgotPassword from '../../ForgotPassword/ForgotPassword';

describe('<ForgotPassword />', () => {
  test('Should render the <ForgotPassword />', () => {
    const wrapper = shallow(<ForgotPassword />);
    expect(wrapper).toMatchSnapshot();
  });
});
