import React from 'react';
import { shallow, mount } from 'enzyme';
import { ForgotPassword } from '../../ForgotPassword/ForgotPassword';

let wrapper;
const mockFn = jest.fn();
const props = {
  onSubmit: mockFn,
  onInputChange: mockFn,
};

describe('<ForgotPassword />', () => {
  beforeAll(() => {
    wrapper = shallow(<ForgotPassword {...props} />);
  });
  test('should render the <ForgotPassword />', () => {
    expect(wrapper).toMatchSnapshot();
  });
  test('should render default state', () => {
    expect(wrapper.state()).toEqual({
      validEmail: true,
      emailError: 'Email is not valid',
    });
  });

  describe('when clicking on submit button', () => {
    beforeEach(() => {
      wrapper = mount(<ForgotPassword {...props} />);
    });
    test('should call onSubmitFunction', () => {
      wrapper.find('.button').simulate('click');
      expect(wrapper.state()).toEqual({
        validEmail: false,
        emailError: 'Email is not valid',
      });
    });
  });

  describe('when typing into the email input', () => {
    beforeEach(() => {
      wrapper = mount(<ForgotPassword {...props} />);
      wrapper.find('.input>Input').simulate('change', { value: 'oesukam@gmail.com' });
    });
    test('should update the email prop', () => {
      expect(wrapper.state()).toEqual({
        validEmail: true,
        emailError: 'Email is not valid',
      });
    });
  });
});
