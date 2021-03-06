import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import 'babel-polyfill';
import mock from 'superagent-mock';
import request from 'superagent';
import {
  ProfileEdit,
  mapStateToProps,
  mapDispatchToProps,
} from '../../components/Profile/ProfileEdit';
import initialState from '../../redux/initialState';
import { file, urlValue } from '../../__mocks__/dummyData';

let wrapper;
const props = {
  currentUser: {
    profile: {},
    message: 'some message',
  },
  saveData: jest.fn().mockImplementation(() => Promise.resolve({ status: 200 })),
  getUserProfile: jest.fn().mockImplementation(() => Promise.resolve({ status: 200 })),
  handleInput: jest.fn().mockImplementation(() => Promise.resolve({ status: 200 })),
  onImageDrop: jest.fn().mockImplementation(() => Promise.resolve({ status: 200 })),
};
const API_URL = process.env.UPLOAD_URL;
describe('<ProfileEdit />', () => {
  beforeEach(() => {
    wrapper = mount(<ProfileEdit {...props} />);
  });

  test('should render the ProfileEdit', () => {
    const renderedValue = renderer.create(<ProfileEdit {...props} />).toJSON();
    expect(renderedValue).toMatchSnapshot();
  });

  test('should call On image drop', async () => {
    const files = [
      'https://cdn.pixabay.com/photo/2015/03/26/09/41/chain-690088_1280.jpg',
      'asdfasd',
      'http://placehold.it/32x32',
      'asdfasd',
    ];
    await wrapper.instance().onImageDrop(files);
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

  test('should save', () => {
    const newProps = {
      ...props,
      saveData: jest.fn().mockImplementation(() => Promise.resolve({ status: 404 })),
    };
    wrapper.setProps(newProps);
    const e = { preventDefault: jest.fn() };
    wrapper.instance().save(e);
    expect(props.saveData).toHaveBeenCalled();
    expect(e.preventDefault).toHaveBeenCalled();
  });

  test.skip('should render showToaster', (done) => {
    jest.useFakeTimers();
    wrapper.instance().showToast();
    jest.runAllTimers();
    done();
  });
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

  test('should call handleInput onImageDrop', () => {
    const config = [
      {
        pattern: API_URL,
        fixtures: () => ({
          body: { secure_url: urlValue },
        }),
        post: (match, data) => data,
      },
    ];
    mock(request, config);
    const { onImageDrop } = wrapper.instance();
    onImageDrop([JSON.stringify(file)]);
    expect(wrapper.props().handleInput).toHaveBeenCalled();
  });

  test('should call handleInput onImageDrop', () => {
    const spy = jest.spyOn(wrapper.instance(), 'showToast');
    const config = [
      {
        pattern: API_URL,
        fixtures: () => ({
          body: { secure_url: '' },
        }),
        post: (match, data) => data,
      },
    ];
    mock(request, config);
    const { onImageDrop } = wrapper.instance();
    onImageDrop([JSON.stringify(file)]);
    expect(spy).toHaveBeenCalled();
  });
});
