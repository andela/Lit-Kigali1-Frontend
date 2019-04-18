import React from 'react';
import { shallow } from 'enzyme';
import { Home, mapDispatchToProps } from '../../components/Home/Home';

const props = {
  location: {
    search: '?token=jfmvnvvmvmvncvmcmnvcmmvm',
  },
  getCurrentUser: jest.fn().mockImplementation(() => Promise.resolve({ status: 200 })),
};

describe('<Home />', () => {
  test('Should render the <Home />', () => {
    const wrapper = shallow(<Home {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
  
  describe('actions creators', () => {
    test('should call getCurrentUser action', () => {
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).getCurrentUser();
      expect(dispatch).toHaveBeenCalled();
    });
  });
});
