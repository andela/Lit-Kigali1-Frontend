import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';
import { SignUp, mapStateToProps, mapDispatchToProps } from '../../components/Auth/SignUp';

let wrapper;
let store;
const mockFn = jest.fn();
const props = {
  email: '',
  password: '',
  username: '',
  onSubmit: jest.fn().mockImplementation(() => Promise.resolve({ status: 201 })),
  onInputChange: mockFn,
  history: { push: mockFn },
};

const mockStore = configureMockStore();

const defaultState = {
  validUsername: true,
  usernameError: 'username is not allowed to be empty',
  validEmail: true,
  emailError: 'Email is not valid',
  validPassword: true,
  passwordError: 'Password must have at least 6 characters',
};

describe('<SignUp />', () => {
  test('should render the <SignUp />', () => {
    const renderedValue = renderer
      .create(
        <Router>
          <SignUp {...props} />
        </Router>,
      )
      .toJSON();
    expect(renderedValue).toMatchSnapshot();
  });

  test('should render default state', () => {
    wrapper = shallow(<SignUp {...props} />);
    expect(wrapper.state()).toEqual(defaultState);
  });
});

describe('when clicking on submit button', () => {
  beforeEach(() => {
    wrapper = mount(
      <Router>
        <SignUp {...props} />
      </Router>,
    );
  });
  test('should call onSubmitFunction', () => {
    wrapper = shallow(<SignUp {...props} />);
    wrapper.find('Button').simulate('click');
    expect(wrapper.state()).toEqual({
      ...defaultState,
      validUsername: false,
    });
  });
});

describe('when typing into the username input', () => {
  beforeAll(() => {
    wrapper = mount(<SignUp {...props} />);
    wrapper.find('Input[name="username"]').simulate('change', { target: { value: '' } });
  });
  test('should update the username prop', () => {
    wrapper = shallow(<SignUp {...props} />);
    expect(wrapper.state()).toEqual(defaultState);
  });
});

describe('when typing into the password input', () => {
  beforeAll(() => {
    wrapper = mount(<SignUp {...props} />);
    wrapper.find('Input[name="password"]').simulate('change', { target: { value: '' } });
  });
  test('should update the password prop', () => {
    wrapper = shallow(<SignUp {...props} />);
    expect(wrapper.state()).toEqual(defaultState);
  });
});

describe('when typing into the email input', () => {
  beforeAll(() => {
    wrapper = mount(<SignUp {...props} />);
    wrapper.find('Input[name="email"]').simulate('change', { target: { value: 'caleb@test.com' } });
  });
  test('should update the email prop', () => {
    wrapper = shallow(<SignUp {...props} />);
    expect(wrapper.state()).toEqual(defaultState);
  });
});

describe('when clicking on submit button', () => {
  beforeEach(() => {
    store = mockStore({});
    wrapper = mount(<SignUp store={store} {...props} />);
  });
  test('should call onSubmitFunction with wrong inputs', () => {
    wrapper.find('.button').simulate('click');
    expect(wrapper.state()).toEqual({
      ...defaultState,
      validUsername: false,
      passwordError: 'Password must have at least 6 characters',
    });
  });

  test('should call onSubmitFunction wrong email', () => {
    wrapper.setProps({ username: 'test', password: 'testpassword' });
    wrapper.find('.button').simulate('click');
    expect(wrapper.state()).toEqual({
      ...defaultState,
      validEmail: false,
      emailError: 'Email is not valid',
    });
  });

  test('should call onSubmitFunction wrong password', () => {
    wrapper.setProps({ username: 'test', email: 'test@email.com' });
    wrapper.find('.button').simulate('click');
    expect(wrapper.state()).toEqual({
      ...defaultState,
      validPassword: false,
      passwordError: 'Password must have at least 6 characters',
    });
  });

  test('should call onSubmitFunction success', () => {
    wrapper.setProps({ username: 'test', email: 'test@email.com', password: 'testpassword' });
    wrapper.find('.button').simulate('click');
    expect(wrapper.state()).toEqual({
      ...defaultState,
    });
  });
});

describe('reducers', () => {
  test('should call onInputChange action', () => {
    const initialState = {
      signUp: {
        username: 'test',
        email: 'test@email.com',
        password: 'test123',
        message: 'message',
        errors: [],
        // token:
        //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjkyMWEyOTMzLWI4OTQtNGIzYi1hOGEzLTMzYzRmMzRmZjQ5NSIsInVzZXJUeXBlIjoidXNlciIsImlhdCI6MTU1NDk3NjY4Nn0.Vds2yvNxqggvkJHd2lghRn75dcSWqDEGK5efug6MOc0',
        submitting: false,
      },
    };
    const state = mapStateToProps(initialState);
    expect(state).toEqual(initialState.signUp);
  });
});

describe('actions creators', () => {
  test('should call onInputChange action', () => {
    const dispatch = jest.fn();
    const payload = { field: 'email', value: 'email@email.com' };
    const expectedActions = {
      type: 'SIGNUP_FORM',
      payload,
    };
    mapDispatchToProps(dispatch).onInputChange(payload);
    expect(dispatch.mock.calls[0][0]).toEqual(expectedActions);
  });

  test('should call onSubmit action', () => {
    const dispatch = jest.fn();
    const payload = { username: 'test', email: 'test@email.com', password: 'testpassword' };
    mapDispatchToProps(dispatch).onSubmit(payload);
    expect(dispatch.mock.calls[0][0]).toBeDefined();
  });
});
