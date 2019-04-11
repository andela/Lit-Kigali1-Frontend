import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import ConfirmedEmailMessage from '../../components/auth/ConfirmedEmailMessage';

let wrapper;
const mockFn = jest.fn();

const props = {
  onSubmit: jest.fn().mockImplementation(() => Promise.resolve({ status: 200 })),
  onInputChange: mockFn,
  history: { push: mockFn },
  match: {
    params: {
      userId: 'b2d3f3d8-5893-47df-b715-6f10f451bf92',
      confirmationCode: '0382040a-f609-49b6-a43a-f1878ae1b5fd',
    },
  },
};
const defaultState = {
  error: false,
  message: '',
  loading: true,
};

describe('<ConfirmedEmaiMessage  />', () => {
  test('should render the <ConfirmedEmaiMessage  />', () => {
    const renderedValue = renderer.create(<ConfirmedEmailMessage {...props} />).toJSON();
    expect(renderedValue).toMatchSnapshot();
  });

  test('should render default state', () => {
    wrapper = shallow(<ConfirmedEmailMessage {...props} />);
    expect(wrapper.state()).toEqual(defaultState);
  });
  test('should render default state', () => {
    wrapper = shallow(<ConfirmedEmailMessage {...props} />);
    wrapper.setState({ message: 'email confirmed' });
    expect(wrapper.state().message).toEqual('email confirmed');
  });
});
