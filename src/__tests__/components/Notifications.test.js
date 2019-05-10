import React from 'react';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { shallow, mount } from 'enzyme';
import {
  Notifications,
  mapDispatchToProps,
  mapStateToProps,
} from '../../components/Notification/Notifications';
import { NotificationCard } from '../../components/Notification/NotificationCard';
import { notificationData } from '../../__mocks__/dummyData';
import initialState from '../../redux/initialState.json';

let wrapper;
const props = {
  notifications: notificationData,
  onReadNotification: jest.fn().mockImplementation(() => Promise.resolve({ status: 200 })),
  onMarkAllAsRead: jest.fn().mockImplementation(() => Promise.resolve({ status: 200 })),
};
const mockStore = configureMockStore([thunk]);
const store = mockStore(initialState);

describe('<Notifications />', () => {
  test('should render notification', () => {
    wrapper = shallow(<Notifications {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('should display notifications', () => {
    wrapper = mount(
      <Provider store={store}>
        <Notifications {...props} />
      </Provider>,
    );
  });

  test('should not display notifications', () => {
    const newProps = {
      ...props,
      notifications: { notificationList: [], notificationsCount: 0, status: 'enabled' },
    };
    wrapper = mount(
      <Provider store={store}>
        <Notifications {...newProps} />
      </Provider>,
    );
  });

  test('should mark all as read', () => {
    wrapper = mount(
      <Provider store={store}>
        <Notifications {...props} />
      </Provider>,
    );
    wrapper
      .find('Notifications')
      .find('.mark-all')
      .simulate('click');
    expect(wrapper.find('Notifications').props().onMarkAllAsRead).toHaveBeenCalled();
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
    expect(state).toHaveProperty('notifications');
  });
});

describe('<NotificationCard />', () => {
  const cardProps = {
    notification: notificationData.notificationList[1],
    onReadNotification: jest.fn().mockImplementation(() => Promise.resolve({ status: 200 })),
  };
  test('should render notificationCard', () => {
    wrapper = mount(<NotificationCard {...cardProps} />);
    wrapper.find('a').simulate('click');
    expect(wrapper.props().onReadNotification).toHaveBeenCalled();
  });
});
