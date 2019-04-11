import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import {
  LoginComponent as Login,
  mapDispatchToProps,
  mapStateToProps,
} from '../../components/Auth/Login';

let wrapper;
let store;
const mockFn = jest.fn();

const props = {
  login: jest.fn().mockImplementation(() => Promise.resolve({ status: 200 })),
  handleInput: mockFn,
  validate: jest.fn().mockImplementation(() => Promise.resolve({ message: 'Ok' })),
  history: { push: mockFn },
};

const mockStore = configureMockStore();

describe('<Login />', () => {
  test('should render the <Login />', () => {
    const renderedValue = renderer
      .create(
        <Router>
          <Login {...props} />
        </Router>,
      )
      .toJSON();
    expect(renderedValue).toMatchSnapshot();
  });

  test('Should call handleInput', () => {
    const event = { target: { value: 'email@email.com' } };
    wrapper = shallow(<Login {...props} />);
    wrapper.find('#username').simulate('change', event);
    expect(props.handleInput).toHaveBeenCalled();
  });

  test('should add `loading` class to submit button', () => {
    wrapper.setProps({ submitting: true });
    expect(wrapper.find('Button').hasClass('loading'));
  });

  describe('Clicking submit button', () => {
    beforeEach(() => {
      store = mockStore({});
      wrapper = mount(
        <Router>
          <Login store={store} {...props} />
        </Router>,
      );
    });

    test('should call submit function', () => {
      wrapper.setProps({
        credentials: {
          username: 'christian',
          password: '123456',
        },
      });
      wrapper.find('.button').simulate('click');
      expect(props.validate).toHaveBeenCalled();
    });
  });

  describe('actions creators', () => {
    test('should call handleInput action', () => {
      const dispatch = jest.fn();
      const payload = { field: 'username', value: 'email@email.com' };
      const expectedActions = {
        type: 'HANDLE_LOGIN_INPUT',
        payload,
      };
      mapDispatchToProps(dispatch).handleInput(payload);
      expect(dispatch.mock.calls[0][0]).toEqual(expectedActions);
    });

    test('should call login action', () => {
      const dispatch = jest.fn();
      const payload = { username: 'email@email.com', password: '123456' };
      mapDispatchToProps(dispatch).login(payload);
      expect(dispatch.mock.calls[0][0]).toBeDefined();
    });

    test('should call validate action', () => {
      const dispatch = jest.fn();
      const payload = { username: 'email@email.com', password: '123456' };
      mapDispatchToProps(dispatch).validate(payload);
      expect(dispatch.mock.calls[0][0]).toBeDefined();
    });
  });

  describe('reducers', () => {
    test('should call handleInput action', () => {
      const initialState = {
        login: {
          submitting: false,
          credentials: {
            username: '',
            password: '',
          },
        },
        currentUser: { isLoggedIn: false },
      };
      const expectedState = {
        credentials: { username: '', password: '' },
        error: undefined,
        submitting: false,
        isLoggedIn: false,
      };
      const state = mapStateToProps(initialState);
      expect(state).toEqual(expectedState);
    });
  });
});
