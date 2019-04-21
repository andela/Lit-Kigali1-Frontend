import React from 'react';
import { shallow } from 'enzyme';
import Link from '../../components/Link/Link';

describe('<Tag />', () => {
  const props = {
    contentState: {
      getEntity: () => ({
        getData: () => ({ url: 'www.google.com' }),
      }),
    },
    entityKey: '',
    children: 'hello world',
  };
  let wrapper;

  test('should render default state', () => {
    wrapper = shallow(<Link {...props} />);
    expect(wrapper.props).toBeDefined();
  });
});
