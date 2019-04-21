import React from 'react';
import configureMockStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import Auth from '../../components/Auth';

describe('<Auth />', () => {
  const props = {
    history: '',
  };
  const mockStore = configureMockStore();
  const store = mockStore({});
  let wrapper;

  test('should render default state', () => {
    wrapper = shallow(<Auth store={store} {...props} />);
    expect(wrapper.props).toBeDefined();
  });
});
