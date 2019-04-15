import React from 'react';
import { shallow } from 'enzyme';
import { App, mapDispatchToProps } from '../../components/App';

let wrapper;
const props = {
  getCurrentUser: jest.fn().mockImplementation(() => Promise.resolve({ status: 200 })),
};
describe('<App />', () => {
  test('should render the <App />', () => {
    wrapper = shallow(<App {...props} />);
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
