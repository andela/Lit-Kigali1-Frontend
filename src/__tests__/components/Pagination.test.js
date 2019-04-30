import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';
import { Pagination } from '../../components/common/Pagination';

let wrapper;
const mockFn = jest.fn();

let props = {
  navigateTo: mockFn,
  onNext: mockFn,
  onPrev: mockFn,
  history: { push: mockFn },
  currentPage: 1,
  totalPages: 12,
  url: '/articles?page=2',
};

describe('<Pagination />', () => {
  test('should render the <Pagination />', () => {
    const renderedValue = renderer.create(<Pagination {...props} />).toJSON();
    expect(renderedValue).toMatchSnapshot();
  });

  test('should render the <Pagination />', () => {
    props = { ...props, currentPage: 2 };
    wrapper = mount(<Pagination {...props} />);
    expect(wrapper.props().currentPage).toEqual(2);
  });

  test('should render the <Pagination />', () => {
    props = { ...props, currentPage: 3 };
    wrapper = mount(<Pagination {...props} />);
    expect(wrapper.props().currentPage).toEqual(3);
  });

  test('should render the <Pagination />', () => {
    props = { ...props, currentPage: 12 };
    wrapper = mount(<Pagination {...props} />);
    expect(wrapper.props().currentPage).toEqual(12);
  });

  test('should render the <Pagination />', () => {
    props = { ...props, currentPage: 11 };
    wrapper = mount(<Pagination {...props} />);
    expect(wrapper.props().currentPage).toEqual(11);
  });

  test('should render the <Pagination />', () => {
    props = { ...props, totalPages: 4 };
    wrapper = mount(<Pagination {...props} />);
    expect(wrapper.props().totalPages).toEqual(4);
  });
});

describe('when clicking on navigate button', () => {
  beforeAll(() => {
    Object.defineProperty(window.location, 'reload', {
      configurable: true,
    });
    window.location.reload = jest.fn();
  });

  afterAll(() => {
    window.location.reload = reload;
  });

  test('should call navigateTo instance function', () => {
    wrapper
      .find('span[className="page"]')
      .at(1)
      .simulate('click');
    expect(props.history.push).toHaveBeenCalled();
  });
});
