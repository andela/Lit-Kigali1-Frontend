import React from 'react';
import { shallow } from 'enzyme';
import Button from '../../../components/common/Button/Button';

let wrapper;
const props = {
  onClick: jest.fn(),
};
describe('<Button />', () => {
  test('should render the <Button />', () => {
    wrapper = shallow(<Button>Button</Button>);
    expect(wrapper).toMatchSnapshot();
  });
  it('should have onClick as prop', () => {
    expect(wrapper.props().onClick).toBeDefined();
  });
  it('should have onClick returning `button` as prop ', () => {
    const result = Button.defaultProps.onClick();
    expect(result).toBe('button');
  });
  describe('when clicking on the button', () => {
    beforeAll(() => {
      wrapper = shallow(<Button {...props}>Button</Button>);
    });
    it('should have onClick as prop', () => {
      expect(wrapper.props().onClick).toEqual(props.onClick);
    });
    it('calls props.onClick', () => {
      wrapper.find('button').simulate('click');
      expect(props.onClick).toHaveBeenCalled();
    });
  });
});
