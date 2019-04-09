import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';
import {
  ForgotPassword,
  mapStateToProps,
  mapDispatchToProps,
} from '../../components/ForgotPassword/ForgotPassword';

let wrapper;
let store;
const mockFn = jest.fn();

const props = {
  onSubmit: jest.fn().mockImplementation(() => Promise.resolve({ status: 201 })),
  onInputChange: mockFn,
  history: { push: mockFn },
};
const mockStore = configureMockStore();

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

  test('should render default state', () => {
    wrapper = shallow(<ForgotPassword {...props} />);
    expect(wrapper.state()).toEqual({
      validEmail: true,
      emailError: 'Email is not valid',
    });
  });

  test('should call `handleInpurChange` function', () => {
    const event = { target: { value: 'email@email.com' } };
    wrapper.find('.input>Input').simulate('change', event);
    expect(props.onInputChange).toHaveBeenCalled();
  });

  test('should add `loading` class to submit button', () => {
    wrapper.setProps({ submitting: true });
    expect(wrapper.find('Button').hasClass('loading'));
  });

  describe('when clicking on submit button', () => {
    beforeEach(() => {
      store = mockStore({});
      wrapper = mount(<ForgotPassword store={store} {...props} />);
    });

    test('should call onSubmitFunction with wrong email', () => {
      wrapper.find('.button').simulate('click');
      expect(wrapper.state()).toEqual({
        validEmail: false,
        emailError: 'Email is not valid',
      });
    });

    test('should call onSubmitFunction correct email', () => {
      wrapper.setProps({ email: 'email@email.com' });
      wrapper.find('.button').simulate('click');
      expect(props.onSubmit).toHaveBeenCalled();
      expect(wrapper.state()).toEqual({
        validEmail: true,
        emailError: 'Email is not valid',
      });
    });
  });

  describe('reducers', () => {
    test('should call onInputChange action', () => {
      const initialState = {
        forgotPassword: {
          email: 'email@email.com',
          message: 'message',
          errors: [],
          submitting: false,
        },
      };
      const state = mapStateToProps(initialState);
      expect(state).toEqual(initialState.forgotPassword);
    });
  });

  describe('actions creators', () => {
    test('should call onInputChange action', () => {
      const dispatch = jest.fn();
      const payload = { field: 'email', value: 'email@email.com' };
      const expectedActions = {
        type: 'FORGOT_PASSWORD_FORM',
        payload,
      };
      mapDispatchToProps(dispatch).onInputChange(payload);
      expect(dispatch.mock.calls[0][0]).toEqual(expectedActions);
    });

    test('should call onSubmit action', () => {
      const dispatch = jest.fn();
      const payload = { email: 'email@email.com' };
      mapDispatchToProps(dispatch).onSubmit(payload);
      expect(dispatch.mock.calls[0][0]).toBeDefined();
    });
  });
});
