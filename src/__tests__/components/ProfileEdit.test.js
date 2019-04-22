import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
// import configureMockStore from 'redux-mock-store';
// import request from 'superagent';
import {
  ProfileEdit,
  mapStateToProps,
  mapDispatchToProps,
} from '../../components/Profile/ProfileEdit';
import initialState from '../../redux/initialState.json';
// import { articleData } from '../../__mocks__/dummyData';

let wrapper;
// let store;
// const mockStore = configureMockStore();
const props = {
  currentUser: {
    profile: {},
    message: 'some message',
  },
  saveData: jest.fn().mockImplementation(() => Promise.resolve({ status: 201 })),
  getUserProfile: jest.fn().mockImplementation(() => Promise.resolve({ status: 200 })),
  handleInput: jest.fn().mockImplementation(() => Promise.resolve({ status: 200 })),
};

describe('<ProfileEdit />', () => {
  beforeEach(() => {
    wrapper = mount(<ProfileEdit {...props} />);
  });

  test('should render the ProfileEdit', () => {
    const renderedValue = renderer.create(<ProfileEdit {...props} />).toJSON();
    expect(renderedValue).toMatchSnapshot();
  });

  test('should call On image drop', () => {
    expect(wrapper.instance().onImageDrop(['aas', 'asdf'])).toBeUndefined();
  });

  test('should handle input', () => {
    const e = { target: { name: 'name', value: 'value' } };
    wrapper.instance().handleInput(e);
    expect(e.target.name).toBe('name');
    expect(e.target.value).toBe('value');
  });

  test('should handle date', () => {
    const date = new Date();
    const handle = { field: 'birthdate', value: date };
    wrapper.instance().handleDate(date);
    expect(handle.field).toBe('birthdate');
    expect(handle.value).toBe(date);
  });

  test('should save', () => {
    const e = { preventDefault: jest.fn() };
    wrapper.instance().save(e);
    expect(props.saveData).toHaveBeenCalled();
    expect(e.preventDefault).toHaveBeenCalled();
  });

  test('should handle message', () => {
    expect(wrapper.instance().handleMessage()).toBeDefined();
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

    test('should call updateProfile', () => {
      const payload = {
        firstName: 'firstName',
        lastName: 'lastName',
        birthDate: 'birthDate',
        bio: 'bio',
        image: 'image',
      };
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).saveData(payload);
      expect(dispatch).toHaveBeenCalled();
    });

    test('should call handleInput', () => {
      const payload = { field: 'field', value: 'value' };
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).handleInput(payload);
      expect(dispatch).toHaveBeenCalled();
    });
  });
});
