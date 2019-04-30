import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { Article, mapStateToProps, mapDispatchToProps } from '../../components/Article/Article';
import { articleData, articleDataDraft } from '../../__mocks__/dummyData';
import initialState from '../../redux/initialState.json';

let wrapper;
const props = {
  loading: true,
  singleArticle: articleData,
  currentUser: {
    username: 'username',
  },
  getArticle: jest.fn().mockImplementation(() => Promise.resolve({ status: 200 })),
  rateArticle: jest.fn().mockImplementation(() => Promise.resolve({ status: 200 })),
  match: {
    params: {
      articleSlug: 'article-slug',
    },
  },
  history: { push: jest.fn() },
};
describe('<Article />', () => {
  beforeEach(() => {
    wrapper = mount(<Article {...props} />);
  });
  test('should render the <Article />', () => {
    const renderedValue = renderer.create(<Article {...props} />).toJSON();
    expect(renderedValue).toMatchSnapshot();
  });

  test('should render <Article /> with tags', () => {
    wrapper = mount(<Article {...props} />);
    expect(wrapper.props().singleArticle.tagList).toBeDefined();
  });

  describe('should render different ratings', () => {
    test('should render <Article /> rated equals to 1', () => {
      props.singleArticle.rated = 1;
      wrapper = mount(<Article {...props} />);
      expect(wrapper.props().singleArticle.rated).toBe(1);
    });

    test('should render <Article /> rated equals to 2', () => {
      props.singleArticle.rated = 2;
      wrapper = mount(<Article {...props} />);
      expect(wrapper.props().singleArticle.rated).toBe(2);
    });

    test('should render <Article /> rated equals to 3', () => {
      props.singleArticle.rated = 3;
      wrapper = mount(<Article {...props} />);
      expect(wrapper.props().singleArticle.rated).toBe(3);
    });

    test('should render <Article /> rated equals to 4', () => {
      props.singleArticle.rated = 4;
      wrapper = mount(<Article {...props} />);
      expect(wrapper.props().singleArticle.rated).toBe(4);
    });

    test('should render <Article /> rated equals to 5', () => {
      props.singleArticle.rated = 5;
      wrapper = mount(<Article {...props} />);
      expect(wrapper.props().singleArticle.rated).toBe(5);
    });
  });

  describe('when clicking on rateArticle', () => {
    beforeEach(() => {
      wrapper = mount(<Article {...props} />);
    });
    test('should call onSelectedRating method instance', () => {
      wrapper.find('button[data-value="5"]').simulate('click');
      expect(props.rateArticle).toHaveBeenCalled();
    });
  });

  describe("when clicking article's rates", () => {
    beforeEach(() => {
      wrapper = mount(<Article {...props} />);
    });
    test('should call onSelectedRating method instance', () => {
      wrapper.find('span[data-name="rate-btn"]').simulate('click');
      expect(props.history.push).toHaveBeenCalled();
    });
    test('should render <Article /> with cover', () => {
      props.singleArticle.cover = 'https://picsum.photos/200/300';
      wrapper = mount(<Article {...props} />);
      expect(wrapper.props().singleArticle.cover).toBeDefined();
    });

    test('should render <Article /> the Editor', () => {
      const newProps = props;
      newProps.singleArticle = articleDataDraft;
      wrapper = mount(<Article {...newProps} />);
      expect(wrapper.props().singleArticle.tagList).toBeDefined();
    });

    test('should render <Article /> with cover', () => {
      props.singleArticle.cover = 'https://picsum.photos/200/300';
      wrapper = mount(<Article {...props} />);
      expect(wrapper.props().singleArticle.cover).toBeDefined();
    });

    test('should render <Article /> the Editor', () => {
      const newProps = { ...props, singleArticle: articleDataDraft };
      wrapper = mount(<Article {...newProps} />);
      expect(wrapper.props().singleArticle.tagList).toBeDefined();
    });

    describe('reducers', () => {
      test('should initialize the component state', () => {
        const state = mapStateToProps(initialState);
        expect(state).toHaveProperty('loading');
        expect(state).toHaveProperty('singleArticle');
        expect(state).toHaveProperty('submitting');
        expect(state).toHaveProperty('currentUser');
      });
    });

    describe('actions creators', () => {
      test('should call getArticle action', () => {
        const articleSlug = 'article-slug';
        const dispatch = jest.fn();
        mapDispatchToProps(dispatch).getArticle(articleSlug);
        expect(dispatch).toHaveBeenCalled();
      });

      test('should call rateArticle action', () => {
        const articleSlug = 'article-slug';
        const dispatch = jest.fn();
        mapDispatchToProps(dispatch).rateArticle({ articleSlug, rate: 3 });
        expect(dispatch).toHaveBeenCalled();
      });
    });
  });
});
