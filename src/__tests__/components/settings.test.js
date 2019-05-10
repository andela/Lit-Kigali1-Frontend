import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import { Settings, mapDispatchToProps, mapStateToProps } from '../../components/Settings/Settings';

let wrapper;
let store;
const mockFn = jest.fn();

const props = {
  loading: true,
  notifications: false,
  getCurrentUser: jest.fn().mockImplementation(() => Promise.resolve({ status: 200 })),
  onStatusChange: jest.fn(),
  handleChange: jest.fn(),
};

describe('<Settings />', () => {
  test('Should render the <Home />', () => {
    const wrapper = shallow(<Settings {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  //   test('should change notifications button', () => {
  //     const wrapper = mount(<Settings {...props} />);
  //     wrapper.find('.onoffswitch-checkbox').simulate('change');
  //     expect(props.handleChange).toHaveBeenCalled();
  //   });
});
