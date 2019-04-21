import React from 'react';
import { shallow } from 'enzyme';
import Video from '../../components/Video/Video';

describe('<Video />', () => {
  const props = {
    src: '',
    classes: 'article-txt',
  };
  test('Should render the <Video />', () => {
    const wrapper = shallow(<Video {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
