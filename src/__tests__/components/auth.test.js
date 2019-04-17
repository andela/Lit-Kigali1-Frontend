import React from 'react';
import configureMockStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import Auth from '../../components/Auth';

describe('<Auth />', () => {
  const mockFn = jest.fn();

  const props = {
    history: '',
    flip: mockFn,
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
    wrapper.setState({ flip: false });
    expect(wrapper.state().flip).toEqual(false);
  });
});
