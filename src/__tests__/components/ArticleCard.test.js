import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import ArticleCard from '../../components/Article/ArticleCard';
import { articleData, signupUser } from '../../__mocks__/dummyData';

let wrapper;
const props = {
  loading: true,
  article: {
    ...articleData,
    author: signupUser,
  },
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

  test("should render the `article's body`", () => {
    const newProps = props;
    newProps.article.desciption = undefined;
    wrapper = mount(<ArticleCard {...newProps} />);
    expect(wrapper.props().article.desciption).toBeUndefined();
  });

  describe('when clicking on navigate button', () => {
    test('should call navigateTo instance function', () => {
      wrapper.find('div[data-el="main-container"]').simulate('click');
      expect(props.history.push).toHaveBeenCalled();
    });

    test('should call toProfile instance function', () => {
      wrapper.find('div[data-el="username"]').simulate('click');
      expect(props.history.push).toHaveBeenCalled();
    });
  });
});
