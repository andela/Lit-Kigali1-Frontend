import React from 'react';
import { mount, shallow } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { Highlighter, mapStateToProps } from '../../components/Comment/Highlighter';
import initialState from '../../redux/initialState.json';

const mockStore = configureMockStore([thunk]);
const store = mockStore(initialState);

const props = {
  contentState: {
    getEntity: () => ({
      getData: () => ({
        anchorKey: '',
        comment: {
          author: {
          },
        },
        articleSlug: '',
      }),
    }),
  },
  entityKey: '',
  children: '',
  currentUser: {},
};
describe('<Article />', () => {
  test('should render the <Highlighter />', () => {
    const wrapper = shallow(<Highlighter {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('should change state', () => {
    const wrapper = mount(<Provider store={store}><Highlighter {...props} /></Provider>);
    const { changeState } = wrapper.find('Highlighter').instance();
    changeState();
    expect(wrapper.find('Highlighter').state().showComment).toEqual(true);
  });

  test('mapStateToProps', () => {
    const { currentUser } = mapStateToProps(initialState);
    expect(currentUser).toBeDefined();
  });
});
