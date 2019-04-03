import store from '../../../redux/store';
import initialState from '../../../redux/reducers/initialState';

describe('root-store', () => {
  it('should return the initial state', () => {
    expect(store.getState()).toEqual(initialState);
  });
});
