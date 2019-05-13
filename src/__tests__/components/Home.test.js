import React from 'react';
import { shallow, mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { articleData } from '../../__mocks__/dummyData';
import { Home, mapDispatchToProps } from '../../components/Home/Home';

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
  recommends: [articleData],
  getCurrentUser: jest.fn().mockImplementation(() => Promise.resolve({ status: 200 })),
  getArticles: jest.fn().mockImplementation(() => Promise.resolve({ status: 200 })),
  getRecommends: jest.fn().mockImplementation(() => Promise.resolve({ status: 200 })),
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
  onscroll: jest.fn(),
};

console.error = jest.fn();

jest.mock('react-slideshow-image', () => ({ Slide: 'Slide' }));

describe('<Home />', () => {
  const renderedValue = renderer
    .create(
      <Router>
        <Home {...props} />
      </Router>,
    )
    .toJSON();
  test('Should render the <Home />', () => {
    expect(renderedValue).toMatchSnapshot();
  });

  test('should render <Article /> with Feed', () => {
    const wrapper = mount(
      <Router>
        <Home {...props} />
      </Router>,
    );
    expect(wrapper.find('Home').props().feed).toBeDefined();
  });

  test('should render <Article /> with Recommends', () => {
    const newProps = { ...props, isLoggedIn: true };
    const wrapper = mount(
      <Router>
        <Home {...newProps} />
      </Router>,
    );
    expect(wrapper.find('Home').props().recommends).toBeDefined();
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

    test('should call getRecommends action', () => {
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).getRecommends();
      expect(dispatch).toHaveBeenCalled();
    });
  });
});

describe('Home articles', () => {
  const map = {};
  let component;
  let instance;
  beforeEach(() => {
    document.addEventListener = jest.fn((event, cb) => {
      map[event] = cb;
    });
    component = shallow(<Home {...props} />);
    instance = component.instance();
    jest.spyOn(instance, 'handleScroll');
    jest.spyOn(instance, 'getAllArticles');
  });

  afterEach(() => {
    instance.handleScroll.mockClear();
    instance.getAllArticles.mockClear();
  });

  test('get all articles', () => {
    const { page } = component.state();
    map.scroll();
    expect(instance.handleScroll).toBeCalled();
    expect(component.state().page).toEqual(page);
    expect(instance.getAllArticles).not.toBeCalled();
  });

  test('get all articles on scroll', () => {
    const { page } = component.state();

    window.innerHeight = 0;
    map.scroll();
    expect(instance.handleScroll).toBeCalled();
    expect(component.state().page).toEqual(page + 1);
  });
});
