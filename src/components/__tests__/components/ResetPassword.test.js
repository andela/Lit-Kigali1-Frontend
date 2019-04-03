import React from 'react';
import { shallow } from 'enzyme';
import ResetPassword from '../../ResetPassword/ResetPassword';

describe('<ResetPassword />', () => {
  let wrapper;
  test('Should render the <ResetPassword />', () => {
    wrapper = shallow(<ResetPassword />);
    expect(wrapper).toMatchSnapshot();
  });
});
