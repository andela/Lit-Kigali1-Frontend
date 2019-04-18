import React from 'react';
import configureMockStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import Auth from '../../components/Auth';

describe('<Auth />', () => {
  const props = {
    history: '',
    onFlip: jest.fn(),
  };
  const mockStore = configureMockStore();
  const store = mockStore({});
  let wrapper;

  test('should render default state', () => {
    wrapper = shallow(<Auth store={store} {...props} />);
    expect(wrapper.props).toBeDefined();
  });

  test('should render default state', () => {
    wrapper = shallow(<Auth store={store} {...props} />);
    wrapper.setState({ onFlip: false });
    expect(wrapper.state().onFlip).toEqual(false);
  });

  test('should render default state', () => {
    wrapper = shallow(<Auth store={store} {...props} />);
    wrapper.instance().flip({ target: { id: 'flip-login' }, preventDefault: jest.fn() });
    expect(wrapper.state().flip).toEqual('flip-login');
  });
});
