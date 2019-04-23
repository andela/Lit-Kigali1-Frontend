import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store'; // ES6 modules
import thunk from 'redux-thunk';
import nock from 'nock';
import 'isomorphic-fetch';
import ConfirmedEmailMessage from '../../components/Auth/ConfirmedEmailMessage';

let wrapper;
const { API_URL = 'http://localhost:3000/api/v1' } = process.env;

const mockStore = configureStore([thunk]);
let store;
const mockFn = jest.fn();

const props = {
  onSubmit: jest.fn().mockImplementation(() => Promise.resolve({ status: 200 })),
  onInputChange: mockFn,
  history: { push: mockFn },
  match: {
    params: {
      userId: 'b2d3f3d8-5893-47df-b715-6f10f451bf92',
      confirmationCode: '0382040a-f609-49b6-a43a-f1878ae1b5fd',
    },
  },
};
const defaultState = {
  error: false,
  message: '',
  loading: true,
};

describe('<ConfirmedEmaiMessage  />', () => {
  test('should render the <ConfirmedEmaiMessage  />', () => {
    const renderedValue = renderer.create(<ConfirmedEmailMessage {...props} />).toJSON();
    expect(renderedValue).toMatchSnapshot();
  });

  test('should render default state', () => {
    wrapper = shallow(<ConfirmedEmailMessage {...props} />);
    expect(wrapper.state()).toEqual(defaultState);
  });

  test('should render default state', () => {
    wrapper = shallow(<ConfirmedEmailMessage {...props} />);
    wrapper.setState({ message: 'email confirmed' });
    expect(wrapper.state().message).toEqual('email confirmed');
  });

  test('should render fetch user', () => {
    wrapper = mount(<ConfirmedEmailMessage {...props} />);
    wrapper.setState({ message: 'email confirmed' });
    expect(wrapper.state().message).toEqual('email confirmed');
  });

  describe('fetch api', () => {
    beforeEach(() => {
      wrapper = mount(<ConfirmedEmailMessage {...props} />);
    });

    afterEach(() => {
      nock.cleanAll();
    });

    test('should render fetch confirm email status - FAILURE', () => {
      const { params } = props.match;
      nock(API_URL)
        .get(`/users/${params.userId}/confirm_email/${params.confirmationCode}`)
        .reply(401, {
          status: 401,
          message: 'Invalid token',
        });

      return wrapper
        .instance()
        .fetchConfirmEmail()
        .catch(() => {
          expect(wrapper.state().message).toEqual('Invalid token');
        });
    });

    test('should render fetch confirm email status - SUCCESS', () => {
      const { params } = props.match;
      nock(API_URL)
        .get(`/users/${params.userId}/confirm_email/${params.confirmationCode}`)
        .reply(200, {
          status: 200,
          message: 'email confirmed',
        });

      return wrapper
        .instance()
        .fetchConfirmEmail()
        .then(() => {
          expect(wrapper.state().message).toEqual('email confirmed');
        });
    });
  });
});
