import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { Routes, mapStateToProps } from '../../components/Routes';
import initialState from '../../redux/initialState';

let wrapper;
let store;
const mockFn = jest.fn();

const props = {
  onSubmit: jest.fn().mockImplementation(() => Promise.resolve({ status: 201 })),
  onInputChange: mockFn,
  history: { push: mockFn },
};
const mockStore = configureMockStore();
describe('<Routes />', () => {
  test('Should render the Routes', () => {
    const routes = shallow(<Routes />);
    expect(routes).toMatchSnapshot();
  });

  describe('render routes', () => {
    beforeEach(() => {
      store = mockStore(initialState);
    });

    it('should show Home component for `/`', () => {
      const component = mount(
        <MemoryRouter initialEntries={['/']}>
          <Routes isLoggedIn />
        </MemoryRouter>,
      );
      expect(component.find('Home')).toHaveLength(1);
    });

    it('should show redirect to `/` for `/auth`', () => {
      const component = mount(
        <MemoryRouter initialEntries={['/auth']}>
          <Routes isLoggedIn />
        </MemoryRouter>,
      );
      expect(component.find('Home')).toHaveLength(1);
    });

    it('should show AuthComponent for `/auth`', () => {
      const component = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/auth']}>
            <Routes />
          </MemoryRouter>
          ,
        </Provider>,
      );
      expect(component.find('AuthComponent')).toHaveLength(1);
    });

    it('should show Home component for `/auth`', () => {
      const component = mount(
        <MemoryRouter initialEntries={['/forgot-password-message']}>
          <Routes isLoggedIn />
        </MemoryRouter>,
      );
      expect(component.find('Home')).toHaveLength(1);
    });

    it('should show AuthComponent for `/forgot-password-message`', () => {
      const component = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/forgot-password-message']}>
            <Routes />
          </MemoryRouter>
          ,
        </Provider>,
      );
      expect(component.find('ForgotPasswordMessage')).toHaveLength(1);
    });

    it('should show Home component for `/users/:userId/reset/:resetCode`', () => {
      const component = mount(
        <MemoryRouter initialEntries={['/users/:userId/reset/:resetCode']}>
          <Routes isLoggedIn />
        </MemoryRouter>,
      );
      expect(component.find('Home')).toHaveLength(1);
    });

    it('should show AuthComponent for `/users/:userId/reset/:resetCode`', () => {
      const component = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/users/:userId/reset/:resetCode']}>
            <Routes />
          </MemoryRouter>
          ,
        </Provider>,
      );
      expect(component.find('ResetPassword')).toHaveLength(1);
    });

    it('should show Home component for `/forgot-password`', () => {
      const component = mount(
        <MemoryRouter initialEntries={['/forgot-password']}>
          <Routes />
        </MemoryRouter>,
      );
      expect(component.find('Home')).toHaveLength(1);
    });

    it('should show AuthComponent for `/forgot-password`', () => {
      const component = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/forgot-password']}>
            <Routes isLoggedIn />
          </MemoryRouter>
        </Provider>,
      );
      expect(component.find('ForgotPassword')).toHaveLength(1);
    });

    it('should show AuthComponent for `/my-articles`', () => {
      const component = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/my-articles']}>
            <Routes store={store} />
          </MemoryRouter>
        </Provider>,
      );
      expect(component.find('AuthComponent')).toHaveLength(1);
    });

    it('should show AuthComponent for `/my-articles`', () => {
      const component = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/my-articles']}>
            <Routes isLoggedIn />
          </MemoryRouter>
        </Provider>,
      );
      expect(component.find('ArticlesCurrentUser')).toHaveLength(1);
    });
  });

  describe('reducers', () => {
    test('should return initial props', () => {
      expect(mapStateToProps(initialState)).toEqual({
        isLoggedIn: false,
      });
    });
  });
});
