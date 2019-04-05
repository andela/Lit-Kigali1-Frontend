import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { ForgotPassword } from '../../ForgotPassword/ForgotPassword';

let wrapper;
const mockFn = jest.fn();
const props = {
  onSubmit: mockFn,
  onInputChange: mockFn,
};

describe('<ForgotPassword />', () => {
  test('should render the <ForgotPassword />', () => {
    const renderedValue = renderer.create(<ForgotPassword {...props} />).toJSON();
    expect(renderedValue).toMatchSnapshot();
  });
  test('should render default state', () => {
    wrapper = shallow(<ForgotPassword {...props} />);
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
