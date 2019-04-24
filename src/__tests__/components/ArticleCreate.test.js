import React from 'react';
import { shallow } from 'enzyme';
import ArticleCreate from '../../components/Article/ArticleCreate';

describe('<ArticleCreate/>', () => {
  test('should render the <ArticleCard />', () => {
    const wrapper = shallow(<ArticleCreate />);
    expect(wrapper).toMatchSnapshot();
  });
});
