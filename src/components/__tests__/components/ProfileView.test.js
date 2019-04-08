import React from 'react';
import { shallow } from 'enzyme';
import ProfileView from '../../Profile/ProfileView';

describe('<ProfileView />', () => {
  test('Should render the <ProfileView />', () => {
    const wrapper = shallow(<ProfileView />);
    expect(wrapper).toMatchSnapshot();
  });
});
