import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import ArticleCard from '../../components/Article/ArticleCard';
import { articleData } from '../../__mocks__/dummyData';

<<<<<<< HEAD
let wrapper;
const props = {
  loading: true,
  article: articleData,
=======
const props = {
  article: articleData,
  classes: '',
>>>>>>> feat: complete view all articles
  url: '/articles/article-slug',
  history: { push: jest.fn() },
};

let wrapper;
describe('<ArticleCard />', () => {
  beforeEach(() => {
    wrapper = mount(<ArticleCard {...props} />);
  });

  test('should render the <ArticleCard />', () => {
<<<<<<< HEAD
    const renderedValue = renderer.create(<ArticleCard {...props} />).toJSON();
    expect(renderedValue).toMatchSnapshot();
  });

  describe('when clicking on navigate button', () => {
    test('should call navigateTo instance function', () => {
      wrapper.find('div[role="presentation"]').simulate('click');
      expect(props.history.push).toHaveBeenCalled();
    });
=======
    wrapper = shallow(<ArticleCard {...props} />);
    expect(wrapper).toMatchSnapshot();
>>>>>>> feat: complete view all articles
  });

  describe('when clicking on the card', () => {
    test('should call history push', () => {
      wrapper = shallow(<ArticleCard {...props} />);
      wrapper.find('.article-card').simulate('click');
      expect(props.history.push).toHaveBeenCalled();
    });
  });
});
