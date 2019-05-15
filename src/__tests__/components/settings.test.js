import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import initialState from '../../redux/initialState';
import { Settings, mapDispatchToProps, mapStateToProps } from '../../components/Settings/Settings';

let wrapper;
let store;
const mockFn = jest.fn();

const props = {
  loading: true,
  notification: true,
  getCurrentUser: jest.fn().mockImplementation(() => Promise.resolve({ status: 200 })),
  onStatusChange: jest.fn().mockImplementation(() => Promise.resolve({ status: 200 })),
  handleChange: jest.fn(),
  switchTab: jest.fn(),
};

describe('<Settings />', () => {
  test('Should render the <Home />', () => {
    const wrapper = shallow(<Settings {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('should change change tab', () => {
    const wrapper = mount(<Settings {...props} />);
    wrapper.setState({ openTab: 0 });
    wrapper
      .find('li')
      .at(0)
      .simulate('click');
    expect(wrapper.state().openTab).toEqual(0);
  });

  test('should change notifications button', () => {
    const wrapper = mount(<Settings {...props} />);
    wrapper.setState({ openTab: 1 });
    wrapper.find('.onoffswitch-checkbox').simulate('change');
    expect(props.onStatusChange).toHaveBeenCalled();
  });

  test('should change change tab', () => {
    const wrapper = mount(<Settings {...props} />);
    wrapper.setState({ openTab: 1 });
    wrapper
      .find('li')
      .at(1)
      .simulate('click');
    expect(wrapper.state().openTab).toEqual(1);
  });

  describe('actions creators', () => {
    test('should call getCurrentUser action', () => {
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).getCurrentUser();
      expect(dispatch).toHaveBeenCalled();
    });

    test('should call getArticles action', () => {
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).onStatusChange();
      expect(dispatch).toHaveBeenCalled();
    });
  });

  describe('reducers', () => {
    test('should return `mapStateToProps`', () => {
      const initialState = {
        currentUser: {
          profile: {
            notification: true,
          },
        },
      };
      const state = mapStateToProps(initialState);
      expect(state).toEqual({ notification: true });
    });
  });
});
