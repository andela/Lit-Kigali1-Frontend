import React from 'react';
import { shallow, mount } from 'enzyme';
import { articleData, articleData2 } from '../../__mocks__/dummyData';
import { Home, mapStateToProps, mapDispatchToProps } from '../../components/Home/Home';

const props = {
  location: {
    search: '?token=jfmvnvvmvmvncvmcmnvcmmvm',
  },
  feed: {
    articles: [articleData],
    slug: 'new-article-1',
    page: 1,
    pages: 3,
  },
  getCurrentUser: jest.fn().mockImplementation(() => Promise.resolve({ status: 200 })),
  getArticles: jest.fn().mockImplementation(() => Promise.resolve({ status: 200 })),
  articles: [articleData],
  slice: jest.fn(),
  slideProperties: {
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    indicators: true,
    arrows: true,
  },
  getAllArticles: jest.fn(),
};

console.error = jest.fn();

jest.mock('react-slideshow-image', () => ({ Slide: 'Slide' }));

describe('<Home />', () => {
  test('Should render the <Home />', () => {
    const wrapper = shallow(<Home {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('should render <Article /> with articles', () => {
    const wrapper = mount(<Home {...props} />);
    expect(wrapper.props().feed).toBeDefined();
    expect(wrapper.props().feed.slug).toBeDefined();
  });

  describe('actions creators', () => {
    test('should call getCurrentUser action', () => {
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).getCurrentUser();
      expect(dispatch).toHaveBeenCalled();
    });

    test('should call getArticles action', () => {
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).getArticles();
      expect(dispatch).toHaveBeenCalled();
    });
  });
});
