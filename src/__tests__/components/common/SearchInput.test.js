import React from 'react';
import { shallow, mount } from 'enzyme';
import SearchInput from '../../../components/common/Input/SearchInput';

let wrapper;
const props = {
  onChange: jest.fn(),
};
describe('<SearchInput />', () => {
  beforeEach(() => {
    wrapper = mount(<SearchInput {...props} />);
  });
  test('Should render the <SearchInput />', () => {
    wrapper = shallow(<SearchInput {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  describe('when input changes', () => {
    test('should set state `value`', () => {
      const value = 'value';
      wrapper.find('input').simulate('change', { target: { value } });
      expect(wrapper.state().value).toBe(value);
    });

    test('should  set state `value` on `enter key` press', () => {
      const value = 'value';
      wrapper.find('input').simulate('keyDown', { keyCode: 13, target: { value } });
      expect(wrapper.state().value).toBe(value);
    });

    test('should  not set state `value` on `other key` press', () => {
      const value = 'value';
      wrapper.find('input').simulate('keyDown', { keyCode: 10, target: { value } });
      expect(wrapper.state().value).toBe('');
    });
  });
});
