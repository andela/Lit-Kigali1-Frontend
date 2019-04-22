import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';
import {
  ProfileEdit,
  mapStateToProps,
  mapDispatchToProps,
} from '../../components/Profile/ProfileEdit';
import initialState from '../../redux/initialState.json';
import { articleData } from '../../__mocks__/dummyData';

let wrapper;
let store;
const mockStore = configureMockStore();
const props = {
  currentUser: {
    profile: {},
  },
  saveData: ({ firstName }) => {},
  getUserProfile: jest.fn().mockImplementation(() => Promise.resolve({ status: 200 })),
  handleInput: jest.fn(),
};

describe('<ProfileEdit />', () => {
  beforeEach(() => {
    wrapper = mount(<ProfileEdit {...props} />);
  });

  test('should render the ProfileEdit', () => {
    const renderedValue = renderer.create(<ProfileEdit {...props} />).toJSON();
    expect(renderedValue).toMatchSnapshot();
  });

  describe('reducers', () => {
    test('should initialize the component state', () => {
      const state = mapStateToProps(initialState);
      expect(state).toHaveProperty('currentUser');
    });
  });

  describe('action creators', () => {
    test('should call getUserProfile action', () => {
      const payload = 'username';
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).getUserProfile(payload);
      expect(dispatch).toHaveBeenCalled();
    });
  });
});
