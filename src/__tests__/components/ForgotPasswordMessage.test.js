import React from 'react';
import { shallow } from 'enzyme';
import { ForgotPasswordMessage, mapStateToProps } from '../../ForgotPassword/ForgotPasswordMessage';

let wrapper;

const props = {
  message: 'Message',
};
describe('<ForgotPasswordMessage />', () => {
  test('should render the <ForgotPasswordMessage />', () => {
    wrapper = shallow(<ForgotPasswordMessage {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  describe('reducers', () => {
    test('should return `mapStateToProps`', () => {
      const initialState = {
        forgotPassword: {
          successMessage: 'message',
        },
      };
      const state = mapStateToProps(initialState);
      expect(state).toEqual({ message: 'message' });
    });
  });
});
