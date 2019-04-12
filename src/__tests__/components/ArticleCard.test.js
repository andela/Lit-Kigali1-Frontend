import React from 'react';
import { shallow } from 'enzyme';
import ArticleCard from '../../components/Article/ArticleCard';
import { articleData } from '../../__mocks__/dummyData';

const props = { article: articleData, classes: '' };

describe('<ArticleCard />', () => {
  test('should render the <ArticleCard />', () => {
    const wrapper = shallow(<ArticleCard {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
