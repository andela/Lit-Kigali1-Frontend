import React from 'react';
import { shallow } from 'enzyme';
import { NavBar, mapStateToProps } from '../../components/NavBar/NavBar';
import initialState from '../../redux/initialState';

describe('<NavBar />', () => {
  let wrapper;
  const props = {
    isLoggedIn: true,
    notificationsCount: 0,
    username: 'chris',
    image: 'image',
  };
  beforeEach(() => {
    wrapper = shallow(<NavBar />);
  });

  test('should render the NavBar', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should render the NavBar', () => {
    expect(wrapper.state().showMenu).toBeFalsy();
  });

  test('should render the NavBar', () => {
    wrapper.setProps(props);
    expect(wrapper.find('.fa-bell')).toBeDefined();
  });

  test('should render the NavBar', () => {
    wrapper.setProps(props);
    expect(wrapper.find('.badge')).toBeDefined();
  });

  describe('when clicking on the `hamburger button`', () => {
    beforeEach(() => {
      wrapper.find('.hamburger').simulate('click');
    });
    afterEach(() => {
      wrapper.setState({ showMenu: false });
    });

    test('changes the `showMenu state` to true', () => {
      expect(wrapper.state().showMenu).toBeTruthy();
    });

    test('changes the `showMenu state` to false', () => {
      wrapper.find('.hamburger').simulate('click');
      expect(wrapper.state().showMenu).toBeFalsy();
    });

    test('changes the `showMenu state` to false by calling `showMenu` function', () => {
      wrapper.instance().showMenu();
      expect(wrapper.state().showMenu).toBeFalsy();
    });

    test('changes the `showMenu state` to false by calling `closeMenu` function', () => {
      wrapper.instance().closeMenu();
      expect(wrapper.state().closeMenu).toBeFalsy();
    });
  });

  describe('reducers', () => {
    test('should return `mapStateToProps`', () => {
      const state = mapStateToProps(initialState);
      expect(state).toEqual({
        isLoggedIn: false,
        username: '',
        image: undefined,
        notificationsCount: 0,
      });
    });
  });
});
