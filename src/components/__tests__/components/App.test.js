import React from 'react';
import { shallow } from 'enzyme';
import App from '../../App';

describe('<App />', () => {
  test('Should render the APP', () => {
    const app = shallow(<App />);
    expect(app).toMatchSnapshot();
  });
});
