import React from 'react';
import { shallow, mount } from 'enzyme';
import DeleteModal from '../../../components/common/Modal/DeleteModal';

let wrapper;
const props = {
  title: 'title',
  deleting: false,
  closeModal: jest.fn(),
  onDelete: jest.fn(),
};

describe('<DeleteModal />', () => {
  test('should render the <DeleteModal />', () => {
    wrapper = shallow(<DeleteModal {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  describe('when clicking on `No` button', () => {
    beforeEach(() => {
      wrapper = mount(<DeleteModal {...props} />);
    });

    test('should call `closeModal` prop', () => {
      wrapper.find('Button[data-name="no-btn"]').simulate('click');
      expect(props.closeModal).toHaveBeenCalled();
    });
  });
});
