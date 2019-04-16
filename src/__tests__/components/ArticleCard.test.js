import React from 'react';
import { shallow } from 'enzyme';
import ArticleCard from '../../components/Article/ArticleCard';
import { articleData } from '../../__mocks__/dummyData';

const props = {
  article: articleData,
  classes: '',
  url: '/articles/article-slug',
  history: { push: jest.fn() },
};

let wrapper;
describe('<ArticleCard />', () => {
  test('should render the <ArticleCard />', () => {
    wrapper = shallow(<ArticleCard {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  describe('when clicking on the card', () => {
    test('should call history push', () => {
      wrapper = shallow(<ArticleCard {...props} />);
      wrapper.find('.article-card').simulate('click');
      expect(props.history.push).toHaveBeenCalled();
    });
  });
});
