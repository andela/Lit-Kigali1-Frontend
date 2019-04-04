import React from 'react';
import { shallow } from 'enzyme';
import Button from '../../../common/Button/Button';

describe('<Button />', () => {
  test('Should render the <Button />', () => {
    const wrapper = shallow(<Button>Button</Button>);
    expect(wrapper).toMatchSnapshot();
  });
});
