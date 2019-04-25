import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';
import {
  Pagination,
  mapStateToProps,
  mapDispatchToProps,
} from '../../components/common/Pagination';

let wrapper;
let store;
const mockFn = jest.fn();

let props = {
  //   onSubmit: jest.fn().mockImplementation(() => Promise.resolve({ status: 201 })),
  navigateTo: mockFn,
  onNext: mockFn,
  onPrev: mockFn,
  history: { push: mockFn },
  currentPage: 1,
  totalPages: 12,
  url: '/articles?page=2',
};
const mockStore = configureMockStore();

describe('<Pagination />', () => {
  const { reload } = window.location;

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
