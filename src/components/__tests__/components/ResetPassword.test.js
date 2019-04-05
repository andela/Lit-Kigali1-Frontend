import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { ResetPassword } from '../../ForgotPassword/ResetPassword';

let wrapper;
const mockFn = jest.fn();
const props = {
  onSubmit: mockFn,
  onInputChange: mockFn,
};

const defaultState = {
  validPassword: true,
  passwordError: 'Password must have at least 6 chacters',
};
describe('<ResetPassword />', () => {
  test('should render the <ResetPassword />', () => {
    const renderedValue = renderer.create(<ResetPassword {...props} />).toJSON();
    expect(renderedValue).toMatchSnapshot();
  });
  test('should render default state', () => {
    wrapper = shallow(<ResetPassword {...props} />);
    expect(wrapper.state()).toEqual(defaultState);
  });

  describe('when clicking on submit button', () => {
    beforeEach(() => {
      wrapper = mount(<ResetPassword {...props} />);
    });
    test('should call onSubmitFunction', () => {
      wrapper.find('.button').simulate('click');
      expect(wrapper.state()).toEqual({ ...defaultState, validPassword: false });
    });
  });

  describe('when typing into the newPassword input', () => {
    beforeEach(() => {
      wrapper = mount(<ResetPassword {...props} />);
      wrapper
        .find('.input>Input')
        .first()
        .simulate('change', { value: '12345' });
    });
    test('should update the newPassword prop', () => {
      expect(wrapper.state()).toEqual(defaultState);
    });
  });
});
