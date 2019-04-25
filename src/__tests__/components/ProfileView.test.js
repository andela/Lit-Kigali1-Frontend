import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';
import {
  ProfileView,
  mapStateToProps,
  mapDispatchToProps,
} from '../../components/Profile/ProfileView';
import initialState from '../../redux/initialState';
import { articleData } from '../../__mocks__/dummyData';

let wrapper;
let store;
const mockStore = configureMockStore();
const props = {
  loading: true,
  profile: {
    articles: [],
  },
  currentUser: {
    username: 'username',
  },
  getUserProfile: jest.fn().mockImplementation(() => Promise.resolve({ status: 200 })),
  onFollowUser: jest.fn().mockImplementation(() => Promise.resolve({ status: 200 })),
  history: { push: jest.fn() },
};
describe('<ProfileView />', () => {
  beforeEach(() => {
    wrapper = mount(<ProfileView {...props} />);
  });
  test('should render the <ResetPassword />', () => {
    const renderedValue = renderer.create(<ProfileView {...props} />).toJSON();
    expect(renderedValue).toMatchSnapshot();
  });

  test('should return empty div on loading', () => {
    wrapper.setProps({ laoding: true });
    expect(wrapper.props().loading).toBeTruthy();
  });

  test('should render edit button', () => {
    const user = { profile: { articles: [], username: 'username' } };
    wrapper.setProps({ profile: user, currentUser: user });
    expect(wrapper.props().currentUser.username).toEqual(wrapper.props().profile.username);
    expect(wrapper.instance().renderUserAction()).toBeDefined();
  });

  test('should render articles', () => {
    const newProps = {
      ...props,
      loading: false,
      profile: {
        articles: [articleData],
      },
    };
    wrapper = mount(<ProfileView {...newProps} />);
    expect(wrapper.instance().renderArticles()).toBeDefined();
  });

  test('should set following to true', () => {
    wrapper.setProps({ following: true, loading: false });
    expect(wrapper.props().following).toBeTruthy();
    expect(wrapper.find('.profile-meta__button').hasClass('loading'));
  });

  test('should render profile bio div', () => {
    wrapper.setProps({ profile: { articles: [], bio: 'My Bio' }, loading: false });
    expect(wrapper.props().profile.bio).toBe('My Bio');
  });

  describe('when clicking on submit button', () => {
    beforeEach(() => {
      store = mockStore({});
      wrapper = mount(<ProfileView store={store} {...props} />);
    });

    test('should call onFollowButton to `follow` a user', () => {
      wrapper.setProps({ loading: false });
      wrapper.find('.profile-meta__button').simulate('click');
      expect(props.onFollowUser).toHaveBeenCalled();
    });

    test('should call onFollowButton to `unfollow` a user', () => {
      wrapper.setProps({ loading: false, profile: { followed: true, articles: [] } });
      wrapper.find('.profile-meta__button').simulate('click');
      expect(props.onFollowUser).toHaveBeenCalled();
    });
  });

  describe('reducers', () => {
    test('should initialize the component state', () => {
      const state = mapStateToProps(initialState);
      expect(state).toHaveProperty('loading');
      expect(state).toHaveProperty('profile');
      expect(state).toHaveProperty('following');
      expect(state).toHaveProperty('currentUser');
    });
  });

  describe('actions creators', () => {
    test('should call getUserProfile action', () => {
      const payload = 'username';
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).getUserProfile(payload);
      expect(dispatch).toHaveBeenCalled();
    });

    test('should call onFollowUser action', () => {
      const payload = { username: 'username', method: 'POST' };

      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).onFollowUser(payload);
      expect(dispatch).toHaveBeenCalled();
    });
  });
});
