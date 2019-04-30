import React from 'react';
import { shallow } from 'enzyme';
import {
  mapStateToProps,
  mapDispatchToProps,
  ConfirmedEmailMessage,
} from '../../components/Auth/ConfirmedEmailMessage';
import initialState from '../../redux/initialState.json';

let wrapper;

const props = {
  message: 'Message',
  match: {
    params: { userId: '12345', confirmationCode: '234567' },
  },
  onEmailVerification: jest.fn().mockImplementation(() => Promise.resolve({ status: 200 })),
};

describe('<ConfirmedEmailMessage />', () => {
  test('should render the <ConfirmedEmailMessage />', () => {
    wrapper = shallow(<ConfirmedEmailMessage {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  describe('reducers', () => {
    test('should initialize the component state', () => {
      const state = mapStateToProps(initialState);
      expect(state).toEqual({ confirmMessage: '' });
    });
  });

  describe('actions creators', () => {
    test('should call onEmailVerification action', () => {
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).onEmailVerification({ ...props });
      expect(dispatch).toHaveBeenCalled();
    });
  });
});
