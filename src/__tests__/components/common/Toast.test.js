import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import Toast from '../../../components/common/Toast/Toast';

let wrapper;
const props = {
  show: true,
};
jest.useFakeTimers();

describe('<Toast />', () => {
  beforeEach(() => {
    wrapper = mount(<Toast {...props} />);
  });
  test('should render the <Toast />', () => {
    const renderedValue = renderer.create(<Toast {...props} />).toJSON();
    expect(renderedValue).toMatchSnapshot();
  });

  test('should display the <Toast />', () => {
    expect(wrapper.props().show).toBeTruthy();
  });

  test('should not display the <Toast />', () => {
    wrapper.setState({ active: false });
    expect(wrapper.props().show).toBeTruthy();
    expect(wrapper.state().active).toBeFalsy();
  });

  test('should call componentWillReceiveProps', () => {
    wrapper.instance().componentWillReceiveProps({ show: true });
    expect(wrapper.props().show).toBeTruthy();
    expect(wrapper.state().active).toBeTruthy();
    jest.runAllTimers();
    wrapper.update();
    expect(wrapper.state().active).toBeFalsy();
  });
});
