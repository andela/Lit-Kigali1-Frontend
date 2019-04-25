import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import ArticleCard from '../../components/Article/ArticleCard';
import { articleData } from '../../__mocks__/dummyData';

let wrapper;
const props = {
  loading: true,
  article: articleData,
  url: '/articles/article-slug',
  history: { push: jest.fn() },
};

describe('<ArticleCard />', () => {
  beforeEach(() => {
    wrapper = mount(<ArticleCard {...props} />);
  });

  test('should render the <ArticleCard />', () => {
    const renderedValue = renderer.create(<ArticleCard {...props} />).toJSON();
    expect(renderedValue).toMatchSnapshot();
  });

  describe('when clicking on navigate button', () => {
    test('should call navigateTo instance function', () => {
      wrapper.find('div[role="presentation"]').simulate('click');
      expect(props.history.push).toHaveBeenCalled();
    });
  });
});
