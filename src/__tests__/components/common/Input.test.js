import React from 'react';
import { shallow } from 'enzyme';
import Input from '../../../components/common/Input/Input';

describe('<Input />', () => {
  test('Should render the <Input />', () => {
    const handleInput = () => true;
    const wrapper = shallow(<Input onChange={handleInput} />);
    expect(wrapper).toMatchSnapshot();
  });
});
