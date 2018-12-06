// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import Spinner from './Spinner';

describe('Spinner component', () => {
  it('should shallow render without crashing', () => {
    shallow(<Spinner />);
  });

  it('should match snapshot', () => {
    const wrapper = shallow(<Spinner />);
    expect(wrapper).toMatchSnapshot();
  });
});
