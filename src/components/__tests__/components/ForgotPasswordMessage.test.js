import React from 'react';
import { shallow } from 'enzyme';
import ForgotPasswordMessage from '../../ForgotPassword/ForgotPasswordMessage';

describe('<ForgotPasswordMessage />', () => {
  let wrapper;
  test('Should render the <ForgotPasswordMessage />', () => {
    wrapper = shallow(<ForgotPasswordMessage />);
    expect(wrapper).toMatchSnapshot();
  });
});
