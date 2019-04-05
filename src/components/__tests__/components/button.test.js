import React from 'react';
import { shallow } from 'enzyme';
import Button from '../../common/Button';

describe('<Button/>', () => {
  let btn;
  const Callback = jest.fn();

  beforeEach(() => {
    btn = shallow(
      <Button type="submit" onClick={Callback} className={{ color: 'blue' }} disabled={false}>
        Ok
      </Button>,
    );
  });

  test('`Button` component should be rendered', () => {
    expect(btn).toMatchSnapshot();
  });

  test('Button should be clicked', () => {
    btn.find('btn').simulate('click');
    expect(Callback).toHaveBeenCalled();
  });
});
