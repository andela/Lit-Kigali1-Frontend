import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';

import {
  ResetPassword,
  mapStateToProps,
  mapDispatchToProps,
} from '../../components/ForgotPassword/ResetPassword';

let wrapper;
let store;
const mockFn = jest.fn();

const props = {
  onSubmit: jest.fn().mockImplementation(() => Promise.resolve({ status: 200 })),
  onInputChange: mockFn,
  history: { push: mockFn },
  match: {
    params: {
      userId: 'b2d3f3d8-5893-47df-b715-6f10f451bf92',
      resetCode: '0382040a-f609-49b6-a43a-f1878ae1b5fd',
    },
  },
};
const mockStore = configureMockStore();
const defaultState = {
  validPassword: true,
  passwordError: 'Password must have at least 6 characters',
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

  test('should set submitting to true', () => {
    wrapper = mount(<ResetPassword {...props} />);
    wrapper.setProps({ submitting: true });
    expect(wrapper.props().submitting).toBeTruthy();
    expect(wrapper.find('Button').hasClass('loading'));
  });

  describe('when clicking on submit button', () => {
    beforeEach(() => {
      wrapper = mount(<ResetPassword {...props} />);
    });

    test('should call onSubmitFunction', () => {
      wrapper.find('Button').simulate('click');
      expect(wrapper.state()).toEqual({ ...defaultState, validPassword: false });
    });
  });

  describe('when typing into the newPassword input', () => {
    beforeAll(() => {
      wrapper = mount(<ResetPassword {...props} />);
      wrapper.find('Input[name="newPassword"]').simulate('change', { target: { value: '12345' } });
    });

    test('should update the newPassword prop', () => {
      expect(wrapper.state()).toEqual(defaultState);
    });

    test('should update the newPassword prop', () => {
      expect(wrapper.state()).toEqual(defaultState);
    });
  });

  describe('when typing into the confirmNewpassword input', () => {
    beforeEach(() => {
      wrapper = mount(<ResetPassword {...props} />);
      wrapper.find('Input[name="confirmNewpassword"]').simulate('change', { value: '12345' });
    });

    test('should update the confirmNewpassword prop', () => {
      expect(wrapper.state()).toEqual(defaultState);
    });
  });

  describe('when clicking on submit button', () => {
    beforeEach(() => {
      store = mockStore({});
      wrapper = mount(<ResetPassword store={store} {...props} />);
    });

    test('should call onSubmitFunction with wrong email', () => {
      wrapper.find('.button').simulate('click');
      expect(wrapper.state()).toEqual({ ...defaultState, validPassword: false });
    });

    test('should call onSubmitFunction mismatched password', () => {
      wrapper.setProps({ newPassword: '123456', confirmNewpassword: '12345' });
      wrapper.find('.button').simulate('click');
      expect(wrapper.props().confirmNewpassword).toEqual('12345');
    });

    test('should call onSubmitFunction correct passwords', () => {
      wrapper.setProps({ newPassword: '123456', confirmNewpassword: '123456' });
      wrapper.find('.button').simulate('click');
      expect(props.onSubmit).toHaveBeenCalled();
      expect(wrapper.state()).toEqual(defaultState);
    });
  });

  describe('reducers', () => {
    test('should call onInputChange action', () => {
      const initialState = {
        forgotPassword: {
          newPassword: '123456',
          confirmNewpassword: '12345',
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
