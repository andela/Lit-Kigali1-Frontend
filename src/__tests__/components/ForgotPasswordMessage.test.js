import React from 'react';
import { shallow } from 'enzyme';
import { ForgotPasswordMessage } from '../../components/ForgotPassword/ForgotPasswordMessage';

let wrapper;

const props = {
  message: 'Message',
};
describe('<ForgotPasswordMessage />', () => {
  test('should render the <ForgotPasswordMessage />', () => {
    wrapper = shallow(<ForgotPasswordMessage {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
