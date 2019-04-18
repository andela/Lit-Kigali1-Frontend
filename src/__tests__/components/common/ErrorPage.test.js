import React from 'react';
import { shallow, mount } from 'enzyme';
import ErrorPage from '../../../components/common/ErrorPage/ErrorPage';

let wrapper;
const props = {
  type: '404',
  history: {
    goBack: jest.fn(),
  },
};
describe('<ErrorPage />', () => {
  test('should render the <ErrorPage />', () => {
    wrapper = shallow(<ErrorPage />);
    expect(wrapper).toMatchSnapshot();
  });

  describe('when clicking on navigate button', () => {
    beforeEach(() => {
      wrapper = mount(<ErrorPage {...props} />);
    });
    test('should have render 404 and navigate back', () => {
      wrapper.find('button').simulate('click');
    });
    test('should have render 500 and reload the page', () => {
      Object.defineProperty(window.location, 'reload', {
        configurable: true,
      });
      window.location.reload = jest.fn();
      const newProps = { ...props, type: '500' };
      wrapper = mount(<ErrorPage {...newProps} />);
      wrapper.find('button').simulate('click');
    });
    test('should have render default type', () => {
      const newProps = { ...props, type: '' };
      wrapper = mount(<ErrorPage {...newProps} />);
      wrapper.find('button').simulate('click');
    });
  });
});
