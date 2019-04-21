import React from 'react';
import { shallow } from 'enzyme';
import Image from '../../components/Image/Image';

describe('<Image />', () => {
  const props = {
    src: '',
    classes: 'article-txt',
  };
  test('Should render the <Image />', () => {
    const wrapper = shallow(<Image {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
