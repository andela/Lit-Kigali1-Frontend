import React from 'react';
import { shallow } from 'enzyme';
import SocialLoginIcon from '../../components/SocialLoginIcon';

let component;
const dataTest = {
  div: 'container',
  a: 'image',
  img: 'img',
};
describe('<Login />', () => {
  beforeEach(() => {
    component = shallow(<SocialLoginIcon id="id" alt="alt" href="href" icon="icon" dataTest={dataTest} />);
  });
  test('should render a div', () => {
    const div = component.find(`[data-test='${dataTest.div}']`);
    expect(div.length).toEqual(1);
  });
  test('should render a anchor tag', () => {
    const anchor = component.find(`[data-test='${dataTest.a}']`);
    expect(anchor.length).toEqual(1);
  });
  test('should render an image', () => {
    const img = component.find(`[data-test='${dataTest.img}']`);
    expect(img.length).toEqual(1);
  });
});
