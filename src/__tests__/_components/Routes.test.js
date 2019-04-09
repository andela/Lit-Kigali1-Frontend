import React from 'react';
import { shallow } from 'enzyme';
import Routes from '../../components/Routes';

describe('<Routes />', () => {
  test('Should render the Routes', () => {
    const routes = shallow(<Routes />);
    expect(routes).toMatchSnapshot();
  });
});
