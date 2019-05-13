import React from 'react';
import { shallow, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import {
  NotificationView,
  mapDispatchToProps,
  mapStateToProps,
} from '../../components/Notification/NotificationView';
import { notificationData } from '../../__mocks__/dummyData';
import initialState from '../../redux/initialState.json';

let wrapper;
const props = {
  notificationList: notificationData.notificationList,
  onReadNotification: jest.fn().mockImplementation(() => Promise.resolve({ status: 200 })),
  onMarkAllAsRead: jest.fn().mockImplementation(() => Promise.resolve({ status: 200 })),
};
const mockStore = configureMockStore([thunk]);
const store = mockStore(initialState);

describe('<NotificationView />', () => {
  test('should render all notifications', () => {
    wrapper = shallow(<NotificationView {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('Should display notificationa', () => {
    wrapper = mount(
      <Provider store={store}>
        <NotificationView {...props} />
      </Provider>,
    );
    expect(wrapper.find('NotificationView').find('.all-notification__view')).toBeDefined();
  });

  test('should not display notifications', () => {
    const newProps = {
      ...props,
      notificationList: [],
    };
    wrapper = mount(
      <Provider store={store}>
        <NotificationView {...newProps} />
      </Provider>,
    );
    expect(wrapper.find('NotificationView').find('.all-notification__view')).toEqual({});
  });

  test('should mark all as read', () => {
    wrapper = mount(
      <Provider store={store}>
        <NotificationView {...props} />
      </Provider>,
    );
    wrapper
      .find('NotificationView')
      .find('.mark-all')
      .simulate('click');
    expect(wrapper.find('NotificationView').props().onMarkAllAsRead).toHaveBeenCalled();
  });

  test('should read notification', () => {
    const cardProps = {
      ...props,
      notificationList: [notificationData.notificationList[1]],
    };
    wrapper = mount(<NotificationView {...cardProps} />);
    wrapper.find('a').simulate('click');
    expect(wrapper.props().onReadNotification).toHaveBeenCalled();
  });
});

describe('mapDispatchToProps', () => {
  const dispatch = jest.fn();
  const id = 'fake-id';

  test('should dispatch on readNotification', () => {
    const { onReadNotification } = mapDispatchToProps(dispatch);
    onReadNotification(id);
    expect(dispatch).toHaveBeenCalled();
  });

  test('should dispatch on marAllAsRead', () => {
    const { onMarkAllAsRead } = mapDispatchToProps(dispatch);
    onMarkAllAsRead();
    expect(dispatch).toHaveBeenCalled();
  });
});

describe('mapStateToProps', () => {
  test('should initialize the component state', () => {
    const state = mapStateToProps(initialState);
    expect(state).toHaveProperty('notificationList');
  });
});
